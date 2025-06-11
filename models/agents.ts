import { Schema, model, Document, Types } from 'mongoose';

// Interface representing a document in the Agent collection
export interface IAgent extends Document {
  _id: Types.ObjectId;
  tenantId: Types.ObjectId;
  name: string;
  description?: string;
  avatarUrl?: string;
  persona: string;
  systemPrompt: string;
  temperature: number;
  ownerId: Types.ObjectId;
  collaborators: Types.ObjectId[];
  sharedWithTenant: boolean;
  tools: Types.ObjectId[];
  memoryEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for the Agent collection
const agentSchema = new Schema<IAgent>({
  tenantId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Tenant', 
    required: true,
    index: true,
  },
  name: { 
    type: String, 
    required: true,
    trim: true,
  },
  description: { 
    type: String,
    trim: true,
  },
  avatarUrl: { 
    type: String,
    trim: true,
  },
  persona: { 
    type: String, 
    required: true 
  },
  systemPrompt: { 
    type: String, 
    required: true 
  },
  temperature: { 
    type: Number, 
    default: 0.7,
    min: 0,
    max: 2,
  },
  ownerId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  collaborators: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  sharedWithTenant: { 
    type: Boolean, 
    default: false 
  },
  tools: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Tool' 
  }],
  memoryEnabled: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
}, { timestamps: true }); // Using timestamps option auto-manages createdAt and updatedAt

export const Agent = model<IAgent>('Agent', agentSchema);
