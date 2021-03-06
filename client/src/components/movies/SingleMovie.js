import React, {Component} from 'react';
import axios from 'axios'
import AllMovies from './AllMovies'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'
import NewComment from '../comments/NewComment'
import CommentView from '../comments/CommentView'
import styled from 'styled-components'
import Comment from '../comments/Comment'





export default class SingleMovie extends Component {

  state = {
      movie: {
    comment: [
        {
            title: 'awesome!',
            description: "Classic for sure!!",
            _id: "5aad7251e344b6188bb6c18b"
        },
        {
            title: "So so",
            description: "Wasn't super impressed",
            _id: "5aad7251e344b6188bb6c18a"
        }
    ],
    _id: "5aad7251e344b6188bb6c18d",
    title: "The Shape of Water",
    description: "lorem-ipsum",
    moviePoster: "https://i.imgur.com/pMRc7hS.jp g",
    __v: 0
}
      }


    componentWillMount() {
      this.getMovie()
    }

    getMovie = async () => {
    const movieId = this.props.match.params.Id
    const res = await axios.get(`/api/movies/${movieId}`)
    console.log(movieId)
    this.setState({movie: res.data})
  }

  handleMovieChange = (event, id) => {
   console.log(id)
   const newMovie = [...this.state.movie]
   console.log(newMovie)
   const movieChange = newMovie.find(movie => movie._id === id)
   movieChange [event.target.name] = event.target.value

   this.setState({movie: newMovie})
 }

  submitMovieComment = async (movie) => {
  const res = await axios.post(`/api/movies`)
  this.setState({movie: res.data.movie})
}
deleteMovie = async() => {
  const movieId = this.props.match.params.movieId
  axios.delte(`/api/movies/${movieId}/movies/${movieId}`).then(res => {
    this.setState({movie: res.data.movie})
    this.getMovie()
  })
}

render() {
     if (this.state.redirect === true) {
       return <Redirect to="/"/>;
     }
     return (<div>
       {/* <NewComment/> */}
       {/* <h1><MovieComment id = {this.props.match.params.Id}/></h1> */}
       <p>
         <strong>Movie Description:
         </strong>
         {[this.state.movie.description]}
         <br/>
        <img src={[this.state.movie.moviePoster]} alt={this.state.movie.title} />
       </p>
       <div>
         <h1>Post a new Comment!</h1>
         <form onSubmit={this.handleSubmit}>

           <input type="text" name="commentTitle" value={this.state.commentTitle} onChange={this.handleChange}/>
           <br/>
           <label htmlFor='stuff'></label>
           <input type='text' name='stuff' value={this.state.comment} onChange={this.handleChange}/>
           <button type='submit'>Create New Comment</button>
         </form>

       </div>
       <button onClick={this.edit}>Edit Movie Info</button>
       <button onClick={this.delete}>Delete Movie</button>

       {
         this.state.delete
           ? (<div>
             <p>Are you sure?</p>
             <br/>
             <button onClick={this.deleteMovie}>Delete Movie</button>{" "}
             <button onClick={this.delete}>Do not Delete</button>
           </div>)
           : null
       }

       {/* {
         this.state.edit
           ? (<NewComment handleSubmit={this.handleSubmit} movie={this.state.movie} handleChange={this.handleChange} updateComment={this.updateComment}/>)
           : null
       } */}
       <br/>
     </div>)
}
}
