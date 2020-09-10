import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./StatusNumberCard.css";

export default function StatusNumberCard({ count, status, color }) {
  return (
    <Card className={`root ${color} `}>
      <CardContent>
        <Typography
          className={`title text-${color}`}
          color="textPrimary"
          gutterBottom
        >
          {status.toUpperCase()}
        </Typography>
        <Typography
          className={`sub-title text-${color}`}
          color="textSecondary"
          gutterBottom
        >
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
}
