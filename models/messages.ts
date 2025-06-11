import { Schema, model, Document, Types } from 'mongoose';

export enum MessageSender {
    USER = 'user',
    AGENT = 'agent',
}

// Interface representing a document in the Message collection
export interface IMessage extends Document {
  _id: Types.ObjectId;
  sessionId: Types.ObjectId;
  sender: MessageSender;
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// Mongoose schema for the Message collection
const messageSchema = new Schema<IMessage>({
  sessionId: { 
    type: Schema.Types.ObjectId, 
    ref: 'ChatSession', 
    required: true,
    index: true,
  },
  sender: {
    type: String,
    enum: Object.values(MessageSender),
    required: true,
  },
  content: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now,
    index: true,
  },
  metadata: { 
    type: Schema.Types.Mixed 
  },
});

// Compound index for efficient message retrieval within a session
messageSchema.index({ sessionId: 1, timestamp: -1 });

export const Message = model<IMessage>('Message', messageSchema);
