import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import "./styles/article.scss";
import { BackTop } from "antd";
import { getRecommendations } from "../services/publications.service";

export default function DietDetail() {
  const params = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [image, setImage] = useState();

  useEffect(() => {
    async function fetchRecommendations() {
      let res = await getRecommendations(
        params.animal,
        params.age,
        params.breed
      );
      setImage(res.image);
      setRecommendations(res.recommendations);
    }
    fetchRecommendations();
  }, []);

  return (
    <div className="article">
      <div className="article-container">
        <h1 className="article-title">{params.breed.toUpperCase()}</h1>
        <div className="article-cover">
          <img alt="" src={image}></img>
        </div>
        <BackTop />
        {recommendations.map((rec, index) => (
          <ReactMarkdown key={index} className="article-body">
            {rec}
          </ReactMarkdown>
        ))}
      </div>
    </div>
  );
}
