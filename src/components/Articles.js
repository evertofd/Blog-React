import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import "moment/locale/es";

import Global from "../Global";

class Articles extends Component {
  componentWillMount() {
    let home = this.props.home;
    let search = this.props.search;

    if (home === "true") {
      this.getLastArticles();
    } else if (search && search !== null && search !== undefined) {
      this.getArticlesBySearch(search);
    } else {
      this.getArticles();
    }
  }

  url = Global.url;
  state = {
    articles: {},
    status: null,
  };

  getArticlesBySearch = (searched) => {
    axios.get(this.url + "search/" + searched).then((res) => {
      if (res.data.articles) {
        this.setState({
          articles: res.data.articles,
          status: "success",
        });
      } else {
        this.setState({
          articles: res.data.articles,
          status: "failed",
        });
      }

      console.log(this.state.article);
    });
  };

  getArticles = () => {
    axios.get(this.url + "articles").then((res) => {
      this.setState({
        articles: res.data.articles,
        status: "success",
      });
      console.log(this.state.article);
    });
  };

  getLastArticles = () => {
    axios.get(this.url + "articles/last").then((res) => {
      this.setState({
        articles: res.data.articles,
        status: "success",
      });
      console.log(this.state.article);
    });
  };

  render() {
    if (this.state.articles.length >= 1) {
      var listArticles = this.state.articles.map((article) => {
        return (
          <article
            key={article._id}
            id="article-template"
            className="article-item"
          >
            <div className="image-wrap">
              {article.image !== null ? (
                <img
                  src={this.url + "get-image/" + article.image}
                  alt={article.title}
                />
              ) : (
                <img src="https://picsum.photos/400/300" alt={article.title} />
              )}
            </div>
            <h2>{article.title}</h2>
            <span className="date">
              <Moment locale="es" fromNow>
                {article.date}
              </Moment>
            </span>
            <Link to={"/blog/articulo/" + article._id}>Leer más</Link>
          </article>
        );
      });
      return <div id="articles">{listArticles}</div>;
    } else if (
      this.state.articles.length === 0 &&
      this.state.status === "success"
    ) {
      return (
        <div id="articles">
          <h1 className="subheader">No hay Articulos</h1>
        </div>
      );
    } else {
      return (
        <div id="articles">
          <h1 className="subheader">Cargando....</h1>
          <p>en unos segundo se mostrara el contenido</p>
        </div>
      );
    }
  }
}

export default Articles;
