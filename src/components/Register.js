import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import './two-column-grid.css';
import standard_inline from './standard_inline'
import BasicContainer from './BasicContainer'
import { Link, Redirect } from 'react-router-dom'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


const styles = standard_inline

const CREATE_USER = gql`
mutation createUser(
    $username : String, 
    $first_name : String,
    $last_name : String,
    $email :String,
    $password : String
  ) {
    createUser(
      username: $username,
      firstName : $first_name,
      lastName : $last_name,
      email : $email,
      password : $password
    
    ) {
      success
      }
    }
`

function RedirectToLogin()
{
    return(

        <Redirect push to="/test"/>

    );

};

function Register(props){

    const { classes } = props;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordconfirm] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");

    const [validUsername, setValidUsername] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validPasswordConfirm, setValidPasswordConfirm] = useState(true);
    const [validFirstName, setValidFirstname] = useState(true);
    const [validLastName, setValidLastname] = useState(true);

    function isEmptyValidation(stateVar, stateFunction)
    {

        if (stateVar == "")
        {
            stateFunction(false);
        }
        else
        {
            stateFunction(true);
        }

        }

    function validateUsername(unVal)
    {
        isEmptyValidation(unVal, setValidUsername);
        setUsername(unVal)
    }

    function validatePassword(pwVal)
    {
        if (pwVal =="")
        {
            setValidPassword(false);
        }
        else
        {

            if (passwordConfirm != "" && pwVal != passwordConfirm)
            {
                setValidPassword(false);
            }
            else
            {
                setValidPassword(true);
            }

        }
        setPassword(pwVal)
    }

    function validateConfirmPassword(pwcVal)
    {

        if (pwcVal =="")
        {

            setValidPasswordConfirm(false);

        }
        else
        {

            if (password != "" && password != pwcVal)
            {
                setValidPasswordConfirm(false);
            }
            else
            {
                setValidPasswordConfirm(true);  
            }

        };

        setPasswordconfirm(pwcVal);
    }

    function validateEmail(emailVal) {
        isEmptyValidation(emailVal, setValidEmail)
        setEmail(emailVal)
    }

    function validateFirstName(fnVal) {
        isEmptyValidation(fnVal, setValidFirstname)
        setFirstname(fnVal)
    }

    function validateLastName(lnVal) {
        isEmptyValidation(lnVal, setValidLastname)
        setLastname(lnVal)
    }

    return(

        <Mutation mutation={CREATE_USER} onCompleted={() => {RedirectToLogin();}}>
        {(createUser, { loading, error }) => (

            <form onSubmit={e => 
                { 
                    e.preventDefault();
                    createUser({ variables: { username: username, email : email, password : password, 
                                                first_name : firstName, last_name : lastName } });
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

                        <TextField id="username" autoComplete="username" 
                            value={username} onChange={
                                e => validateUsername(e.target.value)
                            } required={true} label="Username" name="username"
                            error={!validUsername} margin="normal"
                            />

                        <TextField id="password" autoComplete="current-password"
                            value={password} onChange={e => validatePassword(e.target.value)}
                            required={true} label="Password" name="password"
                            error={!validPassword} margin="normal"/>

                        <TextField id="confirmPassword" autoComplete="current-password"
                            value={passwordConfirm} onChange={e => validateConfirmPassword(e.target.value)}
                            required={true} label="Confirm Password" name="confirmPassword"
                            error={!validPasswordConfirm} margin="normal"/>

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
                            value={email} onChange={e => validateEmail(e.target.value)} required={true}
                             label="Email" name="email" error={!validEmail}
                             margin="normal"/>

                        <TextField id="firstName" autoComplete="given-name"
                            value={firstName} onChange={e => validateFirstName(e.target.value)} required={true}
                            label="First Name" name="firstName" error={!validFirstName}
                            margin="normal"/>

                        <TextField id="lastName" autoComplete="family-name"
                            value={lastName} onChange={e => validateLastName(e.target.value)} required={true}
                            label="Last Name" name="lastName" error={!validLastName}
                            margin="normal"/>

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

    )

}

export default withStyles(styles)(Register);