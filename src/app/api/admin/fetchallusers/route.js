// backend/pages/api/teamleads.js

import { NextResponse } from "next/server";
import UserModel from "../../../../../backend/models/User";
import connectDb from "../../../../../backend/middleware/db";

const fetchAllUsersHandler = async () => {
  try {
    // Find all users who are team leads
    const allUsers = await UserModel.find();

    return NextResponse.json(
      {
        allUsers,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching all team leads:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch all team leads",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(fetchAllUsersHandler);
