import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

export default function Login({baseUrl, setIsLoggedIn, setIsModalOpen}){

    const [username, SetUsername] = useState("")
    const [password, SetPassword] = useState("")

    const loginHandler = useCallback(
        () => {
            let authEncode = btoa(username+":"+password);
            fetch(baseUrl + "auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Accept": "application/json;charset=UTF-8",
                    "authorization": "Basic " + authEncode
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    if(response.status==="ACTIVE"){
                        //console.log("User logged in");
                        localStorage.setItem('isLoggedIn',true);
                     setIsLoggedIn(true)
                     setIsModalOpen(false)
                    }
                });
 
              
        },
        [setIsLoggedIn,setIsModalOpen, username, password],
    )

        return (
            <div className="modal-content">
                <FormControl required error={false} className="formControl">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" aria-describedby="username-text" 
                    onChange={(e)=>{SetUsername(e.target.value)}}  
                    value={username}/>
                    <FormHelperText id="username-text"></FormHelperText>
                </FormControl>
                <br /><br />

                <FormControl required error={false} className="formControl">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" aria-describedby="password-text" onChange={(e)=>{SetPassword(e.target.value)}} value={password} />
                    <FormHelperText id="password-text"></FormHelperText>
                </FormControl>

                <br /><br />
                <Button
                    variant="contained"
                    onClick={loginHandler}
                    color="primary"
                >
                    Login
            </Button>
            </div>


        )

}