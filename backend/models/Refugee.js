import mongoose from "mongoose";

const refugeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  // Other refugee fields can be added here
});

const RefugeeModel =
  mongoose.models.refugees || mongoose.model("refugees", refugeeSchema);

export default RefugeeModel;
