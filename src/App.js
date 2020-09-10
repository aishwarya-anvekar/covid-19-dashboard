import React, { Component } from "react";
import "./App.css";
import StateTable from "./components/StateTable/StateTable.jsx";
import ChloropethIndia from "./components/ChloropethIndia/ChloropethIndia";
import Charts from "./components/Charts/Charts";
export default class App extends Component {
  state = {
    statewise: [],
    confirmedCount: null,
    activeCount: null,
    recoveredCount: null,
    deceasedCount: null,
    selectedState: null,
    total: null,
    last7DaysData: null,
    lastupdatedtime: null,
    state: null,
  };

  getStateWiseDataFromAPI = () => {
    fetch(`https://api.covid19india.org/data.json`)
      .then((response) => response.json())
      .then((data) => {
        const statewiseData = data.statewise;
        const statewise = statewiseData.slice(1);
        const total = statewiseData[0];
        const { active, confirmed, recovered, deaths, lastupdatedtime } = total;
        this.setState(
          {
            total: total,
            statewise: statewise,
            confirmedCount: confirmed,
            activeCount: active,
            recoveredCount: recovered,
            deceasedCount: deaths,
            lastupdatedtime,
          },
          () => console.log("state ===>", this.state)
        );
      });
  };

  getLastSevenDaysDataFromAPI = () => {
    fetch(`https://api.covid19india.org/states_daily.json`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("last seven days data ===>>", data);
        const dataArray = data.states_daily;

        const length = dataArray.length - 1;
        const last7DaysData = [];
        for (let i = length; i > length - 7 * 3; i--) {
          last7DaysData.push(dataArray[i]);
        }
        this.setState({
          last7DaysData,
        });
        // console.log("last7DaysData ===>>", last7DaysData);
      });
  };

  componentDidMount() {
    this.getStateWiseDataFromAPI();
    this.getLastSevenDaysDataFromAPI();
  }

  setStatewiseCounts = (
    confirmedCount,
    activeCount,
    recoveredCount,
    deceasedCount,
    selectedState,
    lastupdatedtime,
    state
  ) => {
    this.setState({
      confirmedCount,
      activeCount,
      recoveredCount,
      deceasedCount,
      selectedState,
      lastupdatedtime,
      state,
    });
  };

  render() {
    return (
      <div className="main">
        <div className="state-table ">
          <Charts {...this.state} />
          <StateTable
            setStatewiseCounts={this.setStatewiseCounts}
            {...this.state}
          />
        </div>
        <div className="map">
          {this.state.statewise.length && (
          <ChloropethIndia
            setStatewiseCounts={this.setStatewiseCounts}
            {...this.state}
          />
          )}
        </div>
      </div>
    );
  }
}
