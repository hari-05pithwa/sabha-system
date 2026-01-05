import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const BalakSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    mobileNumber: String,
    address: String,
    photoUrl: String,
    area: String,
    standard: String,
    dob: Date, // Ensure this matches your registration data
  },
  {
    // CRITICAL: This allows 'age' to be sent to your frontend
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual property for age calculation
BalakSchema.virtual("age").get(function () {
  if (!this.dob) return null;

  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

const Balak = mongoose.models.Balak || mongoose.model("Balak", BalakSchema);

// GET: Fetches kids filtered by the Karyakar's assigned area
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();

    // Virtuals like 'age' will now show up because of the toJSON setting above
    const balaks = await Balak.find({ area: session.user.area }).sort({
      firstName: 1,
    });

    return NextResponse.json(balaks);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

// POST: Standard registration
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    await connectToDatabase();

    const newBalak = await Balak.create({
      ...data,
      area: session.user.area,
    });

    return NextResponse.json(newBalak, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
