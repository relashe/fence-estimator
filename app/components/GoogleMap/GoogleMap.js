import React, { useState, useRef } from "react";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";
import Parser from "html-react-parser";

// Components
import { Input } from "app/components/Forms";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon } from "react-google-maps";

const GMap = ({}) => {
  let addressSearch = null;
  const drawingM = useRef(null);
  let draw;

  const initialLocation = { lat: -34.397, lng: 150.644 };
  const initialZoom = 11;

  const [addressMark, setAddressMark] = useState({});
  const [address, setAddress] = useState(undefined);
  const [addressFound, setAddressFound] = useState(false);
  const [location, setLocation] = useState(initialLocation);
  const [zoom, setZoom] = useState(11);

  const [plotting, setPlotting] = useState(null);
  const [plot, setPlot] = useState(undefined);
  const [plotPerimiter, setPlotPerimiter] = useState(0);

  const calculatePlot = paths => {
    const length = google.maps.geometry.spherical.computeLength(paths);

    setPlot(paths);
    setPlotPerimiter(length.toFixed(2));
  };

  const resetPlot = () => {
    setPlotting(null);
    setPlot(undefined);
    setPlotPerimiter(0);
  };

  const resetEstimator = () => {
    setAddress(undefined);
    setAddressFound(false);
    setAddressMark({});
    setLocation(initialLocation);
    resetPlot();
    setZoom(initialZoom);
  };

  const setSearchInput = ref => {
    addressSearch = ref;
  };

  const handleSearchTextChange = e => {
    e.preventDefault();
    setAddress(e.currentTarget.value);
  };

  const handleResetSearch = e => {
    e.preventDefault();
    resetEstimator();
  };

  const handleSearchResults = () => {
    const places = addressSearch.getPlaces();
    const location = places[0];

    setAddress(location.formatted_address);
    setAddressMark(location);
    setAddressFound(true);
    setLocation({ lat: location.geometry.location.lat(), lng: location.geometry.location.lng() });
    resetPlot();
    setZoom(16);
  };

  const handleStartPlotting = e => {
    e.preventDefault();
    resetPlot();
    setPlotting(google.maps.drawing.OverlayType.POLYGON);
    // setPlot(undefined);
    // setPlotPerimiter(0);
  };

  const handleNewPlot = e => {
    setPlotting(null);
    draw = null;
    draw = e.overlay;
    draw.type = e.type;

    setPlot(draw);

    const paths = draw.getPath().getArray();
    calculatePlot(paths);
  };

  const handlePlotting = shape => {
    const paths = shape.getPath().getArray();
    calculatePlot(paths);
  };

  const handleUndoPlotting = async e => {
    e.preventDefault();
    resetPlot();
  };

  const mapStyles = {
    width: "100%",
    height: "100%"
  };

  return (
    <>
      <GoogleMap defaultZoom={initialZoom} defaultCenter={initialLocation} center={location} zoom={zoom}>
        {location && address && <Marker position={location} />}
        {plotting && (
          <DrawingManager
            defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
            defaultOptions={{
              drawingControl: false,
              // drawingControlOptions: {
              //   position: google.maps.ControlPosition.TOP_CENTER,
              //   drawingModes: [google.maps.drawing.OverlayType.POLYGON]
              // },
              polygonOptions: {
                strokeWeight: 0,
                fillOpacity: 0.45,
                editable: true
              }
            }}
            drawingMode={plotting}
            onOverlayComplete={handleNewPlot}
            // onPolygonComplete={handlePlotting}
            ref={drawingM}
          />
        )}
        {plot && <Polygon paths={plot} draggable editable onClick={handlePlotting} />}
      </GoogleMap>
      <div className="d-lg-flex flex-column justify-content-center px-5 py-5 order-1">
        <h2 className="mb-auto">Land Area Estimator</h2>

        {!addressFound && (
          <div className="map-search-controller py-5">
            <h4>Search Address</h4>
            <form className="form-inline">
              <div className="form-group mb-2">
                <StandaloneSearchBox ref={setSearchInput} onPlacesChanged={handleSearchResults}>
                  <Input
                    className="form-control-plaintext border"
                    id="staticEmail2"
                    value={address}
                    onChange={handleSearchTextChange}
                  />
                </StandaloneSearchBox>
              </div>
              {/* <button type="submit" className="btn btn-primary mb-2" onClick={handleSearch} disabled={!address}>
                Search
              </button> */}
            </form>
          </div>
        )}
        {addressFound && (
          <div className="map-search-results py-5">
            <h4 className="map-search-results__address">{Parser(addressMark.adr_address.replace(/\,/g, ""))}</h4>
            <div>
              {plotting === null && !plot && (
                <>
                  <button type="button" className="btn btn-primary mr-4" onClick={handleStartPlotting}>
                    Start New Plot
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleResetSearch}>
                    Search New Address
                  </button>
                </>
              )}
            </div>
            {plot !== undefined && (
              <div>
                <button type="button" className="btn btn-secondary mr-4" onClick={handleUndoPlotting}>
                  Undo
                </button>
                <button type="button" className="btn btn-primary" onClick={handleResetSearch}>
                  Reset and Start Again
                </button>
              </div>
            )}
          </div>
        )}

        <div className="map-plotting-results mt-auto">
          {addressFound && plotPerimiter > 0 && (
            <>
              <h4>
                Estimated Perimiter
                <span className="ml-3">
                  {plotPerimiter}
                  {plotPerimiter ? "m" : ""}
                </span>
              </h4>
              <button type="button" className="btn btn-primary btn-block" disabled={!plotPerimiter}>
                Continue with Estimated Land Area
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default withScriptjs(withGoogleMap(GMap));
