// route.ts in /api/users/create
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/users";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    console.log("\n\n\nReceived body:", body);
    const { email, name, provider, image, providerAccountId, lastSignIn } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name, provider, image, providerAccountId, lastSignIn });
      await user.save();
    } else {
      user.name = name || user.name;
      user.provider = provider || user.provider;
      user.image = image || user.image;
      // Set lastSignIn to provided value or current time in Bangladesh (UTC+6)
      user.lastSignIn = lastSignIn;
      user.providerAccountId = providerAccountId || user.providerAccountId;
      await user.save();
    }
    return new Response(JSON.stringify({ message: "User stored", user }), { status: 200 });
  } catch (err) {

    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
