import React from "react";
import ZingChart from "zingchart-react";
import "zingchart/es6";
import util from "../../utils/util";

const LineChart = ({ last7DaysData, selectedState }) => {
  const confirmedData = util.getLast7DaysData(last7DaysData, "confirmed");
  const deceasedData = util.getLast7DaysData(last7DaysData, "deceased");
  const recoveredData = util.getLast7DaysData(last7DaysData, "recovered");

  // console.log("selectedState", selectedState);
  selectedState = selectedState && selectedState.toLowerCase();
  const confirmedDataValues = selectedState
    ? confirmedData.map((data) => parseInt(data[selectedState]))
    : confirmedData.map((data) => parseInt(data["tt"]));

  const deceasedDataValues = selectedState
    ? deceasedData.map((data) => parseInt(data[selectedState]))
    : deceasedData.map((data) => parseInt(data["tt"]));

  const recoveredDataValues = selectedState
    ? recoveredData.map((data) => parseInt(data[selectedState]))
    : recoveredData.map((data) => parseInt(data["tt"]));

  // console.log("confirmedData ===>>", confirmedDataValues);
  // console.log("deceasedDataValues ===>>", deceasedDataValues);
  // console.log("recoveredDataValues ===>>", recoveredDataValues);
  const config = {
    type: "line",

    scaleX: {
      guide: {
        visible: false,
      },
    },
    scaleY: {
      guide: {
        visible: false,
      },
    },
    series: [
      {
        values: confirmedDataValues,
        "line-color": "#ff0000",
        "line-width": 3,
        marker: {
          "background-color": "#ff0000",
          "border-color": "#ff0000",
        },
      },
      {
        values: deceasedDataValues,
        "line-color": "#5d666f",
        "line-width": 3,
        marker: {
          "background-color": "#5d666f",
          "border-color": "#5d666f",
        },
      },
      {
        values: recoveredDataValues,
        "line-color": "#009b3e",
        "line-width": 3,
        marker: {
          "background-color": "#009b3e",
          "border-color": "#009b3e",
        },
      },
    ],
  };
  window.ZC.LICENSE = [
    "569d52cefae586f634c54f86dc99e6a9",
    "b55b025e438fa8a98e32482b5f768ff5",
  ];
  return <ZingChart height="200" data={config} />;
};

export default LineChart;
