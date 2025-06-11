// route.ts in /api/users/create
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/users";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name });
      await user.save();
    }
    return new Response(JSON.stringify({ message: "User stored", user }), { status: 200 });
  } catch (err) {
    console.error("🔥 Error in POST /api/users/create:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
