import { AppBar, Toolbar, Button, Box, Typography, IconButton } from "@mui/material";
import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { LoginContext } from "../contexts/login.context";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Menu() {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <>
      <AppBar  position="static" elevation={0}>
        <Toolbar sx={{
            backgroundImage: "linear-gradient(to right, red, black, red, black)",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, 
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            py: 1
          }}
        >
          <Typography variant="h6" 
          sx={{
              fontWeight: "bold",
              textAlign: { xs: "center", sm: "left" },
              width: { xs: "100%", sm: "auto" }
            }}
          >
            COMBATTANTS MMA
          </Typography>
  
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/"
              sx={{ textTransform: "none", fontSize: "1rem" }}
            >
              Page principale
            </Button>

            <Button 
              color="inherit" 
              component={Link} 
              to="/listeTous"
              sx={{ textTransform: "none", fontSize: "1rem" }}
            >
              Liste combattants
            </Button>

            {isLoggedIn ? (
              <Button 
                color="inherit" 
                component={Link} 
                to="/ajout"
                sx={{ textTransform: "none", fontSize: "1rem" }}
                >
                  Ajouter combattant
              </Button>
            ) : (
                <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                sx={{ textTransform: "none", fontSize: "1rem" }}
                >
                  Ajouter combattant
              </Button>
            )}
            

            {isLoggedIn ? (
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                sx={{ textTransform: "none", fontSize: "1rem" }}
              >
                <IconButton sx={{color: "red"}}>
                  <LogoutIcon />
                </IconButton>
              </Button>
            ) : (
              <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  sx={{ textTransform: "none", fontSize: "1rem" }}
                >
                  <IconButton sx={{color: "green"}}>
                    <LoginIcon />
                  </IconButton>
              </Button>
            )}
            
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
        <Outlet />
      </Box>
    </>
  );    
}
//Inspiration de IA pour l'apparence
