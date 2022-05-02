const router = require("express").Router()
const pool = require("../../db")
const authorization= require("../../middleware/authorization")

//GET all event Proposals from Scheudle, where approved === null

router.get("/all", authorization, async (req, res) => {
    try {
        const content = await pool.query("SELECT * FROM admin")
        res.json(content.rows[0])
    } catch (err) {
        console.error( "help", err.message)
        res.status(500).send("Server Error")
    }
})


module.exports = router