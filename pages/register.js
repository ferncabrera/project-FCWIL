import Layout from "../components/Layout";
import Router from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";
// import { API } from "../config";
import { isAuth } from "../helpers/auth";

const Register = () => {
  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Register",
  });
  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      success: "",
      error: "",
      buttonText: "Register",
    });
  };
  const { name, email, password, error, success, buttonText } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Registering" });

    try {
      const res = await axios.post(`http://localhost:8000/api/register`, {
        name: name,
        email: email,
        password: password,
      });
      console.log(res);
      setState({
        ...state,
        name: "",
        email: "",
        password: "",
        buttonText: "Submitted",
        success: res.data.message,
      });
    } catch (e) {
      console.log(e);
      setState({
        ...state,
        buttonText: "Register",
        error: e.response.data.error,
      });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setState({ ...state, buttonText: "Registering" });
  //   // console.table({ name, email, password });
  //   axios
  //     .post(`http://localhost:8000/api/register`, {
  //       name: name,
  //       email: email,
  //       password: password,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setState({
  //         ...state,
  //         name: "",
  //         email: "",
  //         password: "",
  //         buttonText: "Submitted",
  //         success: res.data.message,
  //       });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       setState({
  //         ...state,
  //         buttonText: "Register",
  //         error: e.response.data.error,
  //       });
  //     });
  // };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group pb-4">
        <input
          value={name}
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          placeholder="Type your name"
          required
        />
      </div>
      <div className="form-group pb-4">
        <input
          value={email}
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          placeholder="Type your email"
          required
        />
      </div>
      <div className="form-group pb-4">
        <input
          value={password}
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          placeholder="Type your password"
          required
        />
      </div>
      <div className="form-group pb-4">
        <button className="btn btn-outline-warning">{buttonText}</button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <h1>Register</h1>
        <br />
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        {registerForm()}
      </div>
    </Layout>
  );
};

export default Register;
