function customResponse(status, resp){
    const isSuccess = status < 400
    return {
        status: status,
        success: isSuccess ? true : false,
        data: isSuccess ? resp : null,
        error: isSuccess ? null : resp
    }
}

module.exports = customResponse