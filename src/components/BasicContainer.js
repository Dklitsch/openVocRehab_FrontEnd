import React from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles';
import './two-column-grid.css';
import standard_inline from './standard_inline'

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