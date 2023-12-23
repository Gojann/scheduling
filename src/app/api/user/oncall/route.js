import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import OnCallModel from "../../../../../backend/models/Oncall";

const fetchOnCallUserHandler = async () => {
  try {
    // Get today's date in a format suitable for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    // Find the user on call for today's date
    const onCallUser = await OnCallModel.findOne({ date: today })
      .populate("userId", "firstName lastName")
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(1);

    if (!onCallUser) {
      return NextResponse.json(
        {
          message: "No user on call today yet.",
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Fetched on-call user successfully.",
        onCallUser: {
          firstName: onCallUser.userId.firstName,
          lastName: onCallUser.userId.lastName,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching on-call user:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch on-call user",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(fetchOnCallUserHandler);
