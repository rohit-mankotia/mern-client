import React, { useState, useEffect } from "react";
import moment from "moment";

import { get } from "../utils/config";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const myData = await get(`/api/allblogs`);
      console.log("SaveData", myData.data.blogs);
      setBlogs(myData.data.blogs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      {/* <h1>Blogs</h1> */}
      {blogs ? (
        blogs.map((item) => {
          return (
            <div
              key={item._id}
              className="card flex-md-row mb-4 box-shadow h-md-250 my-4"
            >
              <div className="card-body d-flex flex-column align-items-start">
                <strong className="d-inline-block mb-2 text-primary">
                  {item.category.toUpperCase()}
                </strong>
                <h3 className="mb-0 text-dark">{item.title}</h3>
                <div className="mb-1 text-muted">
                  {moment(item.createdAt).format("MMMM Do YYYY")}
                </div>
                <p className="card-text mb-auto">{item.description}</p>
                <span onClick={() => window.open(item.link)}>
                  continue reading...
                </span>
                <h6 className="my-2 text-dark">
                  Posted By:{" "}
                  {`${item.author.firstName} ${item.author.lastName}`}
                </h6>
              </div>
              {/* <img
                className="card-img-right flex-auto d-none d-md-block"
                alt="Thumbnail [200x250]"
                style={{ width: 250, height: 250 }}
                src={item.picture}
                data-holder-rendered="true"
              /> */}
            </div>
          );
        })
      ) : (
        <h1>No Blog found</h1>
      )}
    </div>
  );
};

export default Home;
