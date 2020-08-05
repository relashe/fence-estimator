import React, { useState, useEffect, useRef } from "react";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import Parser from "html-react-parser";

// Components
import { Input } from "app/components/Forms";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const GMap = ({ google }) => {
  let addressSearch = null;

  const [addressMark, setAddressMark] = useState({});
  const [address, setAddress] = useState(undefined);
  const [location, setLocation] = useState({ lat: -34.397, lng: 150.644 });
  const [zoom, setZoom] = useState(11);
  const [addressFound, setAddressFound] = useState(false);

  const [plotting, setPlotting] = useState(false);
  const [plotPerimiter, setPlotPerimiter] = useState(0);

  const setSearchInput = ref => {
    addressSearch = ref;
  };

  const handleSearchTextChange = e => {
    e.preventDefault();
    setAddress(e.currentTarget.value);
  };

  const handleResetSearch = e => {
    e.preventDefault();
    setAddress(undefined);
    setAddressFound(false);
    setPlotting(false);
    setPlotPerimiter(0);
  };

  const handleSearch = async e => {
    e.preventDefault();
    setAddressFound(true);
    setPlotting(false);
    setPlotPerimiter(0);
  };

  const handleSearchResults = () => {
    const places = addressSearch.getPlaces();

    const location = places[0];

    console.info(location);

    setAddressMark(location);
    setAddress(location.formatted_address);
    setLocation({ lat: location.geometry.location.lat(), lng: location.geometry.location.lng() });
    setZoom(16);
    setAddressFound(true);
    setPlotting(false);
    setPlotPerimiter(0);
  };

  const handlePlotting = async e => {
    e.preventDefault();
    setPlotting(true);
    setPlotPerimiter(0);
  };

  const handleUndoPlotting = async e => {
    e.preventDefault();
    setPlotting(false);
    setPlotPerimiter(0);
  };

  const mapStyles = {
    width: "100%",
    height: "100%"
  };

  return (
    <>
      <GoogleMap defaultZoom={11} defaultCenter={location} center={location} zoom={zoom} />
      <div className="d-lg-flex flex-column justify-content-center px-5 py-5 order-1">
        <h2 className="mb-auto">Land Area Estimator</h2>

        {(!address || !addressFound) && (
          <div className="map-search-controller py-5">
            <h4>Search Address</h4>
            <form className="form-inline">
              <div className="form-group mb-2">
                {/* <label for="staticEmail2" className="sr-only">Email</label> */}
                <StandaloneSearchBox ref={setSearchInput} onPlacesChanged={handleSearchResults}>
                  <Input
                    className="form-control-plaintext"
                    id="staticEmail2"
                    value={address}
                    onChange={handleSearchTextChange}
                  />
                </StandaloneSearchBox>
              </div>
              <button type="submit" className="btn btn-primary mb-2" onClick={handleSearch} disabled={!address}>
                Search
              </button>
            </form>
          </div>
        )}
        {addressFound && (
          <div className="map-search-results py-5">
            <h4 className="map-search-results__address">{Parser(addressMark.adr_address.replace(/\,/g, ""))}</h4>
            <div>
              {!plotting && (
                <>
                  <button type="button" className="btn btn-primary mr-4" onClick={handlePlotting}>
                    Start New Plot
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleResetSearch}>
                    Search New Address
                  </button>
                </>
              )}
            </div>
            {plotting && (
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
          {addressFound && plotting && (
            <>
              <h4>
                Estimated Land Area <span>{plotPerimiter}</span>
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
