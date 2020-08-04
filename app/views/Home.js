import React from "react";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-5 px-5 py-5">
          <h2>Land Area Estimator</h2>

          <div className="map-search-controller py-5">
            <h4>Search Address</h4>
            <form className="form-inline">
              <div className="form-group mb-2">
                {/* <label for="staticEmail2" className="sr-only">Email</label> */}
                <input type="text" className="form-control-plaintext" id="staticEmail2" value="email@example.com" />
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                Search
              </button>
            </form>
          </div>
          <div className="map-search-results">
            <h4>
              Address Line 1 <br />
              Address Line 2 <br />
              Address Line 3 <br />
              Post Code
            </h4>
            <div>
              <button type="button" className="btn btn-primary mr-4">
                Start New Plot
              </button>
              <button type="button" className="btn btn-primary">
                Search New Address
              </button>
            </div>
            <div>
              <button type="button" className="btn btn-secondary mr-4">
                Undo
              </button>
              <button type="button" className="btn btn-primary">
                Reset and Start Again
              </button>
            </div>
          </div>
          <div className="map-plotting-results">
            <h4>Estimated Land Area</h4>
            <button type="button" className="btn btn-primary btn-block">
              Continue with Estimated Land Area
            </button>
          </div>
        </div>
        <div className="col-lg-7">
          <p>Map goes here</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
