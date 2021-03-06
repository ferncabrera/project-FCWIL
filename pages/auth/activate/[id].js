import { withRouter } from "next/router";
import jwt from "jsonwebtoken";
import axios from "axios";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../../helpers/alerts";
import { useState, useEffect } from "react";
import Layout from "../../../components/layout";

const ActivateAccount = ({ router }) => {
  const [state, setState] = useState({
    name: "",
    token: "",
    buttonText: "Activate Account",
    success: "",
    error: "",
  });

  const { name, token, buttonText, success, error } = state;

  useEffect(() => {
    let token = router.query.id;
    if (token) {
      const { name } = jwt.decode(token);
      setState({ ...state, name, token });
    }
  }, [router]);

  const clickSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Activating" });

    try {
      const res = await axios.post("/api/register/activate", {
        token,
      });
      console.log("account activation response", res);
      setState({
        ...state,
        name: "",
        token: "",
        buttonText: "Activated",
        success: res.data.message,
      });
    } catch (e) {
      setState({
        ...state,
        buttonText: "Activate Account",
        error: e.response.data.error,
      });
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Hello {name}, Ready to activate your account?</h1>
          <br />
          {success && showSuccessMessage(success)}
          {success && showErrorMessage(error)}
          <button
            className="btn btn-outline-warning btn-block"
            onClick={clickSubmit}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(ActivateAccount);
