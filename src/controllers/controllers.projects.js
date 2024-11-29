const customResponse = require("../helpers/response")
const {createProject,deleteProject,getProjectAllProjects,getProjectById,searchAndSort,updateProject} = require("../services/services.project")

function productController(type){
    return async (req,res) => {
        try {
            console.log("type", type)
            console.log("request data :: ", req.body)
            let resp = null

            switch (type) {
                case "create":
                    resp = await createProject(req.body)
                    break;
                case "update":
                    var id = req.params.id
                    console.log(id);
                    resp = await updateProject(id ,req.body)
                    break;
                case "delete":
                    var id = req.params.id
                    resp = await deleteProject(id)
                    break;
                case "getById":
                    var id = req.params.id
                    resp = await getProjectById(id)
                    break;
                case "listAll":
                    resp = await getProjectAllProjects()
                    break;
                case "searchAndSort":
                    console.log("=>>>>>",req.query)
                    const name = req.query.name
                    const status = req.query.status
                    const isName = name ? name : null
                    const isStatus = status ? status : null
                    const orderBy = req.query.orderBy ? req.query.orderBy : 'DESC'
                    const searchType = []
                    if(isName) searchType.push("name")
                    if(isStatus) searchType.push("status")
                    resp = await searchAndSort(searchType, name, status, orderBy)
                    break;
                default:
                    return res.status(500).send("This operation is down as of now. Plese try after some time") 
            }
            return res.status(resp.status).json(resp)
        } catch (error) {
            const resp = customResponse(500, error.message)
            return res.status(500).json(resp)
        }
    }
}

module.exports = productController