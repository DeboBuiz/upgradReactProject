import React from 'react'
import Header from '../common/header/Header'
import Home from './home/Home'
import Details from './details/Details'
import BookShow from './bookshow/BookShow'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import Login from './login/Login'

function Controller(){
    const baseUrl="http://localhost:3000/api/v1/"
    return (
        <Router>
            <div>
           
            {/* <Header baseUrl={baseUrl}/> */}
            
            <Switch>
            
            <Route exact path="/" render={(props) => (<Home {...props} baseUrl={baseUrl} />)} />
            <Route path="/movie/:movieId" render={(props) => (<Details {...props} baseUrl={baseUrl} />)} />
            <Route path="/bookshow/:id" render={(props) => (<BookShow {...props} baseUrl={baseUrl} />)} />
            </Switch>

                

            </div>


      
        </Router>
    )
}

export default Controller;