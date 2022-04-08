import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function DisplayCoaches({ coaches, batches }) {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    tableRow: {
      color: "#fff",
    },
  });
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className="tableHead">
            <TableRow>
              <TableCell className="tableRow">Name</TableCell>
              {/* <TableCell className="tableRow">Email</TableCell> */}
              <TableCell className="tableRow">Phone Number</TableCell>
              <TableCell className="tableRow">Batch</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(coaches).map((coachId) => (
              <TableRow key={coachId}>
                <TableCell align="left">
                  {/* <img
                      src={students[studentId].photoURL}
                      width="50"
                      height="50"
                    /> */}
                  {coaches[coachId].displayName}
                </TableCell>

                {/* <TableCell align="left">{coaches[coachId].email}</TableCell> */}
                <TableCell align="left">
                  {coaches[coachId].phoneNumber}
                </TableCell>
                <TableCell align="left">
                  {coaches[coachId].batches
                    ? coaches[coachId].batches.length
                    : 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
