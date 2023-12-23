"use client";
import React, { useState, useEffect } from "react";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiCalendar } from "react-icons/fi";
import { useDispatch } from "react-redux";
import CurrentDate from "@/app/components/common/currentdate/page";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import { fetchRefugees } from "@/store/reducer/common/fetchRefugeesReducer";
import RefugeeList from "@/app/components/common/refugies/page";
import { fetchUsers } from "@/store/reducer/admin/fetchAllUsersReducer";
import { useForm } from "react-hook-form";
import { updateRefugee } from "@/store/reducer/admin/updateRefugeeReducer";

const Refugies = () => {
  const { register } = useForm();

  const [refugee, setRefugee] = useState([]);
  const [userList, setUserList] = useState([]);

  const dispatch = useDispatch();
  //  to fetch refugee
  useEffect(() => {
    // Dispatch the action to fetch refugee
    dispatch(fetchRefugees())
      .then((response) => {
        // Assuming response.data is an array of refugee
        setRefugee(response.data.refugees);
      })
      .catch((error) => {
        console.error("Error fetching refugee:", error);
      });
  }, [dispatch]);

  // to fetch users
  useEffect(() => {
    // Dispatch the action to fetch users

    dispatch(fetchUsers())
      .then((response) => {
        // Assuming response.data is an array of users
        setUserList(response.data.allUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // update assign to
  const handleUpdateAssignTo = (refugeeId, assignedToUserId) => {
    console.log("refugee id is ", refugeeId);
    console.log("user id is ", assignedToUserId);
    // Dispatch the action to fetch refugee
    dispatch(updateRefugee(refugeeId, assignedToUserId))
      .then((response) => {
        // Assuming response.data is an array of refugee
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching refugee:", error);
      });
  };
  return (
    <SuperuserLayout>
      <div>
        <div className="bg-card p-2 m-2 rounded-lg mb-5">
          <div className="flex justify-between items-center my-2 ">
            <BreadCrumb text="Refugies List" />
            <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
              <FiCalendar className="text-white mx-2" /> <CurrentDate />
            </button>
          </div>
        </div>
        {refugee.length > 0 ? (
          <RefugeeList
            refugee={refugee}
            canUpdate={true}
            userList={userList}
            register={register}
            onSubmit={handleUpdateAssignTo}
          />
        ) : (
          <p className="mx-2 text-xs">Loading...</p>
        )}
      </div>
    </SuperuserLayout>
  );
};

export default Refugies;
