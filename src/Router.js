import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Peliculas from "./components/Peliculas";
import Home from "./components/Home";
import Formulario from "./components/Formulario";
import Error from "./components/Error";
import Header from "./components/Header";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import Article from "./components/Article";
import Search from "./components/Search";
import CreateArticle from "./components/CreateArticle";
import EditArticle from "./components/EditArticle";
class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        {}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/redirect/:search"
            render={(props) => {
              var search = props.match.params.search;
              return <Redirect to={"/blog/busqueda/" + search} />;
            }}
          />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/blog/crear" component={CreateArticle} />
          <Route exact path="/blog/editar/:id" component={EditArticle} />
          <Route exact path="/blog/articulo/:id" component={Article} />
          <Route exact path="/blog/busqueda/:search" component={Search} />
          <Route exact path="/formulario" component={Formulario} />
          <Route exact path="/peliculas" component={Peliculas} />
          <Route
            path="/pruebas/:nombre/:apellidos?"
            render={(props) => {
              let nombre = props.match.params.nombre;
              let apellidos = props.match.params.apellidos;
              return (
                <div id="content">
                  <h2 className="subheader">Pagina de Pruebas</h2>{" "}
                  <h2>
                    {nombre && !apellidos && <span>{nombre}</span>}
                    {nombre && apellidos && (
                      <span> {nombre + " " + apellidos}</span>
                    )}
                  </h2>
                </div>
              );
            }}
          />
          <Route
            exact
            path="/pagina-1"
            render={() => (
              <div id="content">
                <h1>Hola mundo desde la ruta: pagina-1</h1>
              </div>
            )}
          />
          <Route component={Error} />
        </Switch>

        <div className="clearfix"></div>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default Router;
