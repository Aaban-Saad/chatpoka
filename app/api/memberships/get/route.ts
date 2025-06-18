import { NextRequest, NextResponse } from 'next/server';
import { IMembership as IBaseMembership, Membership } from '@/models/memberships';
import { Tenant } from '@/models/tenants';

interface IMembership extends IBaseMembership {
    tenantName?: string | null;
    plan?: string | null;
    image?: string | null;
}
import { ITenant } from '@/models/tenants';
import users from '@/models/users';


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const userId = body.userId;

        if (!userId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }

        const memberships = await Membership.find({ userId });
        const tenantIds = memberships.map((m: IMembership) => m.tenantId);
        const tenants = await Tenant.find({ _id: { $in: tenantIds } }, { name: 1, plan: 1, creatorsId: 1 });
        const creators = await users.find({ _id: userId }, { image: 1 });
        
        // Convert Mongoose documents to plain objects
        const membershipsWithTenantInfo = memberships.map((membership: IMembership) => {
            const m = membership.toObject ? membership.toObject() : { ...membership };
            const tenant = tenants.find((t: ITenant) => t._id.toString() === m.tenantId.toString());
            const creator = creators.find((c) => String(c._id) === String(userId));
            if (tenant && creator) {
                m.tenantName = tenant.name || null;
                m.plan = tenant.plan || null;
                m.image = creator.image || null; // Assuming 'image' is the field for user's photo
            } else {
                m.tenantName = null;
                m.plan = null;
                m.image = null;
            }
            return m;
        });
        return NextResponse.json(membershipsWithTenantInfo);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch memberships: ' + error}, { status: 500 });
    }
}
