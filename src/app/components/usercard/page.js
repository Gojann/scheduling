"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteUser } from "@/store/reducer/admin/deleteUserReducer";

const UserCard = ({ btnColor, name, email, status }) => {
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const teamLead = JSON.parse(localStorage.getItem("teamLead"));

  // Determine the appropriate path based on teamLead and token presence
  const userDetailPath = teamLead
    ? `/supervisor/userdetail/${email}`
    : `/admin/userdetail/${email}`;

  const handleDropdownToggle = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(email))
      .then((response) => {
        // Assuming response.data is an array of users
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  return (
    <div>
      <div className="px-4 py-4 my-2 w-[210px] max-w-sm bg-white rounded-lg hover:scale-105 transition duration-700 ease-in-out ">
        <div className="flex justify-end px-4 pt-4 relative">
          <button
            data-dropdown-toggle={`dropdownButton-${email}`} // Use a unique identifier based on email
            onClick={handleDropdownToggle}
            className="inline-block text-gray-500  hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>

          <div
            id={`dropdown-${email}`} // Use a unique identifier based on email
            className={`z-10 absolute top-[50px] border border-gray-300 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${
              dropdownVisible ? "" : "hidden"
            }`}
          >
            <ul className="py-2" aria-labelledby={`dropdownButton-${email}`}>
              <li>
                <Link
                  href={userDetailPath}
                  className="block px-4 py-2 text-sm text-textColor hover:bg-card"
                >
                  View Details
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-textColor hover:bg-card"
                >
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleDeleteUser}
                  className="block px-4 py-2 text-sm text-redColor hover:bg-card"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-md font-medium text-textColor">{name}</h5>
          <span className="text-sm text-gray-500 ">{email}</span>
          <div className=" mt-4 space-x-3 md:mt-6">
            <div
              className={`inline-flex items-center px-4 py-2 text-xs font-medium text-center text-white ${btnColor} rounded-lg `}
            >
              {status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default dynamic(() => Promise.resolve(UserCard), { ssr: false });
