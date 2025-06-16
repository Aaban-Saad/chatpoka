// route.ts in /api/users/update
// This route handles user createdAt and lastSeen updates in MongoDB
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/users";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    console.log("\n\n\nReceived body:", body);
    const sessionUser  = body.user;

    // console.log("\n\n\n   Email from body:", sessionUser?.email);

    if (!sessionUser?.id) {
      return new Response(JSON.stringify({ error: "Id is required" }), { status: 400 });
    }

    // Check if user already exists

    const databaseUser = await User.findOne({ _id: sessionUser.id });

    if (!databaseUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    console.log("\n\n\n  Database user", databaseUser);
    if (!databaseUser.createdAt) {
      databaseUser.createdAt = new Date();
      databaseUser.lastSeen = new Date();
      await databaseUser.save();

    } else {
      console.log("\n\n\n   User found,", databaseUser);
      databaseUser.lastSeen = new Date();
      await databaseUser.save();
    }
    return new Response(JSON.stringify({ message: "User updated", user: databaseUser }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error\n" + err }), { status: 500 });
  }
}



