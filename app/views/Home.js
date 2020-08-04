import React, { useState, useEffect } from "react";
// Components
import { Input } from "../components/Forms";

const Home = () => {
  const [address, setAddress] = useState(undefined);
  const [addressFound, setAddressFound] = useState(false);

  const [plotting, setPlotting] = useState(false);
  const [plotPerimiter, setPlotPerimiter] = useState(0);

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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-5 px-5 py-5">
          <h2>Land Area Estimator</h2>

          {(!address || !addressFound) && (
            <div className="map-search-controller py-5">
              <h4>Search Address</h4>
              <form className="form-inline">
                <div className="form-group mb-2">
                  {/* <label for="staticEmail2" className="sr-only">Email</label> */}
                  <Input
                    className="form-control-plaintext"
                    id="staticEmail2"
                    value={address}
                    onChange={handleSearchTextChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary mb-2" onClick={handleSearch} disabled={!address}>
                  Search
                </button>
              </form>
            </div>
          )}
          {addressFound && (
            <div className="map-search-results">
              <h4>
                Address Line 1 <br />
                Address Line 2 <br />
                Address Line 3 <br />
                Post Code
              </h4>
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

          {addressFound && plotting && (
            <div className="map-plotting-results">
              <h4>
                Estimated Land Area <span>{plotPerimiter}</span>
              </h4>
              <button type="button" className="btn btn-primary btn-block" disabled={!plotPerimiter}>
                Continue with Estimated Land Area
              </button>
            </div>
          )}
        </div>
        <div className="col-lg-7">
          <p>Map goes here</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
