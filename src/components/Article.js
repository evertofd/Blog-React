import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Global from "../Global";
import Sidebar from "./Sidebar";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/es";

class Article extends Component {
  url = Global.url;

  state = {
    article: false,
    status: null,
  };

  componentWillMount() {
    this.getArticle();
  }

  deleteArticle = (id) => {
    swal({
      title: "Esta seguro?",
      text: "Borraras permanentemente su Articulo!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(this.url + "article/" + id).then((res) => {
          this.setState({
            article: res.data.article,
            status: "deleted",
          });
        });
        swal(
          "Articulo Borrado",
          "El articlo ha sido borrado correctamente",
          "success"
        );
      } else {
        swal("Tranquilo!!", "No se ha borrado nada", "success");
      }
    });
  };
  getArticle = () => {
    let id = this.props.match.params.id;
    axios
      .get(this.url + "article/" + id)
      .then((res) => {
        this.setState({
          article: res.data.article,
          status: "success",
        });
      })
      .catch((err) => {
        this.setState({
          article: false,
          status: "success",
        });
      });
  };

  render() {
    if (this.state.status === "deleted") {
      return <Redirect to="/blog" />;
    }
    let article = this.state.article;
    return (
      <div className="center">
        <section id="content">
          {this.state.article && (
            <article className="article-item article-item-detail ">
              <div className="image-wrap">
                {article.image !== null ? (
                  <img
                    src={this.url + "get-image/" + article.image}
                    alt={article.title}
                  />
                ) : (
                  <img
                    src="https://picsum.photos/400/300"
                    alt={article.title}
                  />
                )}
              </div>
              <h1 className="subheader">{article.title}</h1>
              <span className="date">
                <Moment locale="es" fromNow>
                  {article.data}
                </Moment>
              </span>
              <p>{article.content}</p>
            </article>
          )}

          <button
            onClick={() => {
              this.deleteArticle(article._id);
            }}
            className="btn btn-danger"
          >
            Elminar
          </button>
          <Link to={"/blog/editar/" + article._id} className="btn btn-warnnig">
            Editar
          </Link>

          {!this.state.article && this.state.status === "success" && (
            <div id="article">
              <h2 className="subheader">El Artiuclo no Existe</h2>
              <p>Intentalo de nuevo mas tarde</p>
            </div>
          )}
          {this.state.article == null && (
            <div id="article">
              <h2 className="subheader">Cargando....</h2>
              <p>Espere unos segundos</p>
            </div>
          )}

          <div className="clearfix"> </div>
        </section>
        <Sidebar />
      </div>
    );
  }
}

export default Article;
