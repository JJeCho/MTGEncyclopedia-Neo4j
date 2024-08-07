import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Global.module.css';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar className={styles.nav}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MTG Lore Encyclopedia
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/graph">Graph Visualization</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
