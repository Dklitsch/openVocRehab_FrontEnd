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

const GET_APPLICATION = gql`
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

const CREATE_APPLICATION = gql`
mutation creatApplication(
    $dateOfBirth: Date!, 
    $sourceOfReferral: Int!,
      $studentStatus : Int!
  ) {
    createApplication(dateOfBirth : $dateOfBirth, 
      sourceOfReferral : $sourceOfReferral,
        studentStatus : $studentStatus) 
    {
      success,
      dateOfBirth,
      sourceOfReferral,
      studentStatus,
      applicationDate,
      authenticationError
    }
  }
`

function Application(props) {

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

    function validateDateOfBirth(dateOfBirthValue) {
        let valMessage = isEmptyValidation(dateOfBirthValue, setValidDateOfBirth) ? "" : "Please enter a date of birth.";
        setDateOfBirthValidationMessage(valMessage);
    }

    const [dateOfBirth, setDateOfBirth] = useState("");
    const [validDateOfBirth, setValidDateOfBirth] = useState(true);
    const [dateOfBirthValidationMessage, setDateOfBirthValidationMessage] = useState("");

    const [sourceOfReferral, setSourceOfReferral] = useState("");
    const [validSourceOfReferral, setValidSourceOfReferral] = useState(true);
    const [sourceOfReferralValidationMessage, setSourceOfReferralValidationMessage] = useState("");

    const [studentStatus, setStudentStatus] = useState("");
    const [validstudentStatus, setValidStudentStatus] = useState(true);
    const [studentStatusValidationMessage, setStudentStatusValidationMessage] = useState("");

    return (

        <Mutation mutation={CREATE_APPLICATION}
            onCompleted={(data) => { }}>

            {(createUser, { loading, error, data }) => (

                <form onSubmit={e => {
                    e.preventDefault();
                    createUser({
                        variables: {

                        }
                    });
                }
                }>

                    <BasicContainer>

                        <Typography variant="h6">
                            Welcome to Vocational Rehabilitation. We need more information to finish processing your application. If you'd like to complete the application later, you can exit and continue at any time.
                        </Typography>

                        <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="center"
                        >

                            <TextField id="dateOfBirth" autoComplete="bday"
                                value={dateOfBirth} 
                                onChange={ e => setDateOfBirth(e.target.value)}
                                onBlur={
                                    e => validateDateOfBirth(e.target.value)
                                } 
                                required={true} label="Username" name="username"
                                error={!validDateOfBirth} margin="normal"
                                helperText={dateOfBirthValidationMessage} type="date"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                            />

                            <TextField id="sourceOfReferral" name="sourceOfReferral"
                                value={sourceOfReferral} 
                                onChange={ e => setSourceOfReferral(e.target.value)}
                                onBlur={
                                    e => validateDateOfBirth(e.target.value)
                                } 
                                required={true} label="Username" name="username"
                                error={!validSourceOfReferral} margin="normal"
                                helperText={sourceOfReferralValidationMessage} type="date"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                            />

                            <TextField id="studentStatus" name="studentStatus"
                                value={dateOfBirth} 
                                onChange={ e => setDateOfBirth(e.target.value)}
                                onBlur={
                                    e => validateDateOfBirth(e.target.value)
                                } 
                                required={true} label="Username" name="username"
                                error={!validateDateOfBirth} margin="normal"
                                helperText={dateOfBirthValidationMessage} type="date"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                            />

                        </Grid>

                    </BasicContainer>

                </form>

            )

            }

        </Mutation>

    )

}

export default withStyles(styles)(Application);