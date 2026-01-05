import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// 1. Define or Retrieve the Balak Model
const BalakSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  mobileNumber: String,
  standard: String,
  address: String,
  photoUrl: String,
  area: String,
  createdAt: { type: Date, default: Date.now }
});

const Balak = mongoose.models.Balak || mongoose.model("Balak", BalakSchema);

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    // Guard: Only logged-in Karyakars can register kids
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    await connectToDatabase(); // Use the Mongoose connection

    // 2. Process and Format the Data
    const newBalakData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      // Format: "Harikrishna Pithwa"
      fullName: `${data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1).toLowerCase()} ${data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1).toLowerCase()}`,
      mobileNumber: data.mobileNumber || "N/A",
      standard: data.standard,
      address: data.address,
      photoUrl: data.photoUrl,
      // Stamp with the Karyakar's area from the session
      area: session.user.area, 
    };

    // 3. Save using Mongoose
    const result = await Balak.create(newBalakData);
    
    return NextResponse.json({ success: true, id: result._id });
  } catch (e) {
    console.error("Registration Save Error:", e);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}