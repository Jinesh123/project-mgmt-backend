const customResponse = require("../helpers/response")

function validateRequest(requiredFields){
   return async (req,res,next) => {
        try {
            const body = req.body;
            if(!(requiredFields instanceof Array)){
                console.log("Error => validateRequest only accepts array of keys.")
                process.exit(0)
            }
            console.log("body :: ", Object.keys(body))
            const body_keys = Object.keys(body)
            const isValid = requiredFields.every(key => body_keys.includes(key))
            if(!isValid){
                const missing = requiredFields.filter(key => !body_keys.includes(key))
                const resp = customResponse(400,`${missing} missing field.`)
                return res.status(resp.status).json(resp)
            }
            next()
        } catch (error) {
            const resp = customResponse(500, error.message)
            return res.status(500).json(resp)
        }
   }
}

module.exports = validateRequest