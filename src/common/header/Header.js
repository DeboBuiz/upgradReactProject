import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import "./Header.css"; 
import logoUrl from "../../assets/logo.svg"
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from 'react-modal'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

const Header = (props)=>{
    const loginButtonHandler = ()=>{}
    const bookshowButtonHandler = ()=>{}

    const modalStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
    
    const [tabValue, setTabValue] = useState(0);

    const tabChangeHandler = (event,newValue)=>{setTabValue(newValue)}
    const [loginAction, setLoginAction] = useState("Login");

    return (
        <div className="header">
            <img src={logoUrl} alt="logo" className="logo" />
            <div className="header-btn-group">
                <Button variant="contained" onClick={bookshowButtonHandler}  color="primary" > Book Show </Button>
                <Button variant="contained" onClick={loginButtonHandler}  color="default" > Login </Button>
                <Button variant="contained" onClick={loginButtonHandler}  color="default" > Logout </Button>
            </div>
            <Modal isOpen={true} style={modalStyles}>
                <Tabs value={tabValue} onChange={tabChangeHandler} aria-label="Login / Register Tabs">
                    <Tab label="Login" onClick={()=>{setLoginAction("Login")}}/>
                    <Tab label="Register" onClick={()=>{setLoginAction("Register")}}/>
                </Tabs>
                <LoginControl action={loginAction}/>

            </Modal>
        </div>
    )
}

const LoginForm = ()=>{
    return (
        <div>
            This is login form
            <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
        </div>
    )
}

const RegisterForm = ()=>{
    return (
        <div>
            This is register form
        </div>
    )
}

const LoginControl = (props)=>{
    if(props.action === "Register"){
        return <RegisterForm />
    }
    return <LoginForm />
}

export default Header