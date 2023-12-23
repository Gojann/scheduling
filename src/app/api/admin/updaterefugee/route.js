import { NextResponse } from "next/server";
import RefugeeModel from "../../../../../backend/models/Refugee";
import connectDb from "../../../../../backend/middleware/db";

const updateRefugeeHandler = async (request) => {
  try {
    const {
      refugeeId, // Refugee ID to be updated
      assignedToUserId, // New User ID to assign the refugee
    } = await request.json();

    // Find the refugee by ID
    const refugeeToUpdate = await RefugeeModel.findById(refugeeId);

    if (!refugeeToUpdate) {
      return NextResponse.json(
        {
          message: "Refugee not found",
        },
        {
          status: 404,
        }
      );
    }

    // Update the assignedTo field with the new User ID
    refugeeToUpdate.assignedTo = assignedToUserId;

    // Save the updated refugee
    const updatedRefugee = await refugeeToUpdate.save();

    return NextResponse.json(
      {
        updatedRefugee,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating Refugee:", error);
    return NextResponse.json(
      {
        message: "Failed to update refugee",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(updateRefugeeHandler);
