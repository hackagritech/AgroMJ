import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

const Card = ({ actionComponent, children, title }) => {
  return (
    <Paper style={{ padding: 20 }}>
      <Grid container justify="space-between" spacing={2}>
        <Grid item>
          <Typography variant="h6">
            {title}
          </Typography>
        </Grid>
        {
          actionComponent && (
            <Grid item>
              {actionComponent}
            </Grid>
          )
        }
      </Grid>
      {children}
    </Paper>
  );
}

export default Card;
