import React from "react";
import { Spinner } from "react-bootstrap";

import "./Loading.scss";

export default function Loading() {
  return (
    <div className="loading">
      <Spinner animation="border" role="status" variant="primary" />
      <h5>Loading...</h5>
    </div>
  );
}
