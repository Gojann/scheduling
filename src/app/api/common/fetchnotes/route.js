import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import NoteModel from "../../../../../backend/models/Note";

const fetchNotesHandler = async () => {
  try {
    // Fetch all notes from the database and populate the 'userId' field with 'firstName' and 'lastName' from the 'UserModel'
    const notes = await NoteModel.find().populate({
      path: "userId",
      select: "firstName lastName", // Select the fields you want to retrieve
      model: "users", // Model name to populate from
    });

    return NextResponse.json(
      {
        notes,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch notes",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(fetchNotesHandler);
