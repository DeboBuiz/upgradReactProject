import React, { useEffect, useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";



export default function Register({baseUrl}){
   const [firstname, setFirstname] = useState("")
   const [lastname, setLastname] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [contact, setContact] = useState("")
   const [registerMsg, setRegisterMsg] = useState("")


    const registerHandler = useCallback(
        () => {
            let userData = {
                "email_address": email,
                "first_name": firstname,
                "last_name": lastname,
                "mobile_number": contact,
                "password": password
            }
            fetch(baseUrl + "signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Accept": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(userData)
            })
                .then((response) => response.json())
                .then((response) => {
                    if(response.status==="ACTIVE"){
                        //Registered successfully
                        setRegisterMsg("Registration Successful. Please Login")
                    }
                });
        },
        [firstname,lastname,email,password,contact,setRegisterMsg],
    )

    return (
        <div className="modal-content">
            <FormControl required error={false} className="formControl">
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input id="firstname" aria-describedby="firstname-text" onChange={(e)=>setFirstname(e.target.value)} value={firstname}/>
                <FormHelperText id="firstname-text">required</FormHelperText>
            </FormControl>
            <br /><br />

            <FormControl required error={false} className="formControl">
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input id="lastname" aria-describedby="lastname-text"  onChange={(e)=>setLastname(e.target.value)} value={lastname}/>
                <FormHelperText id="lastname-text">required</FormHelperText>
            </FormControl>
            <br /><br />

            <FormControl required error={false} className="formControl">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" aria-describedby="email-text" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <FormHelperText id="email-text">required</FormHelperText>
            </FormControl>
            <br /><br />

            <FormControl required error={false} className="formControl">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" aria-describedby="password-text" onChange={(e)=>setPassword(e.target.value)} value={password} />
                <FormHelperText error id="password-text">required</FormHelperText>
            </FormControl>
            <br /><br />

            <FormControl required error={false} className="formControl">
                <InputLabel htmlFor="contact">Contact No</InputLabel>
                <Input id="contact" aria-describedby="contact-text" onChange={(e)=>setContact(e.target.value)} value={contact} />
                <FormHelperText id="contact-text">required</FormHelperText>
            </FormControl>
            <br /><br />
            <p>{registerMsg}</p>
            <Button
                variant="contained"
                onClick={registerHandler}
                color="primary"
            >
                Register
        </Button>
        </div>
    )
}