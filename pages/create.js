import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/router";
// import "../index.css";

const Create = ({ user, token }) => {
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    content: "",
    location: "",
    admission: "",
    error: "",
    success: "",
    formData: process.browser && new FormData(),
    buttonText: "Create",
    imageUploadText: "Upload image",
  });

  //   const [content, setContent] = useState("");

  const {
    name,
    content,
    location,
    admission,
    success,
    error,
    formData,
    buttonText,
    imageUploadText,
  } = state;

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    const imageName =
      name === "image" ? e.target.files[0].name : "Upload image";
    formData.set(name, value);
    setState({
      ...state,
      [name]: value,
      error: "",
      success: "",
      imageUploadText: imageName,
    });
  };

  //   const handleContent = (e) => {
  //     console.log(e);
  //     setContent(e);
  //     setState({ ...state, success: "", error: "" });
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Creating" });
    // console.log(...formData);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/category`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(formData);
      console.log("CATEGORY CREATE RESPONSE", response);
      setState({
        ...state,
        name: "",
        content: "",
        formData: "",
        buttonText: "Created",
        imageUploadText: "Upload image",
        success: `${response.data.name} is created`,
      });
      router.push("http://localhost:3000");
    } catch (error) {
      console.log("CATEGORY CREATE ERROR", error);
      setState({
        ...state,
        name: "",
        buttonText: "Create",
        // error: error.response.data.error,
      });
    }
  };

  const createCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group pb-4">
        <label className="text-muted">{imageUploadText}</label>
        <input
          onChange={handleChange("image")}
          type="file"
          accept="image/*"
          className="form-control"
          required
        />
      </div>
      <div className="form-group pb-4">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          value={name}
          maxlength="32"
          type="text"
          className="form-control"
          required
        />
      </div>
      <div className="form-group pb-4">
        <label className="text-muted">About</label>
        <textarea
          onChange={handleChange("content")}
          value={content}
          className="form-control"
          required
        />
      </div>
      <div className="form-group pb-4">
        <label className="text-muted">Location</label>
        <textarea
          onChange={handleChange("location")}
          value={location}
          className="form-control"
          required
        />
      </div>
      <div className="form-group pb-4">
        <label className="text-muted">Admission</label>
        <textarea
          onChange={handleChange("admission")}
          value={admission}
          className="form-control"
          required
        />
      </div>
      <div>
        <button className="btn btn-outline-warning">Upload image</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Add a School</h1>
          <br />
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          {createCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default Create;
