import mongoose from "mongoose";

const studentSchema =
  new mongoose.Schema(
    {
      data: {
        type: String,
        required: true,
      },
    },

    {
      timestamps: true,
    }
  );

const Student =
  mongoose.model(
    "Student",
    studentSchema
  );

export default Student;