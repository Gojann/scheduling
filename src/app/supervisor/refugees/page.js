"use client";
import React, { useState, useEffect } from "react";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiCalendar } from "react-icons/fi";
import { useDispatch } from "react-redux";
import CurrentDate from "@/app/components/common/currentdate/page";
import RefugeeList from "@/app/components/common/refugies/page";
import { fetchUserRefugee } from "@/store/reducer/common/fetchUserRefugeeReducer";
import SupervisorLayout from "@/app/components/layouts/supervisorlayout/page";

const Refugies = () => {
  const [refugee, setRefugee] = useState([]);

  const dispatch = useDispatch();
  //  to fetch refugee
  useEffect(() => {
    // Dispatch the action to fetch refugee
    dispatch(fetchUserRefugee())
      .then((response) => {
        // Assuming response.data is an array of refugee
        setRefugee(response.data.refugees);
      })
      .catch((error) => {
        console.error("Error fetching refugee:", error);
      });
  }, [dispatch]);
  return (
    <SupervisorLayout>
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
          <RefugeeList refugee={refugee} canUpdate={false} />
        ) : (
          <p className="mx-2 text-xs">Loading...</p>
        )}
      </div>
    </SupervisorLayout>
  );
};

export default Refugies;
