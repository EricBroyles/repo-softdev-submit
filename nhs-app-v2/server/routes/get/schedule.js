const router = require("express").Router()
const pool = require("../../db")
const authorization= require("../../middleware/authorization")

//GET all event Proposals from Scheudle, where approved === null

router.get("/proposed-events", authorization, async (req, res) => {
    try {
        const proposedEvents = await pool.query("SELECT * FROM schedule WHERE approved IS null")
        res.json(proposedEvents.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

//Get all event
router.get("/approved-events", authorization, async (req, res) => {
    try {
        const approvedEvents = await pool.query("SELECT * FROM schedule WHERE approved = true")
            
        res.json(approvedEvents.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})




module.exports = router