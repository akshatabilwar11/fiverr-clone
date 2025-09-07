import Conversation from "../models/conversationModel.js";

// ✅ Create a conversation
export const createConversation = async (req, res) => {
  try {
    const { buyerId, sellerId } = req.body;

    if (!buyerId || !sellerId) {
      return res.status(400).json({ message: "Both buyerId and sellerId are required" });
    }

    // Check if conversation already exists
    const existingConversation = await Conversation.findOne({
      participants: { $all: [buyerId, sellerId] },
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    const newConversation = new Conversation({
      participants: [buyerId, sellerId],
    });

    await newConversation.save();
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all conversations for a user
export const getConversations = async (req, res) => {
  try {
    const userId = req.userId; // from JWT middleware

    const conversations = await Conversation.find({
      participants: userId,
    });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single conversation by ID
export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
