// controllers/orderController.js
import Order from "../models/orderModel.js";
import Conversation from "../models/conversationModel.js";

// ✅ Create Order and ensure a conversation is created
export const createOrder = async (req, res) => {
  try {
    const { gigId, sellerId, price } = req.body;

    if (!gigId || !sellerId || !price) {
      return res.status(400).json({ message: "gigId, sellerId, and price are required" });
    }

    const newOrder = new Order({
      gigId,
      buyerId: req.userId,   // from token
      sellerId,
      price,
    });

    await newOrder.save();

    // also create/update conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [req.userId, sellerId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [req.userId, sellerId],
      });
      await conversation.save();
    }

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ Get all orders for current user
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ buyerId: req.userId }, { sellerId: req.userId }],
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

// ✅ Get single order by ID
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error: error.message });
  }
};

// ✅ Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
};
