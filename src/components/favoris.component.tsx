import { useContext } from 'react';
import { CombattantContext } from '../contexts/favoris.context';

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  CardMedia,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Favoris() {
  const { favoris, favorisOuvert, setFavorisOuvert } = 
    useContext(CombattantContext);

  return (
    <Drawer
      anchor="right"
      open={favorisOuvert}  
      onClose={() => setFavorisOuvert(false)}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 3,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Mes Favoris
          </Typography>
          <IconButton
            onClick={() => setFavorisOuvert(false)}
            sx={{ color: 'text.secondary' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {favoris && favoris.length > 0 ? (
            <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {favoris.map((combattant) => (
                <ListItem
                  key={combattant.id}
                  component={Paper}
                  variant="outlined"
                  sx={{ display: 'block', p: 1.5 }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="medium">
                        {(combattant as any).urlImage && (
                          <CardMedia
                            component="img"
                            height="48"
                            image={(combattant as any).urlImage}
                            sx={{ width: 200, height: 200, objectFit: 'cover', bgcolor: 'grey.200', borderRadius: 1 }}
                          />
                        )}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{fontSize: '10', fontWeight: 'bold'}}>
                        {combattant.prenom} {combattant.nom}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography color="text.secondary">
                Aucun combattant en favoris
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
//Inspiré de https://web3.profinfo.ca/react4/ ET https://codesandbox.io/p/sandbox/github/jaixan/developpementweb3/tree/main/code/chapeaux?file=%2Fsrc%2Fcomponents%2Fpanier.component.tsx%3A13%2C26
//Création de l'architecture du composant favoris avec l'aide de l'IA