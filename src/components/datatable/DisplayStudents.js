import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function DisplayStudents({ students, batches }) {
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
              <TableCell className="tableRow">Gender</TableCell>
              <TableCell className="tableRow">Status</TableCell>
              <TableCell className="tableRow">Level</TableCell>
              <TableCell className="tableRow">Batch</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(students).map((studentId) => (
              <TableRow key={studentId}>
                <TableCell align="left">
                  {/* <img
                      src={students[studentId].photoURL}
                      width="50"
                      height="50"
                    /> */}
                  {students[studentId].name}
                </TableCell>
                <TableCell align="left">
                  {students[studentId].gender
                    ? students[studentId].gender
                    : "Not Specified"}
                </TableCell>
                <TableCell align="left">{students[studentId].status}</TableCell>
                <TableCell align="left">{students[studentId].level}</TableCell>
                <TableCell align="left">
                  {batches[students[studentId].batch].id}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
