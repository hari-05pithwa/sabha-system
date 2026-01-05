import { NextResponse } from "next/server";

import connectToDatabase from "@/lib/mongodb";

import mongoose from "mongoose";

import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/route";

const AttendanceSchema = new mongoose.Schema({
  date: String,

  area: String,

  attendanceList: [
    {
      balakId: mongoose.Schema.Types.ObjectId,

      fullName: String,

      status: String,
    },
  ],
});

const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    // Secure the API: Only allow authenticated users

    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const month = searchParams.get("month");

    // Force filtering by the user's specific area

    let query = { area: session.user.area };

    if (month) {
      query.date = { $regex: `^${month}` };
    }

    const history = await Attendance.find(query).sort({ date: -1 });

    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    await connectToDatabase();

    // Prevent duplicates and ensure area-specific overwrite

    await Attendance.findOneAndDelete({
      date: data.date,
      area: session.user.area,
    });

    const record = await Attendance.create({
      ...data,

      area: session.user.area, // Enforce area from session, not client data
    });

    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
