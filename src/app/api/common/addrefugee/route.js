import { NextResponse } from "next/server";
import RefugeeModel from "../../../../../backend/models/Refugee";
import connectDb from "../../../../../backend/middleware/db";

const addRefugeeHandler = async (request) => {
  try {
    // Extract the field values from the request body
    const {
      firstName,
      lastName,
      userEmail,
      assignedToUserId, // Assuming you receive the User ID to whom the refugee is assigned
      // Other fields specific to refugees
    } = await request.json();

    console.log("Received refugee data:", {
      firstName,
      lastName,
      userEmail,
      assignedToUserId,
      // Other refugee-specific fields
    });

    // Check if the email already exists in the refugee database
    const existingRefugee = await RefugeeModel.findOne({ email: userEmail });
    if (existingRefugee) {
      return NextResponse.json(
        {
          message: "Refugee Already Exists",
        },
        {
          status: 400,
        }
      );
    }

    // Create a new instance of the 'Refugee' model and assign the field values
    const newRefugee = new RefugeeModel({
      firstName,
      lastName,
      email: userEmail,
      assignedTo: assignedToUserId, // Assigning the refugee to a User
      // Other refugee-specific fields
    });

    // Save the new Refugee to the database
    const savedRefugee = await newRefugee.save();

    console.log("new refugee", savedRefugee);
    return NextResponse.json(
      {
        savedRefugee,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving Refugee:", error);
    return NextResponse.json(
      {
        message: "Failed to add refugee",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(addRefugeeHandler);
