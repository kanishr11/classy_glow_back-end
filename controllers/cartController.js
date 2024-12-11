

// Add products to user cart

import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
    try {
      const {userId, itemId, size } = req.body;
      console.log(userId,itemId,size)
      // console.log("Request Body:", req.body);

  
      // Find user data
      const userData = await userModel.findById(userId);
      console.log("User Data:", userData);
      
      // Handle case where user is not found
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      let cartData = userData.cartData || {}; // Initialize cartData if it's null or undefined
      // console.log("Cart Data Before Update:", cartData);

      // Update cart data
      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = { [size]: 1 };
      }
  
      // Update user's cart data in the database
      await userModel.findByIdAndUpdate(userId, { cartData });
  
      res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
    console.log("Is working")
  };
  
// Update user cart
const updateCart = async (req,res) =>{
    try {
        const { itemId, size, quantity } = req.body   
        
        const userData = await userModel.findById(userId);

        let cartData = await userData.cartData;
        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId,{cartData});

        res.json({success:true,message:"Cart Updated"});


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message});
    }
}

// Get user cart data
const getUserCart = async (req,res) =>{
    try {
        
        const { userId } = req.body;

        const userData = await userModel.findById(userId);

        let cartData = await userData.cartData;

        res.json({success:true,cartData});


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message});
    }
}

export { addToCart, updateCart, getUserCart }