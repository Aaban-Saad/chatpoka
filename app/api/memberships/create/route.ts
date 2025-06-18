
import { connectToDatabase } from "@/lib/mongodb";
import { Membership } from "@/models/memberships";
import { Tenant } from "@/models/tenants";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    console.log("\n\n\nReceived body:", body);
    let { userId, role, tenantId } = body;


    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }
    if (!role) {
      return new Response(JSON.stringify({ error: "Role is required" }), { status: 400 });
    }

    if (!tenantId) {
      const databaseTenant = await Tenant.findOne({ creatorsId: userId });
      
      if (!databaseTenant) {
        return new Response(JSON.stringify({ error: "Tenant does not exist for this user." }), { status: 400 });
      }

      tenantId = databaseTenant._id;
    }

    const existingMembership = await Membership.findOne({ userId, tenantId });

    if (existingMembership) {
      return new Response(JSON.stringify({ error: "Membership already exists for this user in this tenant." }), { status: 400 });
    }

    const membership = new Membership({
      userId,
      tenantId,
      role,
      createdAt: new Date(),
    });
    await membership.save();

    console.log("\n\n\n   Membership created:", membership);


    return new Response(JSON.stringify({ message: "Membership created" }), { status: 200 });
  } catch (err) {
    console.error("Error creating membership:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error\n" + err }), { status: 500 });
  }
}
