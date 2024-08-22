import React,{useEffect} from "react";
import "../../stilos/Plantilla_slider/css/bootstrap.css"
import "../../stilos/Plantilla_slider/css/style.css"
import "../../stilos/Plantilla_slider/css/responsive.css"

export const Slider = () => {

  return (
    <div className="hero_area">
    <header className="header_section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8">
            <nav className="navbar navbar-expand-lg custom_nav-container ">
              <a className="navbar-brand" href="index.html">
                <span>BigWing</span>
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="d-flex flex-column flex-lg-row align-items-center">
                  <ul className="navbar-nav">
                    <li className="nav-item active">
                      <a className="nav-link" href="home.html">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="home.html">About</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="home.html">Services</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="home.html">Contact</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Login</a>
                    </li>
                  </ul>
                  <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
                    <button className="btn my-2 my-sm-0 nav_search-btn" type="submit"></button>
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>

  </div>
  );
};

