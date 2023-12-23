"use client";
import React, { useEffect, useState } from "react";
import { FiCalendar, FiUserPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { useDispatch } from "react-redux";
import CurrentDate from "@/app/components/common/currentdate/page";
import { addRefugee } from "@/store/reducer/common/addRefugeeReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SupervisorLayout from "@/app/components/layouts/supervisorlayout/page";

const AddRefugee = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  // show toast message
  const showToast = (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onSubmit = async (data) => {
    // Dispatch the addBlog action with the form data and headers
    await dispatch(addRefugee(data));
    showToast("Refugee Added");
  };

  return (
    <SupervisorLayout>
      <div className="m-2 p-2">
        <div className="flex justify-between items-center my-2 bg-card p-2  rounded-lg mb-5">
          <BreadCrumb text="Add Refugee" />
          <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
            <FiCalendar className="text-white mx-2" /> <CurrentDate />
          </button>
        </div>

        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="firstName"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="John"
              />
            </div>
            <div>
              <label
                for="lastName"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              for="userEmail"
              className="block mb-2 text-sm font-medium text-textColor "
            >
              Email
            </label>
            <input
              type="email"
              {...register("userEmail")}
              id="userEmail"
              className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              placeholder="John@doe.com"
            />
          </div>

          <button
            type="submit"
            className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
          >
            <FiUserPlus className="text-white mx-2" /> Add Refugee
          </button>
        </form>
        <ToastContainer />
      </div>
    </SupervisorLayout>
  );
};

export default AddRefugee;
