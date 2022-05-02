const router = require("express").Router()
const pool = require("../../db")
const authorization = require("../../middleware/authorization")

router.put("/admin", authorization, async (req, res) => {
    
    const {
        req_tutoring_hrs,
        req_service_hrs,
        req_service_proj,
        sponsors_name,
        sponsors_email,
        removal_policy_id,
        website_email, end_date,
        begin_date
    } = req.body
        console.log(req.body)
    try {
        const alteredAdmin = await pool.query("UPDATE admin SET req_tutoring_hrs = $1, req_service_hrs = $2,  req_service_proj = $3, sponsors_name = $4,sponsors_email = $5,removal_policy_id = $6, website_email = $7, end_date= $8, begin_date= $9 RETURNING *", [
            req_tutoring_hrs,
            req_service_hrs,
            req_service_proj,
            sponsors_name,
            sponsors_email,
            removal_policy_id,
            website_email, end_date,
            begin_date
        ])
        console.log(alteredAdmin.rows)
        let altered = alteredAdmin.rows[0]
        if(altered.req_tutoring_hrs === null){
            altered = {...altered, req_tutoring_hrs: req_tutoring_hrs}
        }else if(altered.req_service_hrs === null){
            altered = {...altered, req_service_hrs: req_service_hrs}
        }else if(altered.req_service_proj === null){
            altered = {...altered, req_service_proj: req_service_proj}
        }else if(altered.sponsors_name === null){
            altered = {...altered, sponsors_name: sponsors_name}
        }else if(altered.sponsors_email=== null){
            altered = {...altered, sponsors_email: sponsors_email}
        }else if(altered.removal_policy_id=== null){
            altered = {...altered, removal_policy_id: removal_policy_id}
        }else if(altered.website_email === null){
            altered = {...altered, website_email: website_email}
        }else if(altered.end_date === null){
            altered = {...altered, end_date: end_date}
        }else if(altered.begin_date === null){
            altered = {...altered, begin_date: begin_date}
        }else{
            return res.json(alteredAdmin.rows)
        }
        return res.json(altered)
       
    } catch (err) {
        console.error("in here", err.message)
        res.status(500).send("Server Error")
    }
})



module.exports = router