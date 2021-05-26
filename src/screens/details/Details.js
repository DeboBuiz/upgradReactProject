import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography";
import "./Details.css";
import { Link } from "react-router-dom";
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


export default function Details(props){
    //console.log(props)
    const movieId = props.match.params.movieId;
    const [movieDetail, setMovieDetail] = useState({})
    const [artists, setArtists] = useState([]);
    const [videoId, setVideoId] = useState("");
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
                setVideoId(response.trailer_url.split("v=")[1]);
                setArtists(response.artists);
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
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };


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
                    <b>Release Date: </b> {(new Date(movieDetail.release_date)).toDateString()}
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
                <YouTube videoId={videoId} opts={opts} /> 
            </div>
            <div className="right">
            <Typography>
                    <b>Rate this movie: </b> 
                </Typography>
                <StarBorderIcon fontSize="inherit" className="ratingStar"/>
                <StarBorderIcon fontSize="inherit" className="ratingStar"/>
                <StarBorderIcon fontSize="inherit" className="ratingStar"/>
                <StarBorderIcon fontSize="inherit" className="ratingStar"/>
                <StarBorderIcon fontSize="inherit" className="ratingStar"/>

                <Typography style={{marginTop: "16px", marginBottom: "16px"}}>
                    <b>Artists: </b> 
                </Typography>

                <GridList cols={2}>
                    {artists.map((artist) => (
                        <GridListTile key={artist.id} style={{ height: "auto" }}>
                            <img src={artist.profile_url} alt={artist.first_name+" "+artist.last_name} style={{ height: "auto", width: "100%" }} />
                            <GridListTileBar
                                title={artist.first_name+" "+artist.last_name}                                
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>

        </div>
        </div>

    )
}