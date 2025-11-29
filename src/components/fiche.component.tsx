import { useContext } from 'react';
import { CombattantContext } from '../contexts/favoris.context';
import type { ICombattant } from '../models/icombattant.model';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material';

interface IFiche {
  combattant: ICombattant;
  enFavoris: boolean;
}

export default function Fiche(props: IFiche) {
  const { favoris, setFavoris, setFavorisOuvert } = useContext(CombattantContext);

  const ajouterAuxFavoris = () => {
    const nouvelles = [
      ...favoris,
      {
        id: props.combattant.id,
        nom: props.combattant.nom,
        prenom: props.combattant.prenom,
        urlImage: props.combattant.urlImage,
      },
    ];
    setFavoris(nouvelles);
    setFavorisOuvert(true);
  };

  const retirerDesFavoris = () => {
    const nouvelles = favoris.filter((f) => f.id !== props.combattant.id);
    setFavoris(nouvelles);
  };


  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      {(props.combattant as any).urlImage && (
        <CardMedia
          component="img"
          height="192"
          image={(props.combattant as any).urlImage}
          alt={`${props.combattant.prenom} ${props.combattant.nom}`}
          sx={{ objectFit: 'cover', bgcolor: 'grey.200' }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom fontWeight="semibold">
          {props.combattant.prenom} {props.combattant.nom}
        </Typography>

        {props.combattant.surnom && (
          <Typography
            variant="body2"
            color="text.secondary"
            fontStyle="italic"
            gutterBottom
          >
            "{props.combattant.surnom}"
          </Typography>
        )}

        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" fontWeight="medium">Nationalité:</Box>{' '}
            {props.combattant.nationalite}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" fontWeight="medium">Catégorie:</Box>{' '}
            {props.combattant.categorie}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" fontWeight="medium">Âge:</Box>{' '}
            {props.combattant.age} ans
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <Typography variant="body2" fontWeight="medium" color="success.main">
              W: {props.combattant.victoires}
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              -
            </Typography>
            <Typography variant="body2" fontWeight="medium" color="error.main">
              L: {props.combattant.defaites}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        {!props.enFavoris ? (
          <Button
            fullWidth
            variant="contained"
            onClick={ajouterAuxFavoris}
          >
            Ajouter aux favoris
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={retirerDesFavoris}
          >
            Retirer des favoris
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

//Inspiré de https://web3.profinfo.ca/react4/ ET https://codesandbox.io/p/sandbox/github/jaixan/developpementweb3/tree/main/code/chapeaux?file=%2Fsrc%2Fcomponents%2Fpanier.component.tsx%3A13%2C26
//Quelques modifications ont été apportées par l'IA pour améliorer seulement la visualisation de la page.