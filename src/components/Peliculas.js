import React, { Component } from "react";
import Pelicula from "./Pelicula";
import Slider from "./Slider";
import Sidebar from "./Sidebar";

class Peliculas extends Component {
  state = {
    peliculas: [
      {
        titulo: "batman vs superman",
        image:
          "https://www.cinemascomics.com/wp-content/uploads/2020/06/snyder-cut-batman-vs-superman-960x560.jpg",
      },
      {
        titulo: "Iron man",
        image: "data:https://picsum.photos/200/300",
      },
      {
        titulo: "Rapido y furioso",
        image:
          "https://vignette.wikia.nocookie.net/doblaje/images/0/0d/FandF8.jpg/revision/latest?cb=20170309203725&path-prefix=es",
      },
      {
        titulo: "Gran torido",
        image: "https://picsum.photos/400/300",
      },
    ],

    nombre: "Everto Farias",
    favorita: {},
  };

  cambiarTitulo = () => {
    let { peliculas } = this.state;
    //let random = Math.floor(Math.random() * 3);
    peliculas[0].titulo = "Batman Bergins";
    this.setState({
      peliculas: peliculas,
    });
  };

  favorita = (pelicula) => {
    console.log("marcadafavorita");
    console.log(pelicula);
    this.setState({
      favorita: pelicula,
    });
  };
  render() {
    return (
      <React.Fragment>
        {" "}
        <Slider size="slider-small" title="Peliculas" />
        <div className="center">
          <div id="content" className="peliculas">
            <h2 className="subheader">Listado de Peliculas</h2>
            <p>Seleccion de las peliculasfavoritas de {this.state.name}</p>
            <p>
              <button onClick={this.cambiarTitulo}>Cambiar Titulo</button>
            </p>
            {this.state.favorita.titulo ? (
              <p className="favorita">
                <strong>La pelicula favorita es: </strong>
                <span>{this.state.favorita.titulo}</span>
              </p>
            ) : (
              <p>No hay peliculas favoritas</p>
            )}

            <div id="articles" className="peliculas">
              {this.state.peliculas.map((pelicula, i) => {
                return (
                  <Pelicula
                    key={i}
                    pelicula={pelicula}
                    marcarFavorita={this.favorita}
                  />
                );
              })}
            </div>
          </div>
          <Sidebar />
        </div>
      </React.Fragment>
    );
  }
}
export default Peliculas;
