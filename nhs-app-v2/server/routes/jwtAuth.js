const router =require("express").Router()
const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

//register
router.post("/register", validInfo,  async (req, res) => {
    try {
        //1. destructure the req.body (name, email, password)
        
        const {first_name, last_name, paid_dues, grade_level, student_id, phone, birth_date, type, email, password} = req.body
        
        //2. check if user exists (if they do throw an error)
        const user = await pool.query("SELECT * FROM users WHERE email = $1" , 
            [email]
        )
        
        if(user.rows.length !== 0){
            return res.status(401).json("User already exists")
        }
        //3. Bcrypt the user password
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, salt)
        //4. enter the new user inside our database

        const newUser = await pool.query(
            "INSERT INTO users (first_name, last_name, paid_dues, grade_level, student_id, phone, birth_date, type, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", 
                               [first_name, last_name, paid_dues, grade_level, student_id, phone, birth_date, type, email, bcryptPassword]
        )
        //5. generating jwt token
        const token = jwtGenerator(newUser.rows[0].user_id)
        
        res.json( {token} )

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})
//login route

router.post("/login", validInfo, async (req, res) => {
    try {
        
        //1. destructure the req.body (name, email, password)
        const {email, password} = req.body
        
        //2. check if user does not exist (if not then throw an error)
        const user = await pool.query("SELECT * FROM users WHERE email = $1" , 
            [email]
        )
        if(user.rows.length === 0){
            return res.status(401).json("Password or Email is incorrect")
        }
        //3. check if incomming password is the same as the database password
        

        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        
        if(!validPassword){
            return(res.status(401)).json("Password or Email is incorrect")    
        }

        //4. give them the jwt token
        const token = jwtGenerator(user.rows[0].user_id)
        return res.json({token})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})



module.exports = router