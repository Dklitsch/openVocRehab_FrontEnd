import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import '../two-column-grid.css';
import standard_inline from '../standard_inline'
import BasicContainer from '../BasicContainer'
import { Link, Redirect } from 'react-router-dom'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import OvrAppBar from '../OvrAppBar'
import * as Options from './Options'
import {useFormField} from '../UseFormField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PersistentDrawerLeft from '../CollapsableDrawerPage'



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

const styles = standard_inline

const GET_INDIVIDUAL_CHARACTERISTICS = gql`
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
`;

const CREATE_INDIVIDUAL_CHARACTERISTICS = gql`
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
`;

function IndividualCharacteristics(props) { 

    const { classes } = props;

    const [page, setPage] = useState(1);

    const [sex, setSex] = useFormField(
        { value: null, valid : true, message : ""},
        (value) => (value != null),
        "Please select the applicant's sex."
    );

    const [americanIndian, setAmericanIndian] = useFormField(
        { value: null, valid : true, message : ""},
        (value) => (value != null),
        "Please select an option."
    );

    const [asian, setAsian] = useFormField(
        { value: null, valid : true, message : ""},
        (value) => (value != null),
        "Please select an option."
    );

    const [blackAfricanAmerican, setBlackAfricanAmerican] = useFormField(
        { value: null, valid : true, message : ""},
        (value) => (value != null),
        "Please select an option."
    );

    const [nativeHawaiian, setNativeHawaiian] = useFormField(
        { value: null, valid : true, message : ""},
        (value) => (value != null),
        "Please select an option."
    );

    const [white, setWhite] = useFormField(
        { value: null, valid : true, message : ""},
        (value) => (value != null),
        "Please select an option."
    );

    const [hispanicLatino, setHispanicLatino] = useFormField(
        { value: null, valid : true, message : ""},
        (value) => (value != null),
        "Please select an option."
    );

    const [veteran, setVeteran] = useFormField(
        { value: null, valid : true, message : ""},
        (value) => (value != null),
        "Please select an option."
    );

    const [livingArrangement, setLivingArrangement] = useFormField(
        { value: null, valid : true, message : ""},
        (value) => (value != null),
        "Please select an option."
    );

    return (

        <PersistentDrawerLeft>

            <Mutation mutation={CREATE_INDIVIDUAL_CHARACTERISTICS}
                onCompleted={(data) => { }}>

                {(createIndividualCharacteristics, { loading, error, data }) => (

                    <form onSubmit={e => {
                        e.preventDefault();
                        createIndividualCharacteristics({
                            variables: {

                            }
                        });
                    }
                    }>

                        { page === 1 && 

                            <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="flex-start"
                            >

                                <FormControl component="fieldset"
                                error={!sex.valid}
                                required={true}>

                                    <FormLabel component="legend">What is the applicant's sex?</FormLabel>

                                    <RadioGroup
                                    aria-label="sex"
                                    name="sex"
                                    value={sex.value}
                                    onChange={ e => setSex(e.target.value)}
                                    onBlur={ e => setSex(e.target.value)}
                                    
                                    >

                                        {Options.SexOptions.map(option => (
                                        <FormControlLabel value={option.value} control={<Radio />} label={option.label}/>
                                        ))}

                                    </RadioGroup>

                                </FormControl>

                                <Typography><br />An American Indian or Alaska Native is a person having origins in any of the original peoples of North and South America (including Central America), and who maintains a tribal affiliation or community attachment.</Typography>

                                <FormControl component="fieldset"
                                error={!americanIndian.valid}
                                required={true}>

                                    <FormLabel component="legend">Do you identify as an American Indian or Alaska Native?</FormLabel>

                                    <RadioGroup
                                    aria-label="americanIndian"
                                    name="americanIndian"
                                    value={americanIndian.value}
                                    onChange={ e => setAmericanIndian(e.target.value)}
                                    onBlur={ e => setAmericanIndian(e.target.value)}
                                    
                                    >

                                        {Options.AmericanIndianOrAlaskaNativeOptions.map(option => (
                                        <FormControlLabel value={option.value} control={<Radio />} label={option.label}/>
                                        ))}

                                    </RadioGroup>

                                </FormControl>

                                <Typography><br />Asian is defined as an individual having origins in any of the original peoples of the Far East, Southeast Asia, or the Indian subcontinent, including for example, Cambodia, China, India, Japan, Korea, Malaysia, Pakistan, the Philippine Islands, Thailand, and Vietnam.</Typography>

                                <FormControl component="fieldset"
                                error={!asian.valid}
                                required={true}>

                                    <FormLabel component="legend">Do you identify as an Asian?</FormLabel>

                                    <RadioGroup
                                    aria-label="asian"
                                    name="asian"
                                    value={asian.value}
                                    onChange={ e => setAsian(e.target.value)}
                                    onBlur={ e => setAsian(e.target.value)}
                                    
                                    >

                                        {Options.AsianOptions.map(option => (
                                        <FormControlLabel value={option.value} control={<Radio />} label={option.label}/>
                                        ))}

                                    </RadioGroup>

                                </FormControl>

                                <Button 
                                variant="contained" color="primary" onClick={() => setPage(2)}
                                >Next</Button>

                            </Grid>
                        }

                        {page == 2 &&

                            <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="flex-start"
                            >

                                <Typography><br />Black or African American is defined as an individual having origins in any of the Black racial groups of Africa.</Typography>

                                <FormControl component="fieldset"
                                error={!blackAfricanAmerican.valid}
                                required={true}>

                                    <FormLabel component="legend">Do you identify as Black or African American?</FormLabel>

                                    <RadioGroup
                                    aria-label="blackAfricanAmerican"
                                    name="blackAfricanAmerican"
                                    value={blackAfricanAmerican.value}
                                    onChange={ e => setBlackAfricanAmerican(e.target.value)}
                                    onBlur={ e => setBlackAfricanAmerican(e.target.value)}
                                    
                                    >

                                        {Options.BlackOrAfricanAmericanOptions.map(option => (
                                        <FormControlLabel value={option.value} control={<Radio />} label={option.label}/>
                                        ))}

                                    </RadioGroup>

                                </FormControl>

                                <Typography><br />A Native Hawaiian or Pacific Islander is defined as an individual having origins in any of the original peoples of Hawaii, Guam, Samoa, or other Pacific Islands.</Typography>

                                <FormControl component="fieldset"
                                error={!blackAfricanAmerican.valid}
                                required={true}>

                                    <FormLabel component="legend">Do you identify as a Native Hawaiian or Pacific Islander?</FormLabel>

                                    <RadioGroup
                                    aria-label="nativeHawaiian"
                                    name="nativeHawaiian"
                                    value={nativeHawaiian.value}
                                    onChange={ e => setNativeHawaiian(e.target.value)}
                                    onBlur={ e => setNativeHawaiian(e.target.value)}
                                    
                                    >

                                        {Options.NativeHawaiianOrOtherPacificIslanderOptions.map(option => (
                                        <FormControlLabel value={option.value} control={<Radio />} label={option.label}/>
                                        ))}

                                    </RadioGroup>

                                </FormControl>

                                <Typography><br />White is defined as an individual having origins in any of the original peoples of Europe, the Middle East or North Africa.</Typography>

                                <FormControl component="fieldset"
                                error={!blackAfricanAmerican.valid}
                                required={true}>

                                    <FormLabel component="legend">Do you identify as White?</FormLabel>

                                    <RadioGroup
                                    aria-label="white"
                                    name="white"
                                    value={white.value}
                                    onChange={ e => setWhite(e.target.value)}
                                    onBlur={ e => setWhite(e.target.value)}
                                    
                                    >

                                        {Options.WhiteOptions.map(option => (
                                        <FormControlLabel value={option.value} control={<Radio />} label={option.label}/>
                                        ))}

                                    </RadioGroup>

                                </FormControl>

                                <div>

                                    <Button variant="contained" color="primary" onClick={() => setPage(1)}>Back</Button>

                                    <br /> <br />

                                    <Button variant="contained" color="primary" onClick={() => setPage(3)}>Next</Button>

                                </div>

                                

                            </Grid>

                        }

                        {page == 3 &&
                        
                            <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="flex-start"
                            >

                                <Typography><br />Individuals who identify as Hispanic (an individual of Cuban, Mexican, Puerto Rican, South or Central American, or other Spanish culture or origin, regardless of race) may belong to any race group.</Typography>

                                <FormControl component="fieldset"
                                error={!hispanicLatino.valid}
                                required={true}>

                                    <FormLabel component="legend">Do you identify as Hispanic or Latino?</FormLabel>

                                    <RadioGroup
                                    aria-label="hispanicLatino"
                                    name="hispanicLatino"
                                    value={hispanicLatino.value}
                                    onChange={ e => setHispanicLatino(e.target.value)}
                                    onBlur={ e => setHispanicLatino(e.target.value)}
                                    
                                    >

                                        {Options.HispanicOptions.map(option => (
                                        <FormControlLabel value={option.value} control={<Radio />} label={option.label}/>
                                        ))}

                                    </RadioGroup>

                                </FormControl>

                                <Typography><br />A veteran is defined as an individual who served in the active military, navel or air service, and was discharged or released under conditions other than dishonorable.</Typography>

                                <FormControl component="fieldset"
                                error={!veteran.valid}
                                required={true}>

                                    <FormLabel component="legend">Do you identify as a Veteran?</FormLabel>

                                    <RadioGroup
                                    aria-label="veteran"
                                    name="veteran"
                                    value={veteran.value}
                                    onChange={ e => setVeteran(e.target.value)}
                                    onBlur={ e => setVeteran(e.target.value)}
                                    
                                    >

                                        {Options.VeteranOptions.map(option => (
                                        <FormControlLabel value={option.value} control={<Radio />} label={option.label}/>
                                        ))}

                                    </RadioGroup>

                                </FormControl>

                                <div>

                                    <Button variant="contained" color="primary" onClick={() => setPage(2)}>Back</Button>

                                    <br /> <br />

                                    <Button variant="contained" color="primary" onClick={() => setPage(4)}>Next</Button>

                                </div>

                            </Grid>
                        
                        }

                        { page == 4 && 
                        
                            <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="flex-start"
                            >

                                <Typography><br />Record your living arrangements, either temporarily or permanently, at application,using the following code values.</Typography>

                                <FormControl component="fieldset"
                                error={!livingArrangement.valid}
                                required={true}>

                                    <FormLabel component="legend">Record your living arrangements, either temporarily or permanently, at application,using the following code values?</FormLabel>

                                    <RadioGroup
                                    aria-label="livingArrangement"
                                    name="livingArrangement"
                                    value={livingArrangement.value}
                                    onChange={ e => setLivingArrangement(e.target.value)}
                                    onBlur={ e => setLivingArrangement(e.target.value)}
                                    
                                    >

                                        {Options.LivingArrangementOptions.map(option => (
                                        <FormControlLabel value={option.value} control={<Radio />} label={option.label}/>
                                        ))}

                                    </RadioGroup>

                                </FormControl>

                                <div>

                                    <Button variant="contained" color="primary" onClick={() => setPage(2)}>Back</Button>

                                    <br /> <br />

                                    <Button variant="contained" color="primary" type="submit">Submit</Button>

                                </div>

                            </Grid>
                        
                        }

                    </form>)}
                
            </Mutation>

            </PersistentDrawerLeft>

    );

}

export default withStyles(styles)(IndividualCharacteristics);