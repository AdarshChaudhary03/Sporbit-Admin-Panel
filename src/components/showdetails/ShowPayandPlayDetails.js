import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { DataGrid } from "@material-ui/data-grid";

import { getBookings, getUsers } from "../../functions/getter";

const ShowPayandPlayDetails = ({ selectedFacilityID }) => {
  const [bookings, setBookings] = useState({});
  const [users, setUsers] = useState({});
  const [initializing, setInitializing] = useState(false);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const convertToDate = (dateString) => {
    var date = new Date(dateString - 1000);
    date = date.toLocaleString();
    return date;
  };

  const columns = [
    { field: "id", headerName: "Id", width: 120 },
    { field: "date", headerName: "Date/Time", width: 200 },
    { field: "courtNo", headerName: "Court No", width: 200 },
    { field: "user", headerName: "User", width: 200 },
    { field: "booking", headerName: "Booking", width: 200 },
  ];

  const rows = [];
  Object.keys(bookings).map((bookingId, index) => {
    let tempRow = {};
    tempRow["id"] = index + 1;
    tempRow["date"] = convertToDate(bookingId.slice(0, bookingId.indexOf("-")));
    tempRow["courtNo"] = bookingId.charAt(bookingId.length - 1);
    tempRow["user"] = users[bookings[bookingId].user]
      ? users[bookings[bookingId].user].displayName
      : "User Not Available";
    tempRow["booking"] = bookings[bookingId].booked;

    rows.push(tempRow);
  });
  console.log(rows);

  useEffect(() => {
    getUsers()
      .then((user) => setUsers(user))
      .then(() => setInitializing(true));
    getBookings(selectedFacilityID).then((tempbookings) =>
      setBookings(tempbookings)
    );
  }, [selectedFacilityID]);

  if (!initializing) {
    return <div></div>;
  } else
    return (
      <div style={{ marginTop: 50, height: 400, width: 900 }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    );
};

export default ShowPayandPlayDetails;
