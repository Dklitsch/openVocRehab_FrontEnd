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
import {useFormField} from './UseFormField'

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

    const [signInUsername, setSignInUsername] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    const [userCreated, setUserCreated] = useState(false);

    const [signUpUsername, setSignUpUsername] = useFormField(
        { value: "", valid : true, message : ""},
        value => (value != ""),
        "Please enter a username."
    );

    const [password, setPassword] = useFormField(
        { value: "", valid : true, message : ""},
        value => (value != ""),
        "Password cannot be empty."
    );

    const [passwordConfirm, setPasswordconfirm] = useFormField(
        { value: "", valid : true, message : ""},
        value => (value == password),
        "Passwords must match."
    );

    const [email, setEmail] = useFormField(
        { value: "", valid : true, message : ""},
        value => (value != ""),
        "Please enter an email."
    );

    const [firstName, setFirstname] = useFormField(
        { value: "", valid : true, message : ""},
        value => (value != ""),
        "Please enter a first name."
    );

    const [lastName, setLastname] = useFormField(
        { value: "", valid : true, message : ""},
        value => (value != ""),
        "Please enter a last name."
    );

    function handleResponse(data) {
        setUserCreated(data.createUser.success);
        if (data.createUser.userAlreadyExists)
        {
            setSignUpUsername(
                { 
                    value : signUpUsername.value,
                    valid : false,
                    message : "Username already exists."}
            )
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
                                username: signUpUsername.value, email: email.value, password: password.value,
                                first_name: firstName.value, last_name: lastName.value
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
                                            value={signUpUsername.value} 
                                            onChange={ e => setSignUpUsername(e.target.value)}
                                            onBlur={ e => setSignUpUsername(e.target.value)}
                                            required={true} label="Username" name="username"
                                            error={!signUpUsername.valid} margin="normal"
                                            helperText={signUpUsername.message}
                                        />

                                        <TextField id="password" autoComplete="new-password"
                                            value={password.value} onChange={e => setPassword(e.target.value)}
                                            onBlur={e => setPassword(e.target.value)}
                                            required={true} label="Password" name="password"
                                            type="password"
                                            error={!password.valid} margin="normal"
                                            helperText={password.message} />

                                        <TextField id="confirmPassword" autoComplete="new-password"
                                            value={passwordConfirm.value} onChange={e => setPasswordconfirm(e.target.value)}
                                            onBlur={e => setPasswordconfirm(e.target.value)}
                                            required={true} label="Confirm Password" name="confirmPassword"
                                            type="password"
                                            error={!passwordConfirm.valid} margin="normal" 
                                            helperText={passwordConfirm.message}/>

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
                                            value={email.value} onChange={ e => setEmail(e.target.value)}
                                            onBlur={ e => setEmail(e.target.value)} required={true}
                                            label="Email" name="email" error={!email.valid}
                                            margin="normal"
                                            helperText={email.message} />

                                        <TextField id="firstName" autoComplete="given-name"
                                            value={firstName.value} onChange={ e => setFirstname(e.target.value)}
                                            onBlur={ e => setFirstname(e.target.value)} required={true}
                                            label="First Name" name="firstName" error={!firstName.valid}
                                            margin="normal" 
                                            helperText={firstName.message}/>

                                        <TextField id="lastName" autoComplete="family-name"
                                            value={lastName.value} onChange={ e => setLastname(e.target.value)}
                                            onBlur={ e => setLastname(e.target.value)} required={true}
                                            label="Last Name" name="lastName" error={!lastName.valid}
                                            margin="normal" 
                                            helperText={lastName.message}/>

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