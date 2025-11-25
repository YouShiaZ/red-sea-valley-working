import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { initFirebase, db } from "./config/firebase.js";

dotenv.config();

// Initialize Firebase
initFirebase();

async function createAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL;
    const plainPassword = process.env.ADMIN_PASSWORD;

    if (!email || !plainPassword) {
      console.error("ADMIN_EMAIL or ADMIN_PASSWORD missing from .env");
      process.exit(1);
    }

    const hashed = await bcrypt.hash(plainPassword, 10);

    await db()
      .collection("admins")
      .doc("owner")
      .set({
        email,
        password: hashed,
        role: "owner",
        createdAt: new Date(),
      });

    console.log("Admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err.message);
    process.exit(1);
  }
}

createAdmin();
