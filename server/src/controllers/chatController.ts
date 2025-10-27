import { Request, Response } from "express";
import { Message, ChatRoom } from "../models/Chat";

export const createMessage = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { senderId, senderName, text } = req.body;
  if (!text || !senderName) {
    return res.status(400).json({ error: "Missing senderName or text" });
  }

  try {
    // Ensure room exists
    let room = await ChatRoom.findOne({ _id: roomId });
    if (!room) {
      // If roomId looks like an ObjectId, create room using provided id
      try {
        room = await ChatRoom.create({ _id: roomId });
      } catch (e) {
        // If creating with provided id fails, create a new room and ignore provided id
        room = await ChatRoom.create({});
      }
    }

  // Normalize room id (Mongoose _id can be typed loosely); coerce to string safely
  const resolvedRoomId = room && (room as any)._id ? String((room as any)._id) : String(roomId);
  const message = await Message.create({ roomId: resolvedRoomId, senderId, senderName, text });
    return res.status(201).json(message);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  try {
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 }).limit(100);
    return res.json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  const { itemId } = req.body;
  try {
    const room = await ChatRoom.create({ itemId });
    return res.status(201).json(room);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getRoomByItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;
  try {
    const room = await ChatRoom.findOne({ itemId });
    if (!room) return res.status(404).json({ error: "Room not found" });
    return res.json(room);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
