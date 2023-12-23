// EmployeeLayout.js
"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/components/header/page";
import Navbar from "../../navbar/page";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import OnCallAlert from "../../common/oncallalert/page";
import { useDispatch } from "react-redux";
import { fetchOnCallUser } from "@/store/reducer/user/onCallReducer";

const EmployeeLayout = ({ children }) => {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    // Retrieve teamLead status from localStorage
    const isTeamLead = localStorage.getItem("teamLead") !== "true";
    const token = localStorage.getItem("token");
    if (!isTeamLead || !token) {
      router.push("/"); // Redirect to homepage if not a team lead
    }
    const handleWindowResize = () => {
      if (window.innerWidth < 850 && window.innerWidth > 766) {
        setToggle(true);
      } else {
        setToggle(false);
      }
    };

    // Add event listener to window resize event.
    window.addEventListener("resize", handleWindowResize);

    // Clean up the event listener on component unmount.
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // for drawer
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const dispatch = useDispatch();
  const [onCall, setOnCall] = useState({});

  useEffect(() => {
    // Dispatch the action to fetch alerts
    dispatch(fetchOnCallUser())
      .then((response) => {
        // Assuming response.data is an array of alerts
        console.log(response.data);
        setOnCall(response.data.onCallUser);
      })
      .catch((error) => {
        console.error("Error fetching alerts:", error);
      });
  }, [dispatch]);
  return (
    <>
      <Navbar toggleDrawer={toggleDrawer} handleToggle={handleToggle} />
      <div>
      {onCall && (
          <OnCallAlert
            firstName={onCall.firstName}
            lastName={onCall.lastName}
          />
        )}
      </div>
            <div style={{ display: "flex" }}>
        <Header
          userRole="employee"
          toggle={toggle}
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          pathname={pathname}
        />
        {/* Additional components and functionalities specific to employee */}
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </>
  );
};

export default EmployeeLayout;
