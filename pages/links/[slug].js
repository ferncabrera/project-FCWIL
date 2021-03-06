import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import Layout from "../../components/Layout";
import Link from "next/link";
import axios from "axios";
import { API } from "../../config";
import { useRouter } from "next/router";
import category from "../../../server/models/category";
import renderHTML from "react-render-html";

const Links = () => {
  const router = useRouter();
  console.log(router);
  const { slug } = router.query;
  if (!slug) {
    return <></>;
  }

  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/category/${slug}`
    );

    // info.url = response.data.image.url;
    // response.json();
    setInfo(response.data);
  };

  const confirmDelete = (e, slug) => {
    e.preventDefault();
    // console.log("delete > ", slug);
    let answer = window.confirm("Are you sure you want to delete?");
    if (answer) {
      handleDelete(slug);
      router.push("http://localhost:3000");
      //   <Redirect to="http://localhost:8000" />;
    }
  };

  const handleDelete = async (slug) => {
    try {
      const response = axios.delete(
        `http://localhost:8000/api/category/${slug}`
      );
      console.log("CATEGORY DELETE SUCCESS", response);
    } catch (error) {
      console.log("CATEGORY DELETE", error);
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-8">
          <h1 className="display-4 font-weight-bold">{info.name}</h1>
          <h4>About</h4>
          <div className="lead alert alert-secondary py-4">{info.content}</div>
          <h4>Location</h4>
          <div className="lead alert alert-secondary py-4">{info.location}</div>
          <h4>Admission</h4>
          <div className="lead alert alert-secondary py-4">
            {info.admission}
          </div>
        </div>
        <div className="col-md-4 pt-5">
          <img
            src={info.url}
            style={{ width: "auto", maxHeight: "500px", maxWidth: "500px" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-1">
          <a
            href={`http://localhost:3000/update/${slug}`}
            className="btn btn-sm btn-outline-success btn-block mb-1"
          >
            Update
          </a>
        </div>
        <div className="col-md-1">
          <button
            // href="http://localhost:3000"
            onClick={(e) => confirmDelete(e, slug)}
            className="btn btn-sm btn-outline-danger btn-block mb-1"
          >
            Delete
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Links;
