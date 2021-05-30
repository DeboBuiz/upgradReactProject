import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import "./Header.css";
import logoUrl from "../../assets/logo.svg"
import Button from "@material-ui/core/Button";
import Modal from 'react-modal'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Login from "../../screens/login/Login"
import Register from "../../screens/register/Register"

const Header = (props) => {
    const bookshowButtonHandler = () => { }
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const [isDetailPage, setIsDetailPage]=useState(false);

    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    const [tabValue, setTabValue] = useState(0);

    const tabChangeHandler = (event, newValue) => { setTabValue(newValue) }
    const [loginAction, setLoginAction] = useState("Login");
    const [isModalOpen, setIsModalOpen] = useState(false);


    const LoginControl = (props) => {
        if (props.action === "Register") {
            return <Register baseUrl={props.baseUrl}/>
        }
        return <Login baseUrl={props.baseUrl}  setIsLoggedIn={setIsLoggedIn} setIsModalOpen={setIsModalOpen}/>
    }

    return (
        <div className="header">
            <img src={logoUrl} alt="logo" className="logo" />
            <div className="header-btn-group">
                {props.isDetailPage && (<Button variant="contained" onClick={bookshowButtonHandler} color="primary"> Book Show </Button>)}
                {
                isLoggedIn 
                && (<Button variant="contained" onClick={()=>{setIsLoggedIn(false)}} color="default" > Logout </Button>)
                || (<Button variant="contained" onClick={() => { setIsModalOpen(true) }} color="default" > Login </Button>)
                }
        
            </div>
            <Modal isOpen={isModalOpen} style={modalStyles}>
                <Tabs value={tabValue} onChange={tabChangeHandler} aria-label="Login / Register Tabs">
                    <Tab label="Login" onClick={() => { setLoginAction("Login") }} />
                    <Tab label="Register" onClick={() => { setLoginAction("Register") }} />
                </Tabs>
                <LoginControl action={loginAction} baseUrl={props.baseUrl} />

            </Modal>
        </div>
    )
}





export default Header