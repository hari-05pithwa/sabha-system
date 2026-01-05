import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    // Change only this line inside your attendanceList array:
    attendanceList: [
      {
        balakId: { type: String, required: true }, // Changed from ObjectId to String
        fullName: String,
        status: { type: String, enum: ["Present", "Absent"], required: true },
      },
    ],
    submittedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

// This ensures we don't create duplicate entries for the same date and area
AttendanceSchema.index({ date: 1, area: 1 }, { unique: true });

const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
export default Attendance;
