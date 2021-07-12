import React, { Component } from "react";
import Header from "./components/Header/Header";
import Movies from "./components/Movies/Movies";
import axios from "axios";
import { API_KEY, API_URL, IMAGE_URL } from "./API/secret.js";

class App extends Component {
  state = {};
  state = {
    moviesData: [],
    currentMovie: "batman",
  };

  async componentDidMount() {
    // API call
    // params => api key , page , query
    // https://api.themoviedb.org/3/search/movie?api_key=bdd243ea847239dc0799805e63e189f0&query=avengers&page=1&include_adult=false

    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: this.state.currentMovie },
    });
    let moviesData = data.data.results.slice(0,10);
    this.setState({
      moviesData:moviesData
    })
  }


  setMovies= async(newMovieName) =>{
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: newMovieName },
    });

    let moviesData = data.data.results.slice(0,10);
    this.setState({
      moviesData:moviesData,
      currentMovie: newMovieName
    })

  }
  render() {
    //return <div className="App">Hello From App</div>;
    return (
      <div className="App">
        <Header  setMovies ={this.setMovies}></Header>
        <Movies movies={this.state.moviesData}></Movies>
      </div>
    );
  }
}


export default App;


