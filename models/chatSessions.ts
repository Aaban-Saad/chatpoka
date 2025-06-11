import { Schema, model, Document, Types } from 'mongoose';

export enum ChatStatus {
    ACTIVE = 'active',
    CLOSED = 'closed',
}

// Interface representing a document in the ChatSession collection
export interface IChatSession extends Document {
  _id: Types.ObjectId;
  agentId: Types.ObjectId;
  userId: Types.ObjectId;
  tenantId: Types.ObjectId;
  startedAt: Date;
  endedAt?: Date;
  status: ChatStatus;
  memoryContext?: Record<string, any>;
}

// Mongoose schema for the ChatSession collection
const chatSessionSchema = new Schema<IChatSession>({
  agentId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Agent', 
    required: true 
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  tenantId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Tenant', 
    required: true,
    index: true,
  },
  startedAt: { 
    type: Date, 
    default: Date.now 
  },
  endedAt: { 
    type: Date 
  },
  status: {
    type: String,
    enum: Object.values(ChatStatus),
    default: ChatStatus.ACTIVE,
    required: true,
  },
  memoryContext: { 
    type: Schema.Types.Mixed 
  },
});

export const ChatSession = model<IChatSession>('ChatSession', chatSessionSchema);
