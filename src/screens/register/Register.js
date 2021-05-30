import React, { useEffect, useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from '@material-ui/core/TextField';


export default function Register({baseUrl}){
   const [firstname, setFirstname] = useState("")
   const [lastname, setLastname] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [contact, setContact] = useState("")
   const [registerMsg, setRegisterMsg] = useState("")

   const [firstnameError, setFirstnameError] = useState(false);
   const [lastnameError, setLastnameError] = useState(false)
   const [emailError, setEmailError] = useState(false)
   const [passwordError, setPasswordError] = useState(false)
   const [contactError, setContactError] = useState(false)

    const registerHandler = () => {

            firstname.trim()=="" ? setFirstnameError(true) : setFirstnameError(false)
            lastname.trim()=="" ? setLastnameError(true) : setLastnameError(false)
            email.trim()=="" ? setEmailError(true) : setEmailError(false)
            contact.trim()=="" ? setContactError(true) : setContactError(false)
            password.trim()=="" ? setPasswordError(true) : setPasswordError(false)
            let userData = {
                "email_address": email,
                "first_name": firstname,
                "last_name": lastname,
                "mobile_number": contact,
                "password": password
            }

            if(!(firstname.trim()=="" || lastname.trim()=="" || email.trim()=="" || contact.trim()==""  || password.trim()=="")){
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
            }

        }

    return (
        <div className="modal-content">
            <FormControl required error={false} className="formControl">
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input id="firstname" aria-describedby="firstname-text" onChange={(e)=>setFirstname(e.target.value)} value={firstname}/>
                {firstnameError&&<FormHelperText id="firstname-text" error>required</FormHelperText>}
            </FormControl>
            <br /><br />

            <FormControl required error={false} className="formControl">
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input id="lastname" aria-describedby="lastname-text"  onChange={(e)=>setLastname(e.target.value)} value={lastname}/>
                {lastnameError&&<FormHelperText id="lastname-text" error>required</FormHelperText>}
            </FormControl>
            <br /><br />

            <FormControl required error={false} className="formControl">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" aria-describedby="email-text" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                {emailError&&<FormHelperText id="email-text" error>required</FormHelperText>}
            </FormControl>
            <br /><br />

            <FormControl required error={false} className="formControl">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" aria-describedby="password-text" onChange={(e)=>setPassword(e.target.value)} value={password} />
                {passwordError&&<FormHelperText id="password-text" error>required</FormHelperText>}
            </FormControl>
            <br /><br />

            <FormControl required error={false} className="formControl">
                <InputLabel htmlFor="contact">Contact No</InputLabel>
                <Input id="contact" aria-describedby="contact-text" onChange={(e)=>setContact(e.target.value)} value={contact} />
                {contactError&&<FormHelperText id="contact-text" error>required</FormHelperText>}
            </FormControl>
            <br /><br />

            <p>{registerMsg}</p>
            <Button
                variant="contained"
                //onClick={registerHandler}
                onSubmit={registerHandler}
                color="primary"
            >
                Register
        </Button>
        </div>
    )
}