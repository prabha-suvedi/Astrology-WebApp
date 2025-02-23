import clientPromise from "@/lib/mongodb";
import { compare } from "bcrypt";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("mydatabase");  // Replace with your DB name

    // Check if user exists
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found." }),
        { status: 401 }
      );
    }

    // Compare password with the stored passwordHash
    const isMatch = await compare(password, user.passwordHash);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials." }),
        { status: 401 }
      );
    }

    // If we reach here, credentials are valid
    // You can create a session, JWT, or just return a success message
    return new Response(
      JSON.stringify({ message: "Sign in successful!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500 }
    );
  }
}
