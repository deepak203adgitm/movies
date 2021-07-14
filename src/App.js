import React, { Component } from "react";
import Header from "./components/Header/Header";
import Movies from "./components/Movies/Movies";
import Pagenation from "./components/Pagination/Pagenation";
import axios from "axios";
import Favourite from "./components/Favourite/Favourite";
import MoviePage from "./components/MoviePage/MoviePage";
import { API_KEY, API_URL, IMAGE_URL } from "./API/secret.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Link} from 'react-router';

class App extends Component {
  state = {
    moviesData: [],
    currentMovie: "avengers",
    pages: [],
    currPage: 1,
  };

  async componentDidMount() {
    // API call
    // params => api key , page , query
    // https://api.themoviedb.org/3/search/movie?api_key=bdd243ea847239dc0799805e63e189f0&query=avengers&page=1&include_adult=false

    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: this.state.currentMovie },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages; //3
    console.log(moviesData);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      pages: pages,
    });
  }

  setMovies = async (newMovieName) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: newMovieName },
    });
    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages; //3
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      currentMovie: newMovieName,
      pages: pages,
    });
  };

  nextPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: this.state.currPage + 1,
        query: this.state.currentMovie,
      },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage + 1,
    });
  };

  previousPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: this.state.currPage - 1,
        query: this.state.currentMovie,
      },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage - 1,
    });
  };

  setPage = async (pageCount) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: pageCount,
        query: this.state.currentMovie,
      },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: pageCount,
    });
  };


  render() {
    //return <div className="App">Hello From App</div>;
    return (

      <Router>
      <div className="App">
        <Header setMovies={this.setMovies}></Header>

        <Switch>
          <Route path="/" exact>
            {this.state.moviesData.length ? (
              <React.Fragment>
                <Movies movies={this.state.moviesData}></Movies>
                <Pagenation
                  pages={this.state.pages}
                  currPage={this.state.currPage}
                  nextPage={this.nextPage}
                  previousPage={this.previousPage}
                  setPage={this.setPage}
                ></Pagenation>
              </React.Fragment>
            ) : (
              <h1>Oops No Movies Found !</h1>
            )}
          </Route>

          <Route path="/fav" exact>
            <Favourite></Favourite>
          </Route>
          <Route path="/moviepage" exact component={MoviePage}></Route>
          </Switch>
        </div>
      </Router>






    );
  }
}


export default App;


