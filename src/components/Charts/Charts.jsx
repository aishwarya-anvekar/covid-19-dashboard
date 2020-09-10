import React from "react";
import LineChart from "../LineChart/LineChart";
import DonutChart from "../DonutChart/DonutChart";
import { Card } from "@material-ui/core";
import "./Charts.css";


const Charts = ({
  statewise,
  last7DaysData,
  selectedState,
  confirmedCount,
  activeCount,
  recoveredCount,
  deceasedCount,
}) => {
  return (
    <>
      <div className="header1">
        <div>
          <img src="logo.png"/> 
        </div>
        <div>
          <div className="main-title">INDIA COVID-19 Tracker</div>
          <div className="sub-title">Let's all pray to make our Earth Covid-19 free soon, Stay Safe and do TheLocate</div>
        </div>
      </div>
      <Card className="chart card-border-radius">
        <div className="donut-chart">
          {statewise.length && (
            <DonutChart
              confirmedCount={confirmedCount}
              activeCount={activeCount}
              recoveredCount={recoveredCount}
              deceasedCount={deceasedCount}
            />
          )}
        </div>
        <div className="line-chart">
          {last7DaysData && last7DaysData.length && (
            <LineChart
              selectedState={selectedState}
              last7DaysData={last7DaysData}
            />
          )}
        </div>
      </Card>
    </>
  );
};

export default Charts;
