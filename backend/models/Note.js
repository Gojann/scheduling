import mongoose from "mongoose";
const { Schema } = mongoose;

const noteSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    date: { type: Date, default: Date.now },
    message: { type: String },
    // Add other fields as needed
  },
  { timestamps: true }
);

const NoteModel = mongoose.models.notes || mongoose.model("notes", noteSchema);

export default NoteModel;
