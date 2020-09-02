import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Global from "../Global";
import Sidebar from "./Sidebar";
import SimpleReactValidator from "simple-react-validator";
import swal from "sweetalert";

class CreateArticle extends Component {
  titleRef = React.createRef();
  contentRef = React.createRef();
  url = Global.url;
  state = {
    article: {},
    status: null,
    selectedFile: null,
  };

  componentWillMount() {
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
      },
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
      axios.post(this.url + "save", this.state.article).then((res) => {
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
    return (
      <div className="center">
        <section id="content">
          <h1 className="subheader">Crear Articulo</h1>
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
              <textarea name="content" ref={this.contentRef} />
              {this.validator.message(
                "content",
                this.state.article.content,
                "required"
              )}
            </div>
            <div className="form-group">
              <label htmlFor="file0">Imagen</label>
              <input type="file" name="file0" onChange={this.fileChange} />
            </div>

            <input type="submit" value="Guardar" className="btn btn-sucess" />
          </form>
        </section>

        <Sidebar />
      </div>
    );
  }
}

export default CreateArticle;
