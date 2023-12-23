import React from "react";

const OnCallAlert = ({ firstName, lastName }) => {
  return (
    <div
      className="p-4 text-sm text-themeColor rounded-lg bg-card"
      role="alert"
    >
      <span className="font-medium">On call Info!</span>{" "}
      {firstName && lastName ? (
        <>
          {firstName} {lastName} is on call from 11 pm to 7:30 am
        </>
      ) : (
        <>No one is currently on call</>
      )}
    </div>
  );
};

export default OnCallAlert;
