"use client";
import React, { useState, useEffect } from "react";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiCalendar } from "react-icons/fi";
import { useDispatch } from "react-redux";
import CurrentDate from "@/app/components/common/currentdate/page";
import SupervisorLayout from "@/app/components/layouts/supervisorlayout/page";
import { fetchNotes } from "@/store/reducer/common/fetchNotesReducer";
import NotesList from "@/app/components/common/notes/page";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const dispatch = useDispatch();
  //  to fetch notes
  useEffect(() => {
    // Dispatch the action to fetch notes
    dispatch(fetchNotes())
      .then((response) => {
        // Assuming response.data is an array of notes
        setNotes(response.data.notes);
        console.log(response.data.notes);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, [dispatch]);
  return (
    <SupervisorLayout>
      <div>
        <div className="bg-card p-2 m-2 rounded-lg mb-5">
          <div className="flex justify-between items-center my-2 ">
            <BreadCrumb text="Notes" />
            <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
              <FiCalendar className="text-white mx-2" /> <CurrentDate />
            </button>
          </div>
        </div>
        {notes.length > 0 ? (
          <NotesList notes={notes} />
        ) : (
          <p className="mx-2 text-xs">Loading...</p>
        )}
      </div>
    </SupervisorLayout>
  );
};

export default Notes;
