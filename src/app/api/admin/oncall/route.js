import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import UserModel from "../../../../../backend/models/User";
import OnCallModel from "../../../../../backend/models/Oncall";

const addUserOnCallHandler = async (request) => {
  try {
    const {
      userId, // ID of the user to be added on call
      date, // Date for which the user should be added on call
    } = await request.json();

    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Extract the date part from the incoming date to compare
    const extractedDate = new Date(date);
    extractedDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    // Find the existing on-call entry for the extracted date
    let existingOnCall = await OnCallModel.findOne({
      date: extractedDate,
    });

    if (existingOnCall) {
      // Update the existing on-call user for the specified date
      existingOnCall.userId = userId;
      await existingOnCall.save();
    } else {
      // Create a new on-call entry for the specified date with the user ID
      existingOnCall = new OnCallModel({
        userId,
        date: extractedDate,
      });
      await existingOnCall.save();
    }

    return NextResponse.json(
      {
        message: `Added/Updated onCall user for date ${extractedDate}`,
        onCallUser: {
          userId,
          date: extractedDate,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error adding/updating onCall user:", error);
    return NextResponse.json(
      {
        message: "Failed to add/update onCall user",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(addUserOnCallHandler);
