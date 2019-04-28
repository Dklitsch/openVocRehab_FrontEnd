import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import './two-column-grid.css';
import standard_inline from './standard_inline'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const styles = standard_inline

function BasicContainer(props) {

        const { classes } = props;

        return (
                
    <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            >
            <Paper className={classes.paper}> 

            {props.children}
            </Paper>
    </Grid>
            )
    }

export default withStyles(styles)(BasicContainer);