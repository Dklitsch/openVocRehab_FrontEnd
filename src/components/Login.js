import React from 'react';
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

const styles = standard_inline

function Login(props) {
    
    const { classes } = props;

    return (

            <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="center"
                    >
        
        <Paper className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <FormControl margin="normal">
                <InputLabel htmlFor="text">Username</InputLabel>
                <Input id="username" name="username" autoComplete="email" autoFocus />
                </FormControl>

                <FormControl margin="normal">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" name="password" autoComplete="current-password" autoFocus />
                </FormControl>

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

            </Grid>

        
    );

}

export default withStyles(styles)(Login);