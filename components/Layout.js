import React from "react";
import Head from "next/head";
import Link from "next/link";
import { isAuth, logout } from "../helpers/auth";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();
const Layout = ({ children }) => {
  const head = () => (
    <React.Fragment>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
        crossOrigin="anonymous"
      />
    </React.Fragment>
  );

  const nav = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light pb-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="https://i.pinimg.com/originals/16/d8/22/16d82265ca7d68de7b4efafee14fb14b.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          School Uploader API
        </a>

        <form className="form-inline px-5">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </form>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item pt-3">
              <Link href="/">
                <a className="nav-link pt-2" aria-current="page">
                  Home
                </a>
              </Link>
            </li>

            {!isAuth() && (
              <React.Fragment>
                <li className="nav-item pt-3">
                  <Link href="/login">
                    <a className="nav-link">Login</a>
                  </Link>
                </li>
                <li className="nav-item pt-3">
                  <Link href="/register">
                    <a className="nav-link">Register</a>
                  </Link>
                </li>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role == "admin" && (
              <React.Fragment>
                <li className="nav-item pt-3">
                  <Link href="/create">
                    <a className="nav-link">Upload a School</a>
                  </Link>
                </li>
                <li className="nav-item pt-3">
                  <Link href="/">
                    <a className="nav-link">{isAuth().name}</a>
                  </Link>
                </li>
                <li className="nav-item pt-3">
                  <a onClick={logout} className="nav-link">
                    Logout
                  </a>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
  return (
    <div>
      {head()} {nav()} <div className="p-5">{children}</div>
    </div>
  );
};

export default Layout;
