const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {

const token = req.headers.token;
//  console.log("🔑 Token received:", token);
if(!token){
   return res.status(400).json({success:false, message:"UnAuthorized login again"});
}
try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(token_decode);
    req.userId = token_decode.userId;
    // console.log("Decoded token:", token_decode)
    next();
} catch (error) {
    console.log(error);
    return res.status(500).json({success:false, message:"Internal Server Error"});
}

}

module.exports = authUser;