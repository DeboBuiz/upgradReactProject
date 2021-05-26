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



const Header = (props) => {
    const bookshowButtonHandler = () => { }
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    const RenderHeaderButtonGroup = () => {
        if (isLoggedIn) {
            return (
                <div>
                    <Button variant="contained" onClick={bookshowButtonHandler} color="primary"> Book Show </Button>
                    <Button variant="contained" onClick={()=>{setIsLoggedIn(false)}} color="default" > Logout </Button>
                </div>
            )
        }
        return <Button variant="contained" onClick={() => { setIsModalOpen(true) }} color="default" > Login </Button>

    }

    const modalLoginBtnHandler = () => {
        setIsLoggedIn(true);
        setIsModalOpen(false);
     }
    const LoginForm = () => {
        return (
            <div className="modal-content">
                <FormControl required error={false} className="formControl">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" aria-describedby="username-text" />
                    <FormHelperText id="username-text"></FormHelperText>
                </FormControl>
                <br /><br />

                <FormControl required error={false} className="formControl">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" aria-describedby="password-text" />
                    <FormHelperText id="password-text"></FormHelperText>
                </FormControl>

                <br /><br />
                <Button
                    variant="contained"
                    onClick={modalLoginBtnHandler}
                    color="primary"
                >
                    Login
            </Button>
            </div>


        )
    }


    const modalRegisterBtnHandler = () => { }
    const RegisterForm = () => {
        return (
            <div className="modal-content">
                <FormControl required error={false} className="formControl">
                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                    <Input id="firstname" aria-describedby="firstname-text" />
                    <FormHelperText id="firstname-text">required</FormHelperText>
                </FormControl>
                <br /><br />

                <FormControl required error={false} className="formControl">
                    <InputLabel htmlFor="lastname">Last Name</InputLabel>
                    <Input id="lastname" aria-describedby="lastname-text" />
                    <FormHelperText id="lastname-text">required</FormHelperText>
                </FormControl>
                <br /><br />

                <FormControl required error={false} className="formControl">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" aria-describedby="email-text" />
                    <FormHelperText id="email-text">required</FormHelperText>
                </FormControl>
                <br /><br />

                <FormControl required error={false} className="formControl">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" aria-describedby="password-text" />
                    <FormHelperText error id="password-text">required</FormHelperText>
                </FormControl>
                <br /><br />

                <FormControl required error={false} className="formControl">
                    <InputLabel htmlFor="contact">Contact No</InputLabel>
                    <Input id="contact" aria-describedby="contact-text" />
                    <FormHelperText id="contact-text">required</FormHelperText>
                </FormControl>
                <br /><br />
                <p>Registration Successful. Please Login</p>
                <Button
                    variant="contained"
                    onClick={modalRegisterBtnHandler}
                    color="primary"
                >
                    Register
            </Button>
            </div>
        )
    }

    const LoginControl = (props) => {
        if (props.action === "Register") {
            return <RegisterForm />
        }
        return <LoginForm />
    }

    return (
        <div className="header">
            <img src={logoUrl} alt="logo" className="logo" />
            <div className="header-btn-group">
                <RenderHeaderButtonGroup />
            </div>
            <Modal isOpen={isModalOpen} style={modalStyles}>
                <Tabs value={tabValue} onChange={tabChangeHandler} aria-label="Login / Register Tabs">
                    <Tab label="Login" onClick={() => { setLoginAction("Login") }} />
                    <Tab label="Register" onClick={() => { setLoginAction("Register") }} />
                </Tabs>
                <LoginControl action={loginAction} />

            </Modal>
        </div>
    )
}





export default Header