"use client";
import React, { useState } from "react";

const RefugeeList = ({ refugee, canUpdate, userList, onSubmit }) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const handleUpdate = (event, refugeeItemId, userId) => {
    event.preventDefault();

    onSubmit(refugeeItemId, userId); // Trigger the onSubmit function
  };
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              {canUpdate && (
                <>
                  <th scope="col" className="px-6 py-3">
                    Assigned To
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Change Assigned To
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {refugee.map((refugeeItem) => (
              <tr key={refugeeItem._id} className="bg-white border-b">
                <td className="px-6 py-4 whitespace-nowrap">
                  {refugeeItem.firstName}
                </td>
                <td className="px-6 py-4">{refugeeItem.lastName}</td>
                <td className="px-6 py-4">{refugeeItem.email}</td>
                {canUpdate && (
                  <>
                    <td className="px-6 py-4">
                      {refugeeItem.assignedTo
                        ? `${refugeeItem.assignedTo.firstName} ${refugeeItem.assignedTo.lastName}`
                        : "Pending"}
                    </td>
                    <td className="px-6 py-4">
                      <form
                        onSubmit={(event) =>
                          handleUpdate(event, refugeeItem._id, selectedUserId)
                        }
                        className="flex gap-2"
                      >
                        <select
                          className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5"
                          name="assignedToUserId"
                          id="assignedToUserId"
                          onChange={(event) =>
                            setSelectedUserId(event.target.value)
                          }
                        >
                          <option value="" disabled selected>
                            Choose Assigned To
                          </option>
                          {userList &&
                            userList.map((user) => (
                              <option key={user._id} value={user._id || ""}>
                                {user.firstName} {user.lastName}
                              </option>
                            ))}
                        </select>

                        <button
                          type="submit"
                          className="p-2 text-xs font-medium text-center rounded-lg focus:outline-none text-white bg-indigo-500"
                        >
                          Update
                        </button>
                      </form>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RefugeeList;
