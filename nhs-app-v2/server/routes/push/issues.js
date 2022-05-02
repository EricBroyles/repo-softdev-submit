const router = require("express").Router()
const pool = require("../../db")


router.post("/issue", async(req,res)=>{
    try{
        const {user_type, name,email,content,issue_type, date} = req.body;
        
        const newEvent=await pool.query(
            "Insert INTO issues (user_type, name,email,content,issue_type, date) VALUES($1,$2, $3, $4, $5, $6) RETURNING *",  
            [user_type, name,email,content,issue_type, date]);
       
            
            res.json(newEvent);

    } catch (err){
        
        console.error(err.message); 
    }
});
module.exports = router