import errorResponse from "../utils/errorResponse.js";

const errorHandler= (err,req,res, next)=>{
    var err= {...err};
    err.message = err.message

    // mongoose cast Error
    if(err.name === 'castError'){
        const message= 'Resources not found!' 
        err= new errorResponse(message, 404);
    }

    // duplicate key error
    if(err.code === 11000){
        const message= 'Duplicate field value entered.'
        err= new errorResponse(message, 400);
    }

    // mongoose validation
    if(err.name === 'ValidationError'){
        const message = Object.values(err.err.errors).map(val=> val.message);
        err= new errorResponse(message, 400);
        res.status(err.statusCode || 500).json({
            success : false,
            error : err.message || 'Server Error'
        })
    }
}

export default errorHandler;