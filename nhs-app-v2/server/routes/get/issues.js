const router = require("express").Router()
const pool = require("../../db")
const authorization= require("../../middleware/authorization")

//GET all event Proposals from Scheudle, where approved === null

router.get("/all", authorization, async (req, res) => {
    try {
        const issues = await pool.query("SELECT * FROM issues WHERE status IS NOT true")
        res.json(issues.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})






module.exports = router