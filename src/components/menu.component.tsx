import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Outlet, Link } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
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

            <Button 
              color="inherit" 
              component={Link} 
              to="/ajout"
              sx={{ textTransform: "none", fontSize: "1rem" }}
            >
              Ajouter combattant
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </>
  );    
}
//Inspiration de IA pour l'apparence
