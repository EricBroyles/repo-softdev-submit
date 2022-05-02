const router = require("express").Router()
const pool = require("../../db")
const authorization = require("../../middleware/authorization")
//GET all event Proposals from Scheudle, where approved === null
//first_name = $1, last_name = $2, complete_tutoring_hrs = $3, complete_service_hrs = $4, complete_service_proj = $5, paid_dues = $6, grade_level = $7, role = $8, meetings_attended = $9, student_id = $10, email = $11, birth_date = $12
router.put("/user-details", authorization, async (req, res) => {
    
    const {first_name, last_name, complete_tutoring_hrs, 
        complete_service_hrs, complete_service_proj, 
        paid_dues, grade_level, role, student_id, 
        tutoring_classes, email, phone, meetings_attended, 
        birth_date, type} = req.body
    try {
        const alteredUser = await pool.query("UPDATE users SET first_name = $1, last_name = $2, complete_tutoring_hrs = $3, complete_service_hrs = $4, complete_service_proj = $5, paid_dues = $6, grade_level = $7, role = $8, student_id = $9, tutoring_classes = $10, email = $11, phone = $12, meetings_attended = $13, birth_date = $14, type = $15 WHERE email= $11 RETURNING *", [
            first_name, last_name, complete_tutoring_hrs, 
        complete_service_hrs, complete_service_proj, 
        paid_dues, grade_level, role, student_id, 
        tutoring_classes, email, phone, meetings_attended, 
        birth_date, type
        ])
        
        res.json(alteredUser.rows)
        console.log("alteredUsers", alteredUser.rows)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})






module.exports = router