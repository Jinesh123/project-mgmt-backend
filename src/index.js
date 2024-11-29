const express = require("express")
const cors = require("cors")
const {connectDb} = require('./database/db')
require("dotenv").config()

// custom module imports 
const Project = require("./models/models.projects")
const projects = require("./routes/routes.projects")

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/projects',projects)

app.get("/", async (req,res) => {
    try{
        const dueDate = new Date()
        const project = await Project.create({name: 'project 2', description: "test", status: 'Not_Started',dueDate: dueDate})
        console.log("project ",project)
        res.send("Hello, This is project-management-backend.")
    }catch(err){
        res.send(err.message)
    }
})

app.listen(PORT, async () => {
    connectDb()
    console.log(`server is running on port ${PORT}`)
})  