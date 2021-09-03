const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next ) => {
    
    const token = req.header('my-token');
    
    if(!token){
        return res.status(401).json({
            msg: 'there is no token in the request, you have to authenticate'
        })
    }
    
    try {

        jwt.verify(token, process.env.SECRECTORPRIVATEKEY);
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'invalid token'
        })
    }
    
    next();
};

module.exports = {
    validateJWT
}