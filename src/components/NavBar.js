import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import toastr from "toastr";

const NavBar = (props) => {
  const history = useHistory();

  const [token, setToken] = useState();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    toastr.success("Logout Successfull", "Logout");
    history.push("/");
  };

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
  }, [token]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            MERN Blog
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>
              <Link to="/india" className="nav-link">
                India
              </Link>
              <Link to="/world" className="nav-link">
                World
              </Link>
              <Link to="/business" className="nav-link">
                Business
              </Link>
              <Link to="/sports" className="nav-link">
                Sports
              </Link>
              {token && (
                <Link to="/create-blog" className="nav-link">
                  Create Blog
                </Link>
              )}
              {token && <Button onClick={handleLogout}>Logout</Button>}
            </div>
            {!token && (
              <div className="navbar-nav ms-auto">
                <Link to="/signin" className="nav-link">
                  Signin
                </Link>
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
