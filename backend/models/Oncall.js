import mongoose from "mongoose";
const { Schema } = mongoose;

const onCallSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  date: { type: Date, required: true },
  // Other fields related to on-call details, if needed
});

const OnCallModel =
  mongoose.models.oncalls || mongoose.model("oncalls", onCallSchema);

export default OnCallModel;
