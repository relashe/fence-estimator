import React from "react";
// Components
import GoogleMap from "app/components/GoogleMap/GoogleMap";
// Constants
import { API } from "../constants";

const Home = () => {
  return (
    <div className="fence-estimator container-fluid">
      <GoogleMap
        googleMapURL={API.endpoints.googleMaps}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div className="fence-estimator__container row" />}
        mapElement={<div className="fence-estimator__map col-lg-7 order-1" />}
      />
    </div>
  );
};

export default Home;
