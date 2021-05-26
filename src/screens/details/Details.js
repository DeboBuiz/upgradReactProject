import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography";
import "./Details.css";
import { Link } from "react-router-dom";
import YouTube from 'react-youtube';


export default function Details(props){
    //console.log(props)
    const movieId = props.match.params.movieId;
    const [movieDetail, setMovieDetail] = useState({})
    useEffect(()=>{
        fetch(props.baseUrl + "movies/"+movieId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        })
            .then((response) => response.json())
            .then((response) => {
                //console.log(response.movies);
                setMovieDetail(response);
            });


    },[])

    const BackButton=()=>{
        return (
            <Typography className="backButton">
            <Link to="/">
              &#60; Back to Home
            </Link>
          </Typography>
        )
    }
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
      let video_id = movieDetail.trailer_url.split('v=')[1];
      let ampersandPosition = video_id.indexOf('&');
      if(ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }

    return(
        <div>
        <BackButton/>
        <div className="container">
            <div className="left">
                <img src={movieDetail.poster_url} alt={movieDetail.title} style={{width: "100%"}}/>
            </div>
            <div className="middle">
                <Typography variant="headline" component="h2">
                    {movieDetail.title}
                </Typography>
                <Typography>
                    <b>Genres: </b> {[movieDetail.genres].join(", ")}
                </Typography>
                <Typography>
                    <b>Duration: </b> {movieDetail.duration}
                </Typography>
                <Typography>
                    <b>Release Date: </b> {movieDetail.release_date}
                </Typography>
                <Typography>
                    <b>Rating: </b> {movieDetail.rating}
                </Typography>
                
                <Typography style={{marginTop: "16px"}}>
                    <b>Plot: </b> <a href={movieDetail.wiki_url}>(Wiki Link)</a> {movieDetail.storyline}
                </Typography>

                <Typography style={{marginTop: "16px"}}>
                    <b>Trailer: </b> 
                </Typography>
                <YouTube videoId={video_id} opts={opts} />
            </div>
            <div className="right">Right</div>

        </div>
        </div>

    )
}