import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import './two-column-grid.css';
import standard_inline from './standard_inline'
import { AppBar } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const styles = standard_inline

function OvrAppBar(props) {

    const { classes } = props;

    const [signedIn, setSignedIn] = useState(true);

    function signOut()
    {

        localStorage.setItem('token', null);
        setSignedIn(false);

    }

    return(

        <AppBar class={classes.AppBar} position="static">

            {!signedIn && <Redirect to="/"></Redirect>}

            <Grid
                container
                direction="row"
                justify="flex-end"
                alignContent="center"
                alignItems="center"
                wrap="nowrap"
            >

                <Button onClick={(e) => signOut()}>
                    <Typography variant="h6" color="inherit" style={{padding : ".5em", color : "white"}}>
                        Sign out
                    </Typography>
                </Button>

            </Grid>

        </AppBar>

    );

}

export default withStyles(styles)(OvrAppBar);