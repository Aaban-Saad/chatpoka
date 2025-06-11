import { Schema, model, Document, Types } from 'mongoose';

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
}

// Interface for tool parameters
interface IToolParam {
    name: string;
    type: string;
    description: string;
    required: boolean;
}

// Interface for tool authentication config
interface IAuthConfig {
    type: 'apiKey' | 'oauth';
    config: Record<string, any>;
}

// Interface representing a document in the Tool collection
export interface ITool extends Document {
  _id: Types.ObjectId;
  tenantId: Types.ObjectId;
  name: string;
  description: string;
  endpoint: string;
  method: HttpMethod;
  params: IToolParam[];
  authConfig?: IAuthConfig;
  enabled: boolean;
}

// Mongoose schema for the Tool collection
const toolSchema = new Schema<ITool>({
  tenantId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Tenant', 
    required: true,
    index: true,
  },
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  endpoint: { 
    type: String, 
    required: true 
  },
  method: {
    type: String,
    enum: Object.values(HttpMethod),
    required: true,
  },
  params: [{
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    required: { type: Boolean, default: false },
  }],
  authConfig: {
    type: { type: String },
    config: { type: Schema.Types.Mixed },
  },
  enabled: { 
    type: Boolean, 
    default: true 
  },
});

export const Tool = model<ITool>('Tool', toolSchema);
