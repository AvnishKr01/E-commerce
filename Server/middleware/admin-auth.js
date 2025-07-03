const jwt = require('jsonwebtoken')

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: 'UnAuthorized Login again' })
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
  
    if (decode.role === 'admin' && decode.email === process.env.ADMIN_EMAIL) {
      req.admin = decode;
      next();
    } else {
      return res.status(403).json({ success: false, message: 'Access denied: Invalid token role or email' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message:'Internal Error'});
    
  }
}

module.exports = adminAuth;

