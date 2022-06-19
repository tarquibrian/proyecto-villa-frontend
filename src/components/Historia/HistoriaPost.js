 import React from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../sidebar/Sidebar";
import "./post.css";
const PF = process.env.REACT_APP_IMG_URL + "/images/";
export const HistoriaPost = ({ post }) => {
  return (
    <div>
      <div className="post">
        {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
        <div className="postInfo">
          <div className="postCats">
            
              <span className="postCat">{post.category}</span>
            
          </div>
          <Link to={`/post/${post._id}`} className="link">
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
