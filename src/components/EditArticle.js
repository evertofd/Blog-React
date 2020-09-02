import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Global from "../Global";
import Sidebar from "./Sidebar";
import SimpleReactValidator from "simple-react-validator";
import swal from "sweetalert";

class EditArticle extends Component {
  titleRef = React.createRef();
  contentRef = React.createRef();
  articleId = null;
  url = Global.url;
  state = {
    article: {},
    status: null,
    selectedFile: null,
  };

  componentWillMount() {
    this.articleId = this.props.match.params.id;
    this.getArticle(this.articleId);
    this.validator = new SimpleReactValidator({
      messages: {
        required: "Este campo es requerido",
      },
    });
  }

  changeState = () => {
    this.setState({
      article: {
        title: this.titleRef.current.value,
        content: this.contentRef.current.value,
        image: this.state.article.image,
      },
    });
  };

  getArticle = (id) => {
    axios.get(this.url + "article/" + id).then((res) => {
      this.setState({
        article: res.data.article,
      });
    });
  };

  fileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  saveArticle = (e) => {
    e.preventDefault();

    //Rellenar el state con formulario
    this.changeState();
    if (this.validator.allValid()) {
      //Hacer una peticion http por post para guardar.
      axios
        .put(this.url + "article/" + this.articleId, this.state.article)
        .then((res) => {
          if (res.data.article) {
            this.setState({
              article: res.data.article,
              status: "waiting",
            });
            swal(
              "Articulo Creado",
              "El articulo ha sido creado correctamente",
              "success"
            );
            //Subir la imagen
            if (this.state.selectedFile !== null) {
              // Obtener el id del articulo guardado

              let articleId = this.state.article._id;
              //Crear un Form data y añadir al fichero
              const formData = new FormData();

              formData.append(
                "file0",
                this.state.selectedFile,
                this.state.selectedFile.name
              );

              //Peticion Ajax

              axios
                .post(this.url + "upload-image/" + articleId, formData)
                .then((res) => {
                  if (res.data.article) {
                    this.setState({
                      article: res.data.article,
                      status: "success",
                    });
                  } else {
                    this.setState({
                      article: res.data.article,
                      status: "failed",
                    });
                  }
                });
            } else {
              this.setState({
                status: "success",
              });
            }
          } else {
            this.setState({
              status: "failed",
            });
          }
        });
    } else {
      this.setState({
        status: "failed",
      });
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    if (this.state.status === "success") {
      return <Redirect to="/blog" />;
    }
    var article = this.state.article;
    return (
      <div className="center">
        <section id="content">
          <h1 className="subheader">Editar Articulo</h1>

          {this.state.article.title && (
            <form
              className="min-form"
              onSubmit={this.saveArticle}
              onChange={this.changeState}
            >
              <div className="form-group">
                <label htmlFor="title">Titulo</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={article.title}
                  ref={this.titleRef}
                  onChange={this.changeState}
                />

                {this.validator.message(
                  "title",
                  this.state.article.title,
                  "required"
                )}
              </div>
              <div className="form-group">
                <label htmlFor="content">Contenido</label>
                <textarea
                  name="content"
                  defaultValue={article.content}
                  ref={this.contentRef}
                />
                {this.validator.message(
                  "content",
                  this.state.article.content,
                  "required"
                )}
              </div>
              <div className="form-group">
                <label htmlFor="file0">Imagen</label>
                <div className="image-wrap">
                  {article.image !== null ? (
                    <img
                      src={this.url + "get-image/" + article.image}
                      alt={article.title}
                      className="thumb"
                    />
                  ) : (
                    <img
                      src="https://picsum.photos/400/300"
                      alt={article.title}
                      className="thumb"
                    />
                  )}
                </div>
                <input type="file" name="file0" onChange={this.fileChange} />
              </div>
              <div className="clearfix"></div>
              <input type="submit" value="Guardar" className="btn btn-sucess" />
            </form>
          )}

          {!this.state.article.title && (
            <h1 className="subheader">Cargando...</h1>
          )}
        </section>

        <Sidebar />
      </div>
    );
  }
}

export default EditArticle;
