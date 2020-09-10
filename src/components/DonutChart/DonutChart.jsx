import React from "react";
import "./DonutChart.css";
import ZingChart from "zingchart-react";
import "zingchart/es6";

const DonutChart = ({
  confirmedCount,
  activeCount,
  deceasedCount,
  recoveredCount,
}) => {
  const config = {
    type: "ring",
    legend: {
      marker: {
        type: "circle",
        size: 5,
      },
      "border-width": 0,
      "toggle-action": "remove",
      x: "67%",
      y: "38%",
    },
    plot: {
      "value-box": {
        text: `${parseInt(confirmedCount)} <br>  Confirmed`,
        placement: "center",
        "font-color": "black",
        "font-size": 20,
        "font-family": "Roboto",
        "font-weight": "bold",
        rules: [
          {
            rule: "%p != 0",
            visible: false,
          },
        ],
      },
      slice: "85%",
      "border-width": 2,
      "border-color": "#fff",
    },
    series: [
      {
        values: [parseInt(activeCount)],
        "background-color": "#006df2",
        text: `Active: ${activeCount}`,
      },
      {
        values: [parseInt(deceasedCount)],
        "background-color": "#5d666f",
        text: `Deceased: ${deceasedCount}`,
      },
      {
        values: [parseInt(recoveredCount)],
        "background-color": "#009b3e",
        text: `Recovered: ${recoveredCount}`,
      },
    ],
  };
  return <ZingChart height="200" data={config} />;
};

export default DonutChart;
