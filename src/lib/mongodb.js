import { connectDB } from "@/lib/mongodb"; // Use named import
import { compare } from "bcrypt";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    
    const dbConnection = await connectDB("userDB"); // Connect to the "userDB" database
    const db = dbConnection.db; // Access the database

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
