import React from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../sidebar/Sidebar";
import "./post.css";

export const HistoriaHomePost = ({ post }) => {
  const PF = process.env.REACT_APP_IMG_URL + "/images/";
  return (
    <div>
      <div className="post">
        {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
        <div className="postInfo">
          <div className="postCats">
            {/* {post.categories.map((c) => (
              <span className="postCat">{c.name}</span>
            ))} */}
          </div>
          <Link to={`/postHome/${post._id}`} className="link">
            <span className="postTitle">{post.title}</span>
          </Link>
          <hr />
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc">{post.desc}</p>
      </div>
    </div>
  );
};
