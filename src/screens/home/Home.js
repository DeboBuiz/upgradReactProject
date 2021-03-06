import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography";
import "./Home.css";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useTheme } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";

function Home(props) {
    const [movieList, setMovieList] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [artistList, setArtistList] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    //Filter States
    const [fltrMovieName, setFltrMovieName] = useState("");
    const [fltrGenres, setFltrGenres] = useState([]);
    const [fltrArtists, setFltrArtists] = useState([]);
    const [fltrStartDate, setFltrStartDate] = useState("");
    const [fltrEndDate, setFltrEndDate] = useState("");

    const applyFilter = ()=>{  
        console.log(fltrStartDate)   
        let filterString = "title="+fltrMovieName+"&start_date="+fltrStartDate+"&end_date="+fltrEndDate+"&genre="+fltrGenres.join()+"&artists="+fltrArtists.join()

        fetch(props.baseUrl + "movies/?limit=20&"+filterString, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                  setFilteredMovies(response.movies);
            });

    }

    useEffect(() => {
        fetch(props.baseUrl + "movies/?page=1&limit=6", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setMovieList(response.movies);
            });

        fetch(props.baseUrl + "movies/?limit=20", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        })
            .then((response) => response.json())
            .then((response) => {
                 setFilteredMovies(response.movies);
            });

        fetch(props.baseUrl + "genres", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        }).then((response) => response.json())
            .then((response) => {
                setGenreList(response.genres);
            });

        fetch(props.baseUrl + "artists", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        }).then((response) => response.json())
            .then((response) => {
                setArtistList(response.artists);
            });

    }, [])

    const UpcomingMoviesHeader = () => {
        return (
            <div className="upcomingMoviesHeader">
                Upcoming Movies
            </div>
        )
    }


    const HorizontalMoviesListScrollBar = () => {

        return (
            <div>
                <GridList cols={4.5} className="gridlist">
                    {movieList.map((movie) => (
                        <GridListTile key={movie.id} className="gridlistItem">
                            <img src={movie.poster_url} alt={movie.title} style={{ height: "250px" }} />
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        )
    }

    const ReleasedMovies = () => {
        return (
            <div>
                <GridList cols={4}>
                    {filteredMovies.map((movie) => (
                        <GridListTile key={movie.id} style={{ height: "350px" }}>
                            <Link to={"/movie/" + movie.id}><img src={movie.poster_url} alt={movie.title} style={{ height: "350px", width: "100%" }} /></Link>
                            <GridListTileBar
                                title={movie.title}
                                subtitle={"Release Date " + (new Date(movie.release_date)).toDateString()}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        )
    }

    return (
        <div>
            <Header baseUrl={props.baseUrl} isDetailPage={false} />
            <UpcomingMoviesHeader />
            <HorizontalMoviesListScrollBar />
            <div className="releasedMovies-container">
                <ReleasedMovies className="releasedMoviesSection" />
                
                <div className="filterSection">
                <Card className="filterCard">
                    <CardContent>
                        <Typography variant="headline" component="h2" color="primary" >
                            FIND MOVIES BY:
                        </Typography>
                        <br />

                        <FormControl className="formControl">
                            <TextField id="movieName" label="Movie Name" onChangeCapture={(e)=>setFltrMovieName(e.target.value)} value={fltrMovieName}/>
                        </FormControl>
                        <br /><br />


                        <FormControl className="formControl">
                            <InputLabel htmlFor="genre">Genres</InputLabel>
                            <Select value={fltrGenres} onChange={(e)=>{setFltrGenres(e.target.value)}} id="genre" multiple renderValue={(selected) => selected.join(', ')}>
                                {genreList.map((genreItem) => (
                                    <MenuItem key={"genre" + genreItem.id} value={genreItem.genre}>
                                        <Checkbox checked={fltrGenres.indexOf(genreItem.genre) > -1} />
                                        {genreItem.genre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br />
                        <br />

                        <FormControl className="formControl">
                            <InputLabel htmlFor="artist">Artists</InputLabel>
                            <Select value={fltrArtists} onChange={(e)=>{setFltrArtists(e.target.value)}} id="artist" multiple renderValue={(selected)=>selected.join(', ')}>
                                {artistList.map((artistItem) => (
                                    <MenuItem key={"artist" + artistItem.id} value={artistItem.first_name + " " + artistItem.last_name}>
                                        <Checkbox checked={fltrArtists.indexOf(artistItem.first_name + " " + artistItem.last_name) > -1} /> 
                                        {artistItem.first_name + " " + artistItem.last_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br />
                        <br />

                        <FormControl className="formControl">
                            <TextField
                                id="release-date-start"
                                label="Release Date Start"
                                type="date" 
                                onChange={e=>setFltrStartDate(e.target.value)}                               
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <br /><br />

                        <FormControl className="formControl">
                            <TextField
                                id="release-date-end"
                                label="Release Date End"
                                type="date"
                                onChange={e=>{setFltrEndDate(e.target.value)}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <br /><br />
                        <br />

                        <Button
                            variant="contained"
                            onClick={applyFilter}
                            color="primary"
                            style={{ width: "100%" }}
                        >
                            APPLY
                        </Button>
                    </CardContent>
                </Card>
            </div>
            </div>

        </div>
    )
}

export default Home