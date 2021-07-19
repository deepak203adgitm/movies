import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
class Header extends Component {
  state = {
    newMovieName: "",
  };

  handleOnChange = (e) => {
    let value = e.target.value;
    this.setState({
      newMovieName: value,
    });
  };

  handleKeyPress = (e) => {
    if (e.key == "Enter") {
      this.props.setMovies(this.state.newMovieName);
    }
  };

  render() {

    return (
      <div className="header">
        <div className="logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
        </div>
        
          <div className="search-btn">
          <i class="fas fa-search" aria-hidden="true"></i>
            <input
              className="search-movies" className="form-control form-control-sm ml-3 w-75"
              value={this.state.newMovieName}
              type="text"
              placeholder="Search"
              onChange={this.handleOnChange}
              onKeyPress={this.handleKeyPress}
            />
          </div>
         
         <div className="header-links">
         <div className="header-links">
         <Link to ="/"> HOME
         </Link>

         </div>


         <div className="header-links">
         <Link to ="/fav"> favourite
         </Link>

         </div>

         
         </div>

      </div>
    );
  }
}

export default Header;