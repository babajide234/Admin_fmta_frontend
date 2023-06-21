// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Function to get the current date in a user-friendly format
    const getCurrentDate = () => {
      const date = new Date();
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };

    setCurrentDate(getCurrentDate());
  }, []);

  return <div className="p3 secondary-disabled current-date">Current Date: {currentDate}</div>;
};

export default CurrentDate;
