const express = require("express")
const app =express()
const cors = require("cors")

//middleware
app.use(express.json()) 
app.use(cors())


//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"))

//PUSH
app.use("/push", require("./routes/push/schedule"))
app.use("/report", require("./routes/push/issues"))

//GETS  
app.use("/get-user-info", require("./routes/get/users")) //info from USERS
app.use("/get-schedule-info", require("./routes/get/schedule")) //get info from Schedule
app.use("/get-issues-info", require("./routes/get/issues")) //get info from issues
app.use("/get-admin-info", require("./routes/get/admin")) //get info from admin
//PUT
app.use("/update", require("./routes/put/users"))
app.use("/update-issues", require("./routes/put/issues"))
app.use("/update-admin", require("./routes/put/admin"))

//dashboard routes, to be removed
//app.use("/dashboard", require("./routes/dashboard"))
app.listen(5000, () => {
    console.log("server is running on post 5000")
})