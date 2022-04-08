import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function DisplayBatches({ coaches, batches }) {
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
              <TableCell className="tableRow">Batch Id</TableCell>
              <TableCell className="tableRow">Students</TableCell>
              <TableCell className="tableRow">Coaches</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(batches).map((batchId) => (
              <TableRow key={batchId}>
                <TableCell align="left">
                  {/* <img
                      src={students[studentId].photoURL}
                      width="50"
                      height="50"
                    /> */}
                  {batches[batchId].id}
                </TableCell>

                <TableCell align="left">
                  {batches[batchId].students.length}
                </TableCell>
                <TableCell align="left">
                  {batches[batchId].coach
                    ? (coaches[batches[batchId].coach]=='undefined' ? coaches[batches[batchId].coach].displayName : 'Display Name doesnot exist')
                    : "None"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
