import { Schema, model, Document, Types, models } from 'mongoose';

// Enum for membership roles
export enum MembershipRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

// Interface representing a document in the Membership collection
export interface IMembership extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  tenantId: Types.ObjectId;
  role: MembershipRole;
  createdAt: Date;
}

// Mongoose schema for the Membership collection
const membershipSchema = new Schema<IMembership>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  tenantId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Tenant', 
    required: true 
  },
  role: { 
    type: String,
    enum: Object.values(MembershipRole),
    required: true,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Create a compound unique index on userId and tenantId
membershipSchema.index({ userId: 1, tenantId: 1 }, { unique: true });

export const Membership = models.Membership || model<IMembership>('Membership', membershipSchema);

