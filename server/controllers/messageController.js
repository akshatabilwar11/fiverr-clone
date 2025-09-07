import Message from "../models/Message.js";

// Create new message
export const createMessage = async (req, res) => {
  try {
    const newMessage = new Message({
      conversationId: req.body.conversationId,
      userId: req.userId, // from JWT
      desc: req.body.desc,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all messages in a conversation
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
