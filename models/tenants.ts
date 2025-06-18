import { Schema, model, Document, Types, models } from 'mongoose';

// Enum for tenant plans
export enum TenantPlan {
  FREE = 'free',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

// Interface representing a document in the Tenant collection
export interface ITenant extends Document {
  _id: Types.ObjectId;
  name: string;
  plan: TenantPlan;
  createdAt: Date;
  creatorsId?: Types.ObjectId; // Optional field for creator's ID
}

// Mongoose schema for the Tenant collection
const tenantSchema = new Schema<ITenant>({
  name: { 
    type: String, 
    required: true,
    trim: true,
  },
  plan: { 
    type: String,
    enum: Object.values(TenantPlan),
    default: TenantPlan.FREE,
    required: true,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  creatorsId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: false // Optional field for creator's ID
  },
});

export const Tenant = models.Tenant || model<ITenant>('Tenant', tenantSchema);