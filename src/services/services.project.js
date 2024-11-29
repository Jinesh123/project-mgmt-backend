const { Op } = require("sequelize")
const Project = require("../models/models.projects")
const customResponse = require("../helpers/response")

async function createProject(payload) {
    try {

        const project = await Project.create(payload)
        if(!project) {
            return customResponse(400,"something went wrong")
        }
        return customResponse(201,"Project created")
    } catch (error) {
        console.log("=> ",error.errors[0].message)
        return customResponse(500, error.errors[0].message)
    }
}

async function updateProject(id, payload) {
    try {
        const project = await Project.update(payload, {where: {
            id: id
        }})
        if(!project) {
            return customResponse(500,"something went wrong")
        }
        return customResponse(200,"Project updated")
    } catch (error) {
        console.log("=> ",error.errors[0].message)
        return customResponse(500, error.errors[0].message)
    }
}

async function deleteProject(id) {
    try {
        const project = await Project.destroy({
            where: {
              id: id,
            }})
        if(!project) {
            return customResponse(400,"not found")
        }
        return customResponse(200,"Project deleted")
    } catch (error) {
        console.log("=> ",error.errors[0].message)
        return customResponse(500, error.errors[0].message)
    }
}

async function getProjectById(id) {
    try {
        const project = await Project.findByPk(id)
        if(!project) {
            return customResponse(400,"not found")
        }
        console.log(project)
        return customResponse(200, project)
    } catch (error) {
        console.log("=> ",error.errors[0].message)
        return customResponse(500, error.errors[0].message)
    }
}

async function getProjectAllProjects() {
    try {
        const projects = await Project.findAll()
        if(!projects) {
            return customResponse(400,"not found")
        }
        return customResponse(200, projects)
    } catch (error) {
        console.log("=> ",error.errors[0].message)
        return customResponse(500, error.errors[0].message)
    }
}

async function searchAndSort(searchType, searchText, status, sortby) {
    try {
        const like_payload = {}
        
        if(searchType.includes("name")){
            like_payload["name"] = { [Op.like]: `${searchText}%`, [Op.like]: `${searchText.toLowerCase()}%`, [Op.like]: `${searchText.toUpperCase()}%`,[Op.like]: `${searchText[0].toUpperCase() + searchText.slice(1).toLowerCase()}%` }
        }
        if(searchType.includes("status")){
            like_payload["status"] = status
        }
        
        const projects = await Project.findAll(
            {
                where: like_payload,
                order: [
                    ['dueDate', sortby]
                ]
            },
        )
        if(!projects) {
            return customResponse(400,"not found")
        }
        return customResponse(200, projects)
    } catch (error) {
        console.log("=> ",error.errors[0].message)
        return customResponse(500, error.errors[0].message)
    }
}

module.exports = {
    createProject,
    updateProject,
    deleteProject,
    getProjectAllProjects,
    getProjectById,
    searchAndSort
}