import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import './two-column-grid.css';
import standard_inline from './standard_inline'
import { Link, Redirect } from 'react-router-dom'
import { CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { AppBar } from '@material-ui/core';

const styles = standard_inline

const LOGIN = gql`
mutation TokenAuth($username: String!, $password: String!) {  
    tokenAuth(username: $username, password: $password) 
    {
    token
    }
}
`

function Login(props) {

    const { classes } = props;

    const [signInUsername, setSignInUsername] = useState("");
    const [validUsername, setValidUsername] = useState(true);
    const [usernameValidationMessage, setUsernameValidationMessage] = useState("");

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);
    const [passwordValidationMessage, setPasswordValidationMessage] = useState("");

    const userRegistered = (props.location.state) ? props.location.state.userRegistered : false;

    function isEmptyValidation(stateVar, stateFunction) {

        if (stateVar == "") {
            stateFunction(false);
            return true;
        }
        else {
            stateFunction(true);
            return false;
        }

    }

    function validateUsername(unVal) {

        if (isEmptyValidation(unVal, setValidUsername)) {

            setUsernameValidationMessage("Username cannot be empty.")
            return false;

        }

        setUsernameValidationMessage("");
        return true;
    }

    function validatePassword(pwVal) {
        if (pwVal == "") {
            setValidPassword(false);
            setPasswordValidationMessage("Password cannot be empty.")
            return false
        }

        setPasswordValidationMessage("")
        return true
    }

    function handleError(error)
    {
        setValidPassword(false);
        setPasswordValidationMessage(error.graphQLErrors[0].message);
    }

    function handleData(data)
    {

        localStorage.setItem('token', data.tokenAuth.token);

    }

    return (

        <div>

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
                        Login
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
                            value={password} 
                            onChange={ e => setPassword(e.target.value)}
                            label="Password" name="password" variant="filled"
                            style={{backgroundColor : "white"}}
                        />

                        <Button color="inherit">Login</Button>

                        

                </Grid>

                </div>
                </div>

            </AppBar>

        <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
        >

            <Mutation mutation={LOGIN}
                onCompleted={(data) => { handleData(data)}}
                onError={(error) => handleError(error)}
            >

                {(login, { loading, error, data }) => (

                    <form onSubmit={
                        e => {
                            e.preventDefault();
                            if (validateUsername() && validatePassword()) 
                            {
                                login( { variables: { username: signInUsername, password: password } } );
                            }
                        }
                    }>

                        {localStorage.getItem('token') && <Redirect to="/application"></Redirect>}

                        <Paper className={classes.paper}>

                

                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>

                                {userRegistered
                                    &&
                                    <card>
                                        <CardContent>Thank you for registering! Please log in.</CardContent>
                                    </card>}

                                <TextField id="signUpUsername" autoComplete="username"
                                    value={signInUsername}
                                    onChange={e => setSignInUsername(e.target.value)}
                                    onBlur={
                                        e => validateUsername(e.target.value)
                                    }
                                    required={true} label="Username" name="username"
                                    error={!validUsername} margin="normal"
                                    helperText={usernameValidationMessage}
                                />

                                <TextField id="password" autoComplete="current-password"
                                    value={password} onChange={e => setPassword(e.target.value)}
                                    onBlur={e => validatePassword(e.target.value)}
                                    required={true} label="Password" name="password"
                                    type="password"
                                    error={!validPassword} margin="normal"
                                    helperText={passwordValidationMessage} />

                                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                                    Sign In
                                </Button>

                                <Link to={'/register'}>
                                    <Button
                                        variant="contained" color="primary" className={classes.button}>
                                        Register
                                    </Button>   
                                </Link>


                            </Paper>

                        </form>

                    )

                }

            </Mutation>

        </Grid>

        </div>


    );

}

export default withStyles(styles)(Login);