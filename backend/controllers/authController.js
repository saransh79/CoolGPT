import User from "../models/userModel.js";
import errorResponse from "../utils/errorResponse.js";

// JWT token
const sendToken= (user, statusCode, res)=>{
    const token= user.getSignedToken(res);
    res.status(statusCode).json({
        success : true,
        token,
    });
}

const register= async(req, res, next)=>{
    try {
        const {username, email, password} = req.body;
        // existing user
        const existingEmail = await User.findOne({email});

        if(existingEmail){
            return next(new errorResponse('Email is already registered', 500))
        }

        const user= await User.create({
            username,
            email,
            password
        })

        sendToken(user, 201, res);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const login= async(req, res, next)=>{
    try {
        const {email, password}= req.body;
        // validation
        if(!email || !password){
            return next(new errorResponse('Please provide email or password'));
        }

        const user= await User.findOne({email});

        if(!user) return next(new errorResponse('You are not registered', 401));

        const isMatch = await user.matchPassword(password);
        if( !isMatch){
            return next(new errorResponse('Invalid Credentials', 401));
        }

        sendToken(user, 200, res);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const logout= async(req, res)=>{
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: 'Logout Successfully'
    })
}

export {register, login, logout};