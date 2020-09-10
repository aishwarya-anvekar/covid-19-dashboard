import React, { Component } from "react";
import "./ChloropethIndia.css";
import ZingChart from "zingchart-react";
import zingchart from "zingchart/es6";
import "zingchart/modules-es6/zingchart-maps.min.js";
import "zingchart/modules-es6/zingchart-maps-ind.min.js";
import { Card } from "@material-ui/core";
import StatusNumberCard from "../StatusNumberCard/StatusNumberCard.jsx";
import util from "../../../src/utils/util.js";
export default class ChloropethIndia extends Component {
  state = { loading: false };
  getConfig = () => {
    const config = {
      shapes: [
        {
          type: "zingchart.maps",
          options: {
            name: "ind",
            panning: false, // turn of zooming. Doesn't work with bounding box
            zooming: false,
            scrolling: false,
            style: {
              tooltip: {
                text: this.props.state
                  ? `${this.props.state}: ${this.props.confirmedCount}`
                  : "Loading...",
                backgroundColor: "#5d666f",
                fontColor: "#FFF",
                fontSize: "18px",
              },
              borderColor: "#000",
              borderWidth: "2px",
              controls: {
                visible: false, // turn of zooming. Doesn't work with bounding box
              },
              hoverState: {
                alpha: 0.28,
                backgroundColor: "#EF9A9A",
              },
              label: {
                // text displaying. Like valueBox
                fontSize: "15px",
                visible: false,
              },
            },
          },
        },
      ],
    };
    return config;
  };

  //performance improvement
  componentDidUpdate(prevProps) {
    if (prevProps.state !== this.props.state) {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    const statewise = this.props.statewise;
    const instance = this;
    zingchart.shape_mouseover = function (event) {
      instance.setState({ loading: true });
      setTimeout(function () {
        let statecode = event.shapeid;
        statecode = statecode === "TL" ? "TG" : statecode;
        const stateInfo = util.getHoveredStateData(statewise, statecode);
        if (stateInfo) {
          const {
            active,
            confirmed,
            recovered,
            deaths,
            lastupdatedtime,
            state,
          } = stateInfo;
          const activeCount = active;
          const confirmedCount = confirmed;
          const recoveredCount = recovered;
          const deceasedCount = deaths;
          const selectedState = statecode;

          instance.props.setStatewiseCounts(
            confirmedCount,
            activeCount,
            recoveredCount,
            deceasedCount,
            selectedState,
            lastupdatedtime,
            state
          );
        }
      }, 300);
    };
    zingchart.shape_mouseout = function (event) {
      const {
        active,
        confirmed,
        recovered,
        deaths,
        lastupdatedtime,
      } = instance.props.total;
      const activeCount = active;
      const confirmedCount = confirmed;
      const recoveredCount = recovered;
      const deceasedCount = deaths;
      const selectedState = null;
      instance.props.setStatewiseCounts(
        activeCount,
        confirmedCount,
        recoveredCount,
        deceasedCount,
        selectedState,
        lastupdatedtime,
        null
      );
    };
  }

  render() {
    return (
      <>
        <div className="header2">
            <div className="main-title">INDIA MAP</div>
            <div className="sub-title">HOVER OVER A STATE FOR MORE DETAILS</div>
        </div>
        <Card className="chloropeth-india card-border-radius">
          <div className="status-number-cards">
            <StatusNumberCard
              count={this.props.confirmedCount}
              status="confirmed"
              color="red"
            />
            <StatusNumberCard
              count={this.props.activeCount}
              status="active"
              color="blue"
            />
            <StatusNumberCard
              count={this.props.recoveredCount}
              status="recoverd"
              color="green"
            />
            <StatusNumberCard
              count={this.props.deceasedCount}
              status="deceased"
              color="gray"
            />
          </div>
          <div className="map">
            <div className="state-name-last-date">
              <div className="state-name">{this.props.state}</div>
              <div>
                <div className="last-date-title">LAST UPDATED</div>
                <div className="last-date">{this.props.lastupdatedtime}</div>
              </div>
            </div>
            <ZingChart data={this.getConfig()} />
          </div>
        </Card>
      </>
    );
  }
}
