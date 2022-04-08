import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import firebaseConfig from "../../configs/firebaseConfig";
import { getResidents } from "../../functions/getter";

export default function DisplayResidents({ selectedSocietyID, residents }) {
  //   const [view, setView] = useState(false);
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    tableRow: {
      color: "#fff",
    },
  });
  const classes = useStyles();

  const changeVerification = async (selectedResidentID) => {
    console.log(selectedSocietyID);
    await firebaseConfig
      .firestore()
      .collection(`societies/${selectedSocietyID}/residents`)
      .doc(selectedResidentID)
      .update({ isVerified: !residents[selectedResidentID].isVerified });

    // await getResidents(selectedSocietyID);
  };

  useEffect(() => {}, [residents, selectedSocietyID]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className="tableHead">
            <TableRow>
              <TableCell className="tableRow">Name</TableCell>
              <TableCell className="tableRow">Phone Num</TableCell>
              <TableCell className="tableRow">Tower Num</TableCell>
              <TableCell className="tableRow">Flat Num</TableCell>
              <TableCell className="tableRow">isVerified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(residents).map((residentId) => (
              <TableRow key={residentId}>
                <TableCell align="left">
                  {/* <img
                      src={residents[residentId].photoURL}
                      width="50"
                      height="50"
                    /> */}
                  {residents[residentId].name}
                </TableCell>
                <TableCell align="left">
                  {residents[residentId].phoneNumber}
                </TableCell>
                <TableCell align="left">
                  {residents[residentId].towerNumber}
                </TableCell>
                <TableCell align="left">
                  {residents[residentId].flatNumber}
                </TableCell>
                <TableCell align="left">
                  {residents[residentId].isVerified ? (
                    <button onClick={() => changeVerification(residentId)}>
                      True
                    </button>
                  ) : (
                    <button onClick={() => changeVerification(residentId)}>
                      False
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
