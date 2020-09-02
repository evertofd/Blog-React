import React, { Component } from "react";
import Slider from "./Slider";
import Sidebar from "./Sidebar";

class Formulario extends Component {
  nombreRef = React.createRef();
  apellidoRef = React.createRef();
  bioRef = React.createRef();
  generoHombreRef = React.createRef();
  generoMujerRef = React.createRef();
  generoOtroRef = React.createRef();

  state = {
    user: {},
  };

  recibirFormulario = (e) => {
    e.preventDefault();
    let genero = "Hombre";

    if (this.generoHombreRef.current.checked) {
      genero = this.generoHombreRef.current.value;
    } else if (this.generoMujerRef.current.checked) {
      genero = this.generoMujerRef.current.value;
    } else {
      genero = this.generoOtroRef.current.cheked;
    }
    let user = {
      nombre: this.nombreRef.current.value,
      apellido: this.apellidoRef.current.value,
      biografia: this.bioRef.current.value,
      genero: genero,
    };

    this.setState({
      user: user,
    });
    console.log("fromulario enviado", user);
  };
  render() {
    return (
      <div id="Formulario">
        <Slider title="Formulario" size="slider-small" />
        <div className="center">
          <div id="content">
            {this.state.user.nombre && (
              <div id="user-data">
                <p>
                  Nombre: <strong>{this.state.user.nombre}</strong>
                  <br />
                  Apellido: <strong>{this.state.user.apellido}</strong>
                  <br />
                  Bio: <strong>{this.state.user.bio}</strong>
                  <br />
                  Genero: <strong>{this.state.user.genero}</strong>
                </p>
              </div>
            )}

            <form className="mid-form" onChange={this.recibirFormulario}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" name="nombre" ref={this.nombreRef} />
              </div>
              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input type="text" name="apellido" ref={this.apellidoRef} />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Biografia</label>
                <textarea
                  name="bio"
                  cols="30"
                  rows="10"
                  ref={this.bioRef}
                ></textarea>{" "}
              </div>
              <div className="form-group radiobuttons">
                <input
                  type="radio"
                  name="genero"
                  value="hombre"
                  ref={this.generoHombreRef}
                />
                Hombre
                <input
                  type="radio"
                  name="genero"
                  value="mujer"
                  ref={this.generoMujerRef}
                />
                Mujer
                <input
                  type="radio"
                  name="genero"
                  value="otro"
                  ref={this.generoOtroRef}
                />
                Otro
              </div>
              <div className="clearfix"> </div>

              <input type="submit" value="Enviar" className="btn btn-sucess" />
            </form>
          </div>
          <Sidebar blog="falso" />
        </div>
      </div>
    );
  }
}

export default Formulario;
