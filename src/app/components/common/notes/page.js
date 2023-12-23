import React from "react";

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", options);

  const day = date.getDate();
  const suffix =
    day >= 10 && day <= 20 ? "th" : ["st", "nd", "rd"][(day % 10) - 1] || "th";
  const formattedDay = day + suffix;

  return formattedDate.replace(String(day), formattedDay);
}

const NotesList = ({ notes }) => {
  return (
    <>
      {notes.map((note) => (
        <div
          key={note._id} // Ensure a unique key for each note element
          className={`mx-2 my-2 rounded-lg p-3 border border-themeColor bg-transparent text-textColor hover:bg-themeColor hover:text-white  transition duration-500 cursor-pointer hover:shadow-lg  `}
        >
          <div className="flex items-center p-1">
            <div className="mx-1 md:flex md:items-center md:justify-between w-full">
              <div>
                <div className="text-sm font-medium mb-1">
                  {note.userId.firstName + " " + note.userId.lastName}
                </div>
                <div className="text-sm font-normal mb-1">{note.message}</div>
              </div>
              <div className="text-sm font-light mb-1">
                {formatDate(note.date)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NotesList;
