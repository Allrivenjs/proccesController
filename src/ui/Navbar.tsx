import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';

import { MenuOutlined } from '@mui/icons-material';

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/*
          *<IconButton
          *  size="large"
          *  edge="start"
          *  color="inherit"
          *  aria-label="menu"
          *  sx={{ mr: 2 }}
          *>
          *  <MenuOutlined />
          *</IconButton>
          */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
<<<<<<< HEAD
          O.S - Laboratorio de procesos
=======
          Catalog group
>>>>>>> a709cd12b13c08eb3459de905676b0245c1e3c7a
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
