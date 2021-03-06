import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import React from "react";
// import "../index.css";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios("/api/categories");

      setCategories(response.data);
    };

    fetchData();
  }, []);

  const listCategories = () =>
    categories.map((c, i) => (
      <Link key={i} href={`/links/${c.slug}`}>
        <a
          style={{
            border: "1px solid grey",
            // padding: " 20px",
            borderRadius: "10px",
            height: "200px",
            textDecoration: "none",
          }}
          className="bg-light mb-3 p-1 col-7 school-links"
        >
          <div>
            <div className="row">
              <div
                className="col-md-4"
                style={{ height: "190px", width: "190px" }}
              >
                <img
                  src={c.image && c.image.url}
                  alt={c.name}
                  style={{
                    maxHeight: "190px",
                    minHeight: "190px",
                    minWidth: "190px",
                  }}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-8">
                <div className="row px-3">
                  <h3
                    style={{
                      color: "#003152",
                    }}
                    className="display-6 font-weight-bold"
                  >
                    {c.name}
                  </h3>
                </div>
                <div className="row mt-5 px-3">
                  <p
                    style={{
                      color: "grey",
                      fontFamily: "Courier New",
                    }}
                  >
                    {c.content}
                  </p>
                </div>
              </div>
              {/* <div className="col-md-3">
                <Link href={`/api/link/${c.slug}`}>
                  <a className="btn btn-sm btn-outline-success btn-block mb-1">
                    Update
                  </a>
                </Link>
              </div> */}
            </div>
          </div>
        </a>
      </Link>
    ));

  return (
    <Layout>
      <div className="row pb-4">
        <div className="col-md-6">
          <h1 className="font-weight-bold">Browse Schools</h1>
        </div>
      </div>
      <div className="row">{listCategories()}</div>
      {/* {JSON.stringify(categories)} */}
    </Layout>
  );
};

export default Home;
