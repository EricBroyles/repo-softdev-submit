const router = require("express").Router()
const pool = require("../../db")



router.post("/create-schedule", async(req,res)=>{
    try{
        const {
            type, title, names, 
            emails, tutoringSubjects, 
            tutoringTypes, comment, 
            link, beginTimes, endTimes, 
            membersSigned, numSpots, 
            approved, phones, dates, 
            locations, requestedTutors
        } = req.body;

        const newEvent=await pool.query(
            "Insert INTO schedule (type, title, names, emails, tutoring_subjects, tutoring_types, comment, link, begin_times, end_times, members_signed, num_spots, approved, phones, dates, locations, requested_tutors) VALUES($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *",  
            [type, title, names, 
            emails, tutoringSubjects, 
            tutoringTypes, comment, 
            link, beginTimes, endTimes, 
            membersSigned, numSpots, 
            approved, phones, dates, 
            locations, requestedTutors]);
       
            res.json(newEvent);

    } catch (err){
        console.error(err.message); 
    }
});
module.exports = router