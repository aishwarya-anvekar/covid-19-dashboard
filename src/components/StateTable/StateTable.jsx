import React, { Component } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./StateTable.css";
import util from "../../utils/util";
class StateTable extends Component {
  state = { stateCode: null };
  onMouseEnter = (statecode) => {
    this.setState({ stateCode: statecode });
    const statewise = this.props.statewise;
    const stateInfo = util.getHoveredStateData(statewise, statecode);
    console.log("state info inside table >>", stateInfo);
    if (stateInfo) {
      const {
        active,
        confirmed,
        recovered,
        deaths,
        state,
        lastupdatedtime,
      } = stateInfo;
      const activeCount = active;
      const confirmedCount = confirmed;
      const recoveredCount = recovered;
      const deceasedCount = deaths;
      const selectedState = statecode;

      this.props.setStatewiseCounts(
        confirmedCount,
        activeCount,
        recoveredCount,
        deceasedCount,
        selectedState,
        lastupdatedtime,
        state
      );
    }
  };

  onMouseLeave = () => {
    this.setState({ stateCode: null });
    const {
      active,
      confirmed,
      recovered,
      deaths,
      lastupdatedtime,
    } = this.props.total;
    const activeCount = active;
    const confirmedCount = confirmed;
    const recoveredCount = recovered;
    const deceasedCount = deaths;
    const selectedState = null;
    this.props.setStatewiseCounts(
      activeCount,
      confirmedCount,
      recoveredCount,
      deceasedCount,
      selectedState,
      lastupdatedtime,
      null
    );
  };
  render() {
    // console.log("data in state ===>>", this.props.statewise);

    return (
      
      <TableContainer
        component={Paper}
        className="container card-border-radius  "
      >
        <Table className="table" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="table-row">
              <TableCell className="table-heading">STATE/UT</TableCell>
              <TableCell className="table-heading" align="right">
                CONFIRMED
              </TableCell>
              <TableCell className="table-heading" align="right">
                ACTIVE
              </TableCell>
              <TableCell className="table-heading" align="right">
                RECOVERED
              </TableCell>
              <TableCell className="table-heading" align="right">
                DECEASED
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.statewise.map((state) => (
              <TableRow
                className={`${
                  this.state.stateCode === state.statecode ? "state-hover" : ""
                }`}
                onMouseEnter={this.onMouseEnter.bind(this, state.statecode)}
                key={state.statecode}
                id={state.statecode}
                onMouseLeave={this.onMouseLeave}
              >
                <TableCell component="th" scope="row">
                  {state.state}
                </TableCell>
                <TableCell align="right">{state.confirmed}</TableCell>
                <TableCell align="right">{state.active}</TableCell>
                <TableCell align="right">{state.recovered}</TableCell>
                <TableCell align="right">{state.deaths}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default StateTable;
