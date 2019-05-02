import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import './two-column-grid.css';
import standard_inline from './standard_inline'
import BasicContainer from './BasicContainer'
import { Link, Redirect } from 'react-router-dom'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { AppBar } from '@material-ui/core';

const styles = standard_inline
styles.AppBar = {flexGrow: 1,}
styles.grow = {flexGrow: 1,}
styles.loginInput = { backgroundColor: "white"}

const CREATE_USER = gql`
mutation createUser(
    $username : String!, 
    $first_name : String!,
    $last_name : String!,
    $email :String!,
    $password : String!
  ) {
    createUser(
      username: $username,
      firstName : $first_name,
      lastName : $last_name,
      email : $email,
      password : $password
    
    ) {
      success,
      userAlreadyExists
      }
    }
`

function Register(props) {

    const { classes } = props;
    const [signUpUsername, setSignUpUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordconfirm] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");

    const [signInUsername, setSignInUsername] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    const [userCreated, setUserCreated] = useState(false);

    const [validUsername, setValidUsername] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validPasswordConfirm, setValidPasswordConfirm] = useState(true);
    const [validFirstName, setValidFirstname] = useState(true);
    const [validLastName, setValidLastname] = useState(true);
    
    const [usernameValidationMessage, setUsernameValidationMessage] = useState("");
    const [passwordValidationMessage, setPasswordValidationMessage] = useState("");
    const [passwordConfirmValidationMessage, setPasswordConfirmValidationMessage] = useState("");
    const [emailValidationMessage, setEmailValidationMessage] = useState("");
    const [firstNameValidationMessage, setFirstNameValidationMessage] = useState("");
    const [lastNameValidationMessage, setLastNameValidationMessage] = useState("");

    function isEmptyValidation(stateVar, stateFunction) {

        if (stateVar == "") {
            stateFunction(false);
            return false;
        }
        else {
            stateFunction(true);
            return true;
        }

    }

    function validateUsername(unVal) {
        let valMessage = isEmptyValidation(unVal, setValidUsername) ? "" : "Username cannot be empty.";
        setUsernameValidationMessage(valMessage);
    }

    function validatePassword(pwVal) {
        if (pwVal == "") {
            setValidPassword(false);
            setPasswordValidationMessage("Password cannot be empty.")
        }
        else {

            if (passwordConfirm != "" && pwVal != passwordConfirm) {
                setValidPassword(false);
                setPasswordValidationMessage("Passwords do not match.")
            }
            else {
                setValidPassword(true);
                setPasswordValidationMessage("")
            }

        }
    }

    function validateConfirmPassword(pwcVal) {

        if (pwcVal == "") {

            setValidPasswordConfirm(false);
            setPasswordConfirmValidationMessage("Password confirmation.")

        }
        else {

            if (password != "" && password != pwcVal) {
                setValidPasswordConfirm(false);
                setPasswordConfirmValidationMessage("Passwords do not match.")
            }
            else {
                setValidPasswordConfirm(true);
                setPasswordConfirmValidationMessage("")
            }

        };

        setPasswordconfirm(pwcVal);
    }

    function validateEmail(emailVal) {
        let valMessage = isEmptyValidation(emailVal, setValidEmail) ? "" : "Email cannot be empty.";
        setEmailValidationMessage(valMessage);
        setEmail(emailVal)
    }

    function validateFirstName(fnVal) {
        let valMessage = isEmptyValidation(fnVal, setValidFirstname) ? "" : "First name cannot be empty.";
        setFirstNameValidationMessage(valMessage);
        setFirstname(fnVal)
    }

    function validateLastName(lnVal) {
        let valMessage = isEmptyValidation(lnVal, setValidLastname)? "" : "Last name cannot be empty.";
        setLastNameValidationMessage(valMessage);
        setLastname(lnVal)
    }

    function handleResponse(data) {
        setUserCreated(data.createUser.success);
        if (data.createUser.userAlreadyExists)
        {

            setValidUsername(false);
            setUsernameValidationMessage("Username already exists.");

        };
    }

    return (

        <div>

            {userCreated 
                && 
                <Redirect to={{
                    pathname: "/",
                    state: { userRegistered: true }
                  }}/>}

            {/* The app bar is really ugly, I'll fix it later.*/}

            <AppBar class={classes.AppBar} position="static">

            <div class="two-coulmn-grid">

            <div>

            <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignContent="center"
                                        alignItems="center"
                                    >

                    <Typography variant="h6" color="inherit" style={{padding : ".5em"}}>
                        Sign Up
                    </Typography>

                    </Grid>

                    </div>

                    <div>

                    <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    >

                        <TextField id="signInUsername" autoComplete="username"
                            value={signInUsername} 
                            onChange={ e => setSignInUsername(e.target.value)}
                            label="Username" name="username" variant="filled"
                            style={{backgroundColor : "white"}}
                            
                        />

                        <TextField id="signInPassword" autoComplete="password"
                            value={signInPassword} 
                            onChange={ e => setSignInPassword(e.target.value)}
                            label="Password" name="password" variant="filled"
                            style={{backgroundColor : "white"}}
                        />

                        <Button color="inherit">Login</Button>

                        

                </Grid>

                </div>
                </div>

            </AppBar>

            <Mutation mutation={CREATE_USER}
                onCompleted={(data) => { handleResponse(data); }}>    

                {(createUser, { loading, error, data }) => (

                    <form onSubmit={e => {
                        e.preventDefault();
                        createUser({
                            variables: {
                                username: signUpUsername, email: email, password: password,
                                first_name: firstName, last_name: lastName
                            }
                        });
                    }
                    }>

                        <BasicContainer>

                            <Typography component="h1" variant="h5">
                                Register a new account
                            </Typography>

                            <div class="two-coulmn-grid">

                                <div>

                                    <Grid
                                        container
                                        direction="column"
                                        justify="space-between"
                                        alignItems="center"
                                    >

                                        <TextField id="signUpUsername" autoComplete="username"
                                            value={signUpUsername} 
                                            onChange={ e => setSignUpUsername(e.target.value)}
                                            onBlur={
                                                e => validateUsername(e.target.value)
                                            } 
                                            required={true} label="Username" name="username"
                                            error={!validUsername} margin="normal"
                                            helperText={usernameValidationMessage}
                                        />

                                        <TextField id="password" autoComplete="new-password"
                                            value={password} onChange={e => setPassword(e.target.value)}
                                            onBlur={e => validatePassword(e.target.value)}
                                            required={true} label="Password" name="password"
                                            type="password"
                                            error={!validPassword} margin="normal"
                                            helperText={passwordValidationMessage} />

                                        <TextField id="confirmPassword" autoComplete="new-password"
                                            value={passwordConfirm} onChange={e => setPasswordconfirm(e.target.value)}
                                            onBlur={e => validateConfirmPassword(e.target.value)}
                                            required={true} label="Confirm Password" name="confirmPassword"
                                            type="password"
                                            error={!validPasswordConfirm} margin="normal" 
                                            helperText={passwordConfirmValidationMessage}/>

                                    </Grid>

                                </div>

                                <div>

                                    <Grid
                                        container
                                        direction="column"
                                        justify="space-between"
                                        alignItems="center"
                                    >


                                        <TextField id="email" autoComplete="email"
                                            value={email} onChange={ e => setEmail(e.target.value)}
                                            onBlur={e => validateEmail(e.target.value)} required={true}
                                            label="Email" name="email" error={!validEmail}
                                            margin="normal"
                                            helperText={emailValidationMessage} />

                                        <TextField id="firstName" autoComplete="given-name"
                                            value={firstName} onChange={ e => setFirstname(e.target.value)}
                                            onBlur={e => validateFirstName(e.target.value)} required={true}
                                            label="First Name" name="firstName" error={!validFirstName}
                                            margin="normal" 
                                            helperText={firstNameValidationMessage}/>

                                        <TextField id="lastName" autoComplete="family-name"
                                            value={lastName} onChange={ e => setLastname(e.target.value)}
                                            onBlur={e => validateLastName(e.target.value)} required={true}
                                            label="Last Name" name="lastName" error={!validLastName}
                                            margin="normal" 
                                            helperText={lastNameValidationMessage}/>

                                    </Grid>

                                </div>

                            </div>

                            <Button variant="contained" color="primary" type="submit" className={props.button}>
                                Sign Up
            </Button>

                            <Link to={'/'}><Button
                                color="primary" className={props.button}>
                                I already have an account
            </Button>
                            </Link>

                        </BasicContainer>
                    </form>

                )}
            </Mutation>
        </div>

    )

}
// }

export default withStyles(styles)(Register);