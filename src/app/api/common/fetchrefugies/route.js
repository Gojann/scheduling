import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import RefugeeModel from "../../../../../backend/models/Refugee";

const fetchRefugeesHandler = async () => {
  try {
    const refugees = await RefugeeModel.find().populate({
      path: "assignedTo",
      select: "firstName lastName", // Select the fields you want to retrieve
      model: "users", // Model name to populate from
    });

    return NextResponse.json(
      {
        refugees,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching refugees:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch refugees",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(fetchRefugeesHandler);
