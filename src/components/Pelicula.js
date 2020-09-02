import React, { Component } from "react";
import { Link } from "react-router-dom";

class Pelicula extends Component {
  marcar = () => {
    this.props.marcarFavorita(this.props.pelicula);
  };
  render() {
    const { titulo, image } = this.props.pelicula;
    return (
      <article id="article-template" className="article-item">
        <div className="image-wrap">
          <img src={image} alt="Fotos" />
        </div>
        <h2>{titulo}</h2>
        <span className="date">Hace 5 minutos</span>
        <Link to="/blog">Leer más</Link>
        <button onClick={this.marcar}>Marcar como favorita</button>
      </article>
    );
  }
}

export default Pelicula;
