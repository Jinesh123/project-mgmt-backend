const {Router, request} = require("express")
const productController = require('../controllers/controllers.projects')
const validateRequest = require('../middleware/middleware.project')

const route = new Router()

// GET /api/projects         - List all projects
// GET /api/projects/:id     - Get single project
// POST /api/projects        - Create project
// PUT /api/projects/:id     - Update project
// DELETE /api/projects/:id  - Delete project
// GET /api/projects/search  - Search projects

// get all project 
route.get('/', productController('listAll'))

// search project 
route.get('/search', productController('searchAndSort'))

// get project by id
route.get('/:id', productController('getById'))

// create project
route.post('/', validateRequest(['name', 'dueDate']), productController('create'))

// update project
route.put('/:id', productController('update'))

// delete project 
route.delete('/:id', productController('delete'))

module.exports = route