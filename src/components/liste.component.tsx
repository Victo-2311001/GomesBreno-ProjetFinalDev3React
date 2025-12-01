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
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Liste() {
  const [nombreFavoris, setNombreFavoris] = useState(0);
  const { favoris, setFavorisOuvert } = useContext(CombattantContext);
  const [listeCombattants, setListeCombattants] = useState<ICombattant[]>([]);

  useEffect(() => {
    setNombreFavoris(favoris.length);
  }, [favoris]);

  useEffect(() => {
    axios.get('https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/combattants/all').then((response) => {
        setListeCombattants(response.data.combattants);
      })
  }, []);

  const toggleFavoris = async (event: React.MouseEvent) => {
    event.preventDefault();
    setFavorisOuvert(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundImage: "linear-gradient(to bottom, black, red, black)" }}>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Liste des combattants
          </Typography>
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
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={combattant.id}>
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