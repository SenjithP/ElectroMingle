import Chat from "../models/chatSchema.js";
import Electrician from "../models/electricianSchema.js";
import User from "../models/userSchema.js";



export const createChat = async (req, res) => {

  // Check if there is an existing chat with the same members
  const existingChat = await Chat.findOne({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  });

  if (existingChat) {
    // If there's an existing chat, update its timestamp and return it

    // Update the timestamp to mark it as the most recently used or added chat
    existingChat.updatedAt = new Date();
    await existingChat.save();

    res.status(200).json(existingChat);
  } else {
    // If no existing chat, create a new one
    const newChat = new Chat({
      members: [req.body.senderId, req.body.receiverId],
    });

    try {
      const result = await newChat.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

  

export const userChats = async(req,res)=>{
    try {
        const chat  = await Chat.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
        
    }
}

export const findChat = async(req,res)=>{
    try {
        const chat = await Chat.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
        
    }
}


export const getClientDetails = async (req, res) => {
    try {
      const userDetails = await User.findOne({ _id: req.params.userId });
      const electricianDetails = await Electrician.findOne({
        _id: req.params.userId,
      });
  
      // Handle the case where no user or electrician is found
      if (!userDetails && !electricianDetails) {
        return res.status(404).json({ message: 'User or Electrician not found' });
      }
  
      // If user details are found, include them in the response
      if (userDetails) {
        return res.status(200).json({ userDetails });
      }
  
      // If electrician details are found, include them in the response
      return res.status(200).json({ electricianDetails });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred' });
    }
  };