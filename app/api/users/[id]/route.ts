// app/api/users/[id]/route.js
import { connectToDatabase } from "../../../../lib/mongodb";
import User from "../../../../models/users";

interface Params {
  id: string;
}

export async function GET(_: Request, { params }: { params: Params }) {
  await connectToDatabase();

  try {
    const { id } = params;
    const user = await User.findById(id).populate("collaborators");

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
