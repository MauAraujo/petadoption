import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getArticle } from "../services/articles.service";
import {
  useParams,
} from "react-router-dom";
import "./styles/article.scss";
import { BackTop } from 'antd';


export default function ArticleDetail() {
  const params = useParams();
  const [article, setArticle] = useState([]);

  useEffect(() => {
    async function fetchArticle() {
      let art = await getArticle(params.id);
      setArticle(art);
    }
    fetchArticle();
    console.log(article);
  }, []);

  return (
    <div className="article">
      <div className="article-container">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-cover">
          <img alt="" src={`http://147.182.175.166:8000/unsafe/fit-in/x680/filters:format(webp)/${encodeURIComponent(article.cover)}`}></img>
        </div>
        <BackTop />
        <ReactMarkdown className="article-body">{article.content}</ReactMarkdown>
      </div>
    </div>
  );
}
