const router = require("express").Router()
const pool = require("../../db")
const authorization= require("../../middleware/authorization")

//HANDLES ALL THE GET from Users Table

//GET ALL Info for a User
//first_name, last_name, complete_tutoring_hrs, complete_service_hrs, complete_service_proj, paid_dues, grade_level, role, student_id, tutoring_classes, email, phone, meetings_attended, birth_date, type
router.get("/all", authorization, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT user_id, first_name, last_name, complete_tutoring_hrs, complete_service_hrs, complete_service_proj, paid_dues, grade_level, role, student_id, tutoring_classes, email, phone, meetings_attended, birth_date, type FROM users WHERE user_id = $1", [
            req.user
        ])
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})
//gets all the users of type member
router.get("/members", authorization, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT user_id, first_name, last_name, complete_tutoring_hrs, complete_service_hrs, complete_service_proj, paid_dues, grade_level, role, student_id, tutoring_classes, email, phone, meetings_attended, birth_date, type FROM users WHERE type = 'member'")
        res.json(user.rows)

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})
//gets all the users of ype sponsor
router.get("/sponsors", authorization, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT user_id, first_name, last_name, complete_tutoring_hrs, complete_service_hrs, complete_service_proj, paid_dues, grade_level, role, student_id, tutoring_classes, email, phone, meetings_attended, birth_date, type FROM users WHERE type = 'sponsor'")
        res.json(user.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})
//gets all the users of type studnets, 
router.get("/students", authorization, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT user_id, first_name, last_name, complete_tutoring_hrs, complete_service_hrs, complete_service_proj, paid_dues, grade_level, role, student_id, tutoring_classes, email, phone, meetings_attended, birth_date, type FROM users WHERE type = 'student'")
        res.json(user.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})
//gets all the uses who have a submitted application





//gets all the firstName and lastNames of type member
router.get("/members-names", async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT first_name, last_name FROM users WHERE type = 'member'")
        res.json(user.rows)

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


module.exports = router