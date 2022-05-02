const router = require("express").Router()
const pool = require("../../db")
const authorization = require("../../middleware/authorization")
//GET all event Proposals from Scheudle, where approved === null
//first_name = $1, last_name = $2, complete_tutoring_hrs = $3, complete_service_hrs = $4, complete_service_proj = $5, paid_dues = $6, grade_level = $7, role = $8, meetings_attended = $9, student_id = $10, email = $11, birth_date = $12
router.put("/issue-status", authorization, async (req, res) => {
    
    const {issue_id, status} = req.body
    try {
        const alteredIssue = await pool.query("UPDATE issues SET status = $2 WHERE issue_id = $1 RETURNING *", [
            issue_id, status
        ])
        
        res.json(alteredIssue.rows[0])
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})



module.exports = router