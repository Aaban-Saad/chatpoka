// route.ts in /api/users/update
// This route handles user createdAt and lastSeen updates in MongoDB
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/users";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    console.log("\n\n\nReceived body:", body);
    const { email } = body;

    console.log("\n\n\n   Email from body:", email);

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    // Check if user already exists

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    if (!user.createdAt) {
      console.log("\n\n\n   User not found, creating new user:", email);
      user.createdAt = new Date();
      user.lastSeen = new Date();
      await user.save();
    } else {
      console.log("\n\n\n   User found,", email);
      user.lastSeen = new Date();
      await user.save();
    }
    return new Response(JSON.stringify({ message: "User updated", user }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error\n" + err }), { status: 500 });
  }
}
