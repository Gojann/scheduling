import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import NoteModel from "../../../../../backend/models/Note";
import connectDb from "../../../../../backend/middleware/db";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const addNoteHandler = async (request) => {
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

    // Extract the userId from the decoded token
    const { userId } = decodedToken;

    // Extract the field values from the request body
    const { message } = await request.json();

    console.log("Received note data:", {
      userId,
      message,
    });

    // Create a new instance of the 'Note' model and assign the field values
    const newNote = new NoteModel({
      userId,
      message,
    });

    // Save the new note to the database
    const savedNote = await newNote.save();

    console.log("New note added:", savedNote);
    return NextResponse.json(
      {
        savedNote,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error adding note:", error);
    return NextResponse.json(
      {
        message: "Failed to add note",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(addNoteHandler);
