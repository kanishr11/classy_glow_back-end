import jwt from 'jsonwebtoken'

const authUser = async (req,res,next) =>{
  const { token } = req.headers;

    if(!token){
        return res.json({success: false,message: 'Not Authorized login again'})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        // console.log(token_decode)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default authUser



// import jwt from "jsonwebtoken";

// const authUser = async (req, res, next) => {
//   try {
//     // Extract token from the Authorization header
//     const authHeader = req.headers.authorization;
//     // console.log("Headers:", req.headers);

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Not Authorized. Please log in again.",
//       });
//     }

//     // Get the token from the header
//     const token = authHeader.split(" ")[1];

//     // Verify the token
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach userId to the request body
//     req.body.userId = decodedToken._id;

//     // Proceed to the next middleware
//     next();
//   } catch (error) {
//     console.error("Authentication Error:", error.message);

//     return res.status(401).json({
//       success: false,
//       message: "Authentication failed. Invalid or expired token.",
//     });
//   }
// };

// export default authUser;





