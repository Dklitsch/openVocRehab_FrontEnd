import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import './two-column-grid.css';
import standard_inline from './standard_inline'
import BasicContainer from './BasicContainer'
import { Link, Redirect } from 'react-router-dom'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import OvrAppBar from './OvrAppBar'
import {useFormField} from './UseFormField'
import PersistentDrawerLeft from './CollapsableDrawerPage'

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

const SourceOfReferralOptions = [
    { 'label': '14(c) Certificate Holders', 'value': 1 }, 
    { 'label': 'Adult Education and Literacy Programs', 'value': 2 }, 
    { 'label': 'American Indian VR Services Program', 'value': 3 }, { 'label': 'Centers for Independent Living', 'value': 4 }, { 'label': 'Child Protective Services', 'value': 5 }, { 'label': 'Community Rehabilitation Programs', 'value': 6 }, { 'label': 'Consumer Organizations or Advocacy Groups', 'value': 7 }, { 'label': 'Department of Labor Employment and Training Service Programs for Adults, Dislocated Workers, and Youth', 'value': 8 }, { 'label': 'Educational Institutions (Elementary/Secondary)', 'value': 9 }, { 'label': 'Educational Institutions (Postsecondary)', 'value': 10 }, { 'label': 'Employers', 'value': 11 }, { 'label': 'Extended Employment Providers', 'value': 11 }, { 'label': 'Faith Based Organizations', 'value': 13 }, { 'label': 'Family/Friends', 'value': 14 }, { 'label': 'Intellectual and Developmental Disabilities Providers', 'value': 15 }, { 'label': 'Medical Health Provider (Public or Private)', 'value': 16 }, { 'label': 'Mental Health Provider (Public or Private)', 'value': 17 }, { 'label': 'Public Housing Authority', 'value': 18 }, { 'label': 'Self-referral', 'value': 19 }, { 'label': 'Social Security Administration (Disability Determination Service or District office)', 'value': 20 }, { 'label': 'State Department of Correction/Juvenile Justice', 'value': 21 }, { 'label': 'Temporary Assistance for Needy Families (TANF)', 'value': 22 }, { 'label': "Veteran's Benefits Administration (which includes VA Vocational Rehabilitation)", 'value': 23 }, { 'label': "Veteran's Health Administration (the VA hospital system, as well as the VA transitional living, transitional employment, and compensated work therapy programs)", 'value': 24 }, { 'label': 'Wagner-Peyser Employment Service Program', 'value': 25 }, { 'label': 'Welfare Agency (State or local government)', 'value': 26 }, { 'label': "Worker's Compensation", 'value': 27 }, { 'label': 'Other One-stop Partner', 'value': 28 }, { 'label': 'Other Sources', 'value': 29 }, { 'label': 'Other State Agencies', 'value': 30 }, { 'label': 'Other VR State Agencies', 'value': 31 }, { 'label': 'Other WIOA-funded Programs including Job Corps, YouthBuild, Indian and Native Americans, and Migrant and Seasonal Farm-worker Programs', 'value': 32 }];

const StudentStatusChoices = [
    {'label': 'Individual is a student with a disability and has a section 504 accommodation.', 'value': 1}, 
    {'label': 'Individual is a student with adisability and is receiving transition services under an Individualized Education Program (IEP).', 'value': 2}, 
    {'label': 'Individual is a student with a disability who does not have a section 504 accommodation and is not receiving services under an IEP.', 'value': 3}, {'label': 'Individual is not a student with a disability.', 'value': 0}
]

function isNotEmptyOrNull(value){

    return value != "" && value != null;

};

function Application(props) {

    const { classes } = props;

    const [dateOfBirth, setDateOfBirth] = useFormField(
        { value: "", valid : true, message : ""},
        (value) => (value != "" && value != null),
        "Please enter a date of birth."
    );

    const [sourceOfReferral, setSourceOfReferral] = useFormField(
        { value: null, valid : true, message : ""},
        (value) => (value != null),
        "Please select a source of referral."
    );

    const [studentStatus, setStudentStatus] = useFormField(
        { value: null, valid : true, message : ""},
        (value) => (value != null),
        "Please select a student status."
    );

    return (

        <PersistentDrawerLeft>

        <Mutation mutation={CREATE_APPLICATION}
            onCompleted={(data) => { }}>

            {(createApplication, { loading, error, data }) => (

                <form onSubmit={e => {
                    e.preventDefault();
                    createApplication({
                        variables: {
                            dateOfBirth: dateOfBirth, 
                            sourceOfReferral: sourceOfReferral,
                            studentStatus : studentStatus
                        }
                    });
                }
                }>

                    

                        <Typography variant="h6">
                            Welcome to Vocational Rehabilitation. We need more information to finish processing your application. If you would like to complete the application later, you can exit and continue at any time.
                        </Typography>

                        <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="center"
                        >

                            <TextField id="dateOfBirth" autoComplete="bday"
                                value={dateOfBirth.value} fullWidth={true}
                                onChange={ e => setDateOfBirth(e.target.value)}
                                onBlur={ e => setDateOfBirth(e.target.value)}
                                required={true} label="Date of Birth" name="bday"
                                error={!dateOfBirth.valid} margin="normal"
                                helperText={dateOfBirth.message} type="date"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                            />

                            <TextField id="sourceOfReferral" name="sourceOfReferral"
                                select fullWidth={true}
                                value={sourceOfReferral.value} 
                                onChange={ e => setSourceOfReferral(e.target.value)}
                                onBlur={ e => setSourceOfReferral(e.target.value)}
                                required={true} label="Which individual, agency, or other entity that first referred the applicant to Vocational Rehabilitation?"
                                error={!sourceOfReferral.valid} margin="normal"
                                helperText={sourceOfReferral.message}
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                            >
                            
                                {SourceOfReferralOptions.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}

                            </TextField>     

                            <div style={{textAlign : "left"}}>                 
                            
                            <Typography>A student with a disability (34 CFR 361.5(c)(51) means, in general, an individual with a disability in a secondary, postsecondary, or other recognized education program who--</Typography>
                            
                            <Typography>&emsp;(A)(1) Is not younger than the earliest age for the provision of transition services under section 614(d)(1)(A)(i)(VIII) of the Individuals with Disabilities Education Act (20 U.S.C. 1414(d)(1)(A)(i)(VIII)); or</Typography>
                            
                            <Typography>&emsp;&emsp;(2)If the State involved elects to use a lower minimum age for receipt of pre-employment transition services under this Act, is not younger than that minimum age; and</Typography>
                            
                            <Typography>&emsp;(B)(1) Is not older than 21 years of age; or</Typography>
                            
                            <Typography>&emsp;&emsp;(2)If the State law for the State provides for a higher maximum age for receipt of services under the Individuals with Disabilities Education Act (20 U.S.C. 1400 et seq.), is not older than that maximum age; and</Typography>
                            
                            <Typography>&emsp;(C)(1) Is eligible for, and receiving, special education or related services under Part B of the Individuals with Disabilities Education Act (20 U.S.C. 1411 et seq.); or</Typography>
                            
                            <Typography>&emsp;&emsp;(2)Is a student who is an individual with a disability, for purposes of section 504.</Typography>

                            </div>   

                            <TextField id="studentStatus" name="studentStatus"
                                select fullWidth={true}
                                value={studentStatus.value} 
                                onChange={ e => setStudentStatus(e.target.value)}
                                onBlur={ e => setStudentStatus(e.target.value)}
                                required={true} label="Select your student status."
                                error={!studentStatus.valid} margin="normal"
                                helperText={studentStatus.message} type="date"
                            >

                                {StudentStatusChoices.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                                ))}

                            </TextField>

                            <Button variant="contained" color="primary" type="submit">
                                Next
                            </Button>

                        </Grid>

                    

                </form>

            )

            }

        </Mutation>

        </PersistentDrawerLeft>

    )

}

export default withStyles(styles)(Application);