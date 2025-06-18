
import { connectToDatabase } from "@/lib/mongodb";
import { Tenant } from "@/models/tenants";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    console.log("\n\n\nReceived body:", body);
    const { creatorsId, name, plan } = body;


    if (!creatorsId) {
      return new Response(JSON.stringify({ error: "Creators ID is required" }), { status: 400 });
    }
    if (!name) {
      return new Response(JSON.stringify({ error: "Tenant name is required" }), { status: 400 });
    }
    if (!plan) {
      return new Response(JSON.stringify({ error: "Tenant plan is required" }), { status: 400 });
    }

    const databaseTenant = await Tenant.findOne({ creatorsId });

    if (databaseTenant) {
      return new Response(JSON.stringify({ error: "Tenant already exists for this creator" }), { status: 400 });
    }

    console.log("\n\n\n   Creating tenant with:", { creatorsId, name, plan });

    const tenant = new Tenant({
      creatorsId,
      name,
      plan,
      createdAt: new Date(),
    });
    await tenant.save();

    console.log("\n\n\n   Tenant created:", tenant);


    return new Response(JSON.stringify({ message: "Tenant created" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error\n" + err }), { status: 500 });
  }
}
