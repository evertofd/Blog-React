import React, { Component } from "react";

class SeccionPruebas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 0,
    };
  }

  /*Tambien se pude declarar los estados asi:
  en el state se pueden guardar cualquier variable
  state={ 
      contador:0

  };
  
  */

  HolaMundo(nombre, edad) {
    let presentacion = (
      <div>
        <h2>Hola soy {nombre}</h2>
        <h3>Tengo {edad}</h3>
      </div>
    );
    return presentacion;
  }

  sumar = () => {
    this.setState({
      contador: this.state.contador + 1,
    });
  };

  restar = () => {
    this.setState({
      contador: this.state.contador - 1,
    });
  };
  render() {
    let nombre = "Everto Farias";
    return (
      <section id="content">
        <h2 className="subheader">Últimos articulos</h2>
        <h2 className="subheader">Funciones y Pruebas</h2>
        {this.HolaMundo(nombre, 32)}

        <h2>Estados</h2>
        <p>contador{this.state.contador}</p>
        <p>
          <input type="button" value="sumar" onClick={this.sumar} />
        </p>
        <p>
          <input type="button" value="restar" onClick={this.restar} />
        </p>
      </section>
    );
  }
}

export default SeccionPruebas;
