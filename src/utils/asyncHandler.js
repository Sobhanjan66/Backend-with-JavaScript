const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err))
    }
}

export {asyncHandler}


/*const asyncHandler = () => {}

const asyncHandler = (func) => { (func2) => {} } || Here we are taking a function as func as a parameter & further down passing it to another function*/


/*const asyncHandler = (fn) => async(req,res,next) => {
     try {
        await fn(req,res,next)
     } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
     }
}*/