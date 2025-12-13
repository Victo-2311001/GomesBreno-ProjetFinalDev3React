import React, { useState, useEffect, useContext } from 'react';
import Fiche from './fiche.component';
import { CombattantContext } from '../contexts/favoris.context';
import Favoris from './favoris.component';
import type { ICombattant } from '../models/icombattant.model';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Container,
  Grid,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Liste() {
  const [nombreFavoris, setNombreFavoris] = useState(0);
  const { favoris, setFavorisOuvert } = useContext(CombattantContext);
  const [listeCombattants, setListeCombattants] = useState<ICombattant[]>([]);

  const [filtreNationalite, setFiltreNationalite] = useState<string>("Aucune");
    
  const [filtreCategorie, setFiltreCategorie] = useState<string>("Aucune");

  const [filtreTechnique, setFiltreTechnique] = useState<string>("Aucune");
  

  useEffect(() => {
    setNombreFavoris(favoris.length);
  }, [favoris]);

  useEffect(() => {
    axios.get('https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/combattants/all').then((response) => {
        setListeCombattants(response.data.combattants);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des combattants:', error);
      });

      setFiltreNationalite("Aucune");
      setFiltreCategorie("Aucune");
      setFiltreTechnique("Aucune");
  }, []);

  useEffect(() => {
    if (filtreNationalite !== "Aucune") {
      axios.get(`https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/combattants/nationalite/${filtreNationalite}`).then((response) => {
      setListeCombattants(response.data.combattants);
      //setFiltreTechnique("Aucune");
      //setFiltreCategorie("Aucune");
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des combattants par nationalité:', error);
    });;
    }else{
      axios.get('https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/combattants/all').then((response) => {
        setListeCombattants(response.data.combattants);
      })
    }
  }, [filtreNationalite]);

  useEffect(() => {
    if (filtreCategorie !== "Aucune") {
      axios.get(`https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/combattants/categorie/${filtreCategorie}`).then((response) => {
      setListeCombattants(response.data.combattants);
      //setFiltreNationalite("Aucune");
      //setFiltreTechnique("Aucune");
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des combattants par catégorie:', error);
    });;
    }else{
      axios.get('https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/combattants/all').then((response) => {
        setListeCombattants(response.data.combattants);
      })
    }
  }, [filtreCategorie]);

  useEffect(() => {
    if (filtreTechnique !== "Aucune") {
      axios.get(`https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/combattants/technique/${filtreTechnique}`).then((response) => {
      setListeCombattants(response.data.combattants);
      //setFiltreNationalite("Aucune");
      //setFiltreCategorie("Aucune");
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des combattants par technique:', error);
    });;
    }else{
      axios.get('https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/combattants/all').then((response) => {
        setListeCombattants(response.data.combattants);
      })
    } 
  }, [filtreTechnique]);

  const toggleFavoris = async (event: React.MouseEvent) => {
    event.preventDefault();
    setFavorisOuvert(true);
  };
 

  return (
    <Box sx={{ minHeight: '100vh', backgroundImage: "linear-gradient(to bottom, black, red, black)" }}>
      <AppBar position="sticky" color = "error" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Liste des combattants
          </Typography>
     
          <InputLabel sx={{mr: 2}}>Catégories</InputLabel>
          <Select
            value={filtreCategorie}
            onChange={(e) => setFiltreCategorie(e.target.value)}
            label="Catégorie"
            sx={{mr: 10}}
          >
            <MenuItem value="Aucune">Aucune</MenuItem>
            <MenuItem value="poids-mouches">Poids-mouches</MenuItem>
            <MenuItem value="poids-coqs">Poids-coqs</MenuItem>
            <MenuItem value="poids-plumes">Poids-plumes</MenuItem>
            <MenuItem value="poids-légers">Poids-légers</MenuItem>
            <MenuItem value="poids-welters">Poids-welters</MenuItem>
            <MenuItem value="poids-mi-moyens">Poids-mi-moyens</MenuItem>
            <MenuItem value="poids-moyens">Poids-moyens</MenuItem>
            <MenuItem value="poids-mi-lourds">Poids-mi-lourds</MenuItem>
            <MenuItem value="poids-lourds">Poids-lourds</MenuItem>
          </Select>

          <InputLabel sx={{mr: 2}}>Techniques</InputLabel>
          <Select
            value={filtreTechnique}
            onChange={(e) => setFiltreTechnique(e.target.value)}
            label="Technique"
            sx={{mr: 10}}
          >
            <MenuItem value="Aucune">Aucune</MenuItem>
            <MenuItem value="Jiu-Jitsu">Jiu-Jitsu</MenuItem>
            <MenuItem value="Lutte">Lutte</MenuItem>
            <MenuItem value="Boxe">Boxe</MenuItem>
            <MenuItem value="Kickboxing">Kickboxing</MenuItem>
          </Select>

          <InputLabel sx={{mr: 2}}>Nationalités</InputLabel>
          <Select
            value={filtreNationalite}
            onChange={(e) => setFiltreNationalite (e.target.value)}
            label="Nationalité"
            sx={{mr: 10}}
          >
            <MenuItem value="Aucune">Aucune</MenuItem>
            <MenuItem value="BR">BRÉSIL (BR)</MenuItem>
            <MenuItem value="CA">CANADA (CA)</MenuItem>
            <MenuItem value="US">États-Unis (US)</MenuItem>
            <MenuItem value="FR">France (FR)</MenuItem>
            <MenuItem value="DE">Allemagne (DE)</MenuItem>
            <MenuItem value="IT">Italie (IT)</MenuItem>
            <MenuItem value="ES">Espagne (ES)</MenuItem>
            <MenuItem value="MX">Mexique (MX)</MenuItem>
            <MenuItem value="CN">Chine (CN)</MenuItem>
            <MenuItem value="IN">Inde (IN)</MenuItem>
            <MenuItem value="JP">Japon (JP)</MenuItem>
            <MenuItem value="RU">Russie (RU)</MenuItem>
            <MenuItem value="GB">Royaume-Uni (GB)</MenuItem>
            <MenuItem value="AU">Australie (AU)</MenuItem>
          </Select>
                    
          <IconButton
            color="inherit"
            onClick={toggleFavoris}
            aria-label="voir favoris"
          >
            <Badge badgeContent={nombreFavoris} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Favoris />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {listeCombattants && listeCombattants.map((combattant) => (
            <Grid size={{ xs: 10, sm: 6, md: 4, lg: 4 }} key={combattant._id}>
              <Fiche combattant={combattant} enFavoris={false} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
//Inspiré de https://web3.profinfo.ca/react4/ ET https://codesandbox.io/p/sandbox/github/jaixan/developpementweb3/tree/main/code/chapeaux?file=%2Fsrc%2Fcomponents%2Fpanier.component.tsx%3A13%2C26
//Quelques modifications ont été apportées par l'IA pour améliorer seulement la visualisation de la page.