import { TextField, Button, Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { LoginContext } from '../contexts/login.context';
import { useNavigate } from "react-router-dom";

export default function Login(){

    const { isLoggedIn, login, logout } = useContext(LoginContext);

    const [email, setEmail] = useState('');
    const [mdp, setMdp] = useState('');
    const [erreur, setErreur] = useState('');
    const navigate = useNavigate();

    async function performLogin() {
    await login(email, mdp)
      .then((reussi) => {
        if (reussi) {
          setErreur('');
          navigate('/');
        }
      })
      .catch(() => setErreur('Login incorrect'));
    }

    async function performLogout() {
        await logout();
        navigate('/');
    }

     return (
        <Box
            sx={{
                height: "100vh",           
                display: "flex",
                justifyContent: "center",
                alignItems: "center",  
                p: 2,  
                backgroundImage: "linear-gradient(to right, red, black, black, red)"
            }}
        >
            {isLoggedIn ? (
            <Box
                component="form"
                sx={{
                    width: { xs: "100%", sm: "400px", md: "450px" },
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 3,
                    bgcolor: "white",
                    borderRadius: 2,
                    boxShadow: 3
                }}
            >
                <Typography sx={{display: "flex", justifyContent: "center", fontSize: "5vh", color: "red"}}>
                    Déconnexion
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                     sx={{
                        backgroundColor: "black",
                        color: "red",
                        "&:hover": { backgroundColor: "red", color: "white" },
                        mt: 2
                    }}
                    fullWidth
                    onClick={() => performLogout()}
                >
                    Se déconnecter
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ textTransform: "none", fontWeight: "bold", backgroundColor: "white", color:"black" }}
                    onClick={() => navigate('/')}
                >
                    Rester connecté
                </Button>
            </Box>
            ) : (
            <Box
                component="form"
                sx={{
                    width: { xs: "100%", sm: "400px", md: "450px" },
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 3,
                    bgcolor: "white",
                    borderRadius: 2,
                    boxShadow: 3
                }}
            >
                <Typography sx={{display: "flex", justifyContent: "center", fontSize: "7vh", color: "red"}}>
                    Connexion
                </Typography>

                <TextField
                    label="Adresse e-mail"
                    type="email"
                    variant="outlined"
                    fullWidth
                    sx={{ backgroundColor: "white"}}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Mot de passe"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{ backgroundColor: "white" }}
                    value={mdp}
                    onChange={(e) => setMdp(e.target.value)}
                />

                {erreur && (
                    <Typography sx={{ color: 'red', textAlign: 'center' }}>
                        {erreur}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ textTransform: "none", fontWeight: "bold", backgroundColor: "black" }}
                    onClick={() => performLogin()}
                >
                    Se connecter
                </Button>
            </Box>
            )}
        </Box>
    );
}