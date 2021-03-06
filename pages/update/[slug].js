import dynamic from "next/dynamic";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { showSuccessMessage, showErrorMessage } from "../../helpers/alerts";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/router";

const Update = ({ user, token }) => {
  const router = useRouter();
  const { slug } = router.query;
  if (!slug) {
    return <></>;
  }

  const [oldCat, setOldCat] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/category/${slug}`
    );

    // info.url = response.data.image.url;
    setOldCat(response.data);
    console.log(response.data);
  };
  const [state, setState] = useState({
    name: "old name",
    content: "oldcontent",
    error: "",
    success: "",
    formData: process.browser && new FormData(),
    buttonText: "Update",
    // imagePreview: oldCat.image.url,
    imageUploadText: "Update image",
  });

  //   let oldContent = oldCat.content;
  //   console.log(oldContent);

  //   const [content, setContent] = useState("");

  const {
    name,
    content,
    success,
    error,
    formData,
    buttonText,
    imageUploadText,
    imagePreview,
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
    setState({ ...state, buttonText: "Updating" });
    // console.log(...formData);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/category/${slug}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(formData);
      console.log("CATEGORY UPDATE RESPONSE", response);
      setState({
        ...state,
        name: "",
        content: "",
        formData: "",
        buttonText: "Updated",
        imageUploadText: "Update image",
        success: `${response.data.name} is updated`,
      });
      //   router.push("http://localhost:3000");
    } catch (error) {
      console.log("CATEGORY CREATE ERROR", error);
      setState({
        ...state,
        name: "",
        buttonText: "Update",
        // error: error.response.data.error,
      });
    }
  };

  const updateCategoryForm = () => (
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
          type="text"
          className="form-control"
          required
        />
      </div>
      <div className="form-group pb-4">
        <label className="text-muted">Content</label>
        <textarea
          onChange={handleChange("content")}
          value={content}
          className="form-control"
          required
        />
        {/* <ReactQuill
          value={content}
          onChange={handleContent}
          placeholder="Write something....."
          theme="bubble"
          className="pb-5 mb-5"
          style={{ border: "1px solid #666" }}
        /> */}
      </div>
      <div>
        <button className="btn btn-outline-warning">Update</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Update School Information</h1>
          <br />
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          {updateCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default Update;
