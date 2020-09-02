import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class Sidebar extends Component {
  searchRef = React.createRef();

  state = {
    search: "",
    redirect: false,
  };
  redirecToSearch = (e) => {
    e.preventDefault();
    this.setState({
      search: this.searchRef.current.value,
      redirect: true,
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={"/redirect/" + this.state.search} />;
    }

    return (
      <aside id="sidebar">
        {this.props.blog === "true" && (
          <div id="nav-blog" className="sidebar-item">
            <h3>Puedes Hacer esto</h3>
            <Link to={"/blog/crear"} className="btn btn-sucess">
              Crear Articulo
            </Link>
          </div>
        )}

        <div id="search" className="sidebar-item">
          <h3>buscador</h3>
          <p>Encuentra el articulo que buscas</p>
          <form onSubmit={this.redirecToSearch}>
            <input type="text" name="search" ref={this.searchRef} />
            <input type="submit" name="submit" value="Buscar" className="btn" />
          </form>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
