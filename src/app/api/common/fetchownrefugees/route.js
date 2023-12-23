import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "../../../../../backend/models/User";
import RefugeeModel from "../../../../../backend/models/Refugee";
import connectDb from "../../../../../backend/middleware/db";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const fetchUserRefugeesHandler = async (request) => {
  try {
    // Obtain the token from the request headers
    const token = request.headers.get("Authorization");
    if (!token) {
      return NextResponse.json(
        {
          message: "Authentication failed. Token not provided.",
        },
        {
          status: 401,
        }
      );
    }

    // Verify the token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid token.",
        },
        {
          status: 401,
        }
      );
    }

    // Extract the userEmail from the decoded token
    const { userEmail } = decodedToken;

    // Fetch the user based on the provided email
    const user = await UserModel.findOne({ email: userEmail });

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

    // Fetch refugees assigned to the specified user
    const refugees = await RefugeeModel.find({
      assignedTo: user._id,
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
    console.error("Error fetching user refugees:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch user refugees.",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(fetchUserRefugeesHandler);
