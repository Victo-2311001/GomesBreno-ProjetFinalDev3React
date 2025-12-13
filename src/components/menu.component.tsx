import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { LoginContext } from "../contexts/login.context";

export default function Menu() {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <>
      <AppBar  position="static" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", backgroundImage: "linear-gradient(to right, red, black, red, black)"}}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
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
                Déconnecter
              </Button>
            ) : (
              <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  sx={{ textTransform: "none", fontSize: "1rem" }}
                >
                  Connecter
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
