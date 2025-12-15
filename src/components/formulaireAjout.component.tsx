import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Autocomplete
} from '@mui/material';
import type { ICombattant, IMatchesRecents } from "../models/icombattant.model";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FormulaireAjout() {

  //Champs pour le combattant
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [surnom, setSurnom] = useState('');
  const [age, setAge] = useState('');
  const [nationalite, setNationalite] = useState('');
  const [categorie, setCategorie] = useState('');
  const [victoire, setVictoire] = useState('');
  const [defaites, setDefaites] = useState('');
  const [ufcChampion, setUfcChampion] = useState(false);
  const [techniqueFavorite, setTechniqueFavorite] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const [matchRecents, setMatchRecents] = useState<IMatchesRecents[]>([]);

  //Validation des champs
  const [nomValide, setNomValide] = useState<boolean | null>(null);
  const [prenomValide, setPrenomValide] = useState<boolean | null>(null);
  const [ageValide, setAgeValide] = useState<boolean | null>(null);
  const [nationaliteValide, setNationaliteValide] = useState<boolean | null>(null);
  const [categorieValide, setCategorieValide] = useState<boolean | null>(null);
  const [techniqueFavoriteValide, setTechniqueFavoriteValide] = useState<boolean | null>(null);
  const [matchRecentsValide, setMatchRecentsValide] = useState<boolean | null>(null);

  //Messages d'erreurs
  const [erreursValidationNom, setErreursValidationNom] = useState<string[]>([]);
  const [erreursValidationPrenom, setErreursValidationPrenom] = useState<string[]>([]);
  const [erreursValidationAge, setErreursValidationAge] = useState<string[]>([]);
  const [erreursValidationNationalite, setErreursValidationNationalite] = useState<string[]>([]);
  const [erreursValidationMatchRecents, setErreursValidationMatchRecents] = useState<string[]>([]);

  //Champs pour les matchs 
  const [adversaire, setAdversaire] = useState<ICombattant | null>();
  const [dateMatch, setDateMatch] = useState('');
  const [resultat, setResultat] = useState('');

  const navigate = useNavigate();

  const [listeCombattants, setListeCombattants] = useState<ICombattant[]>([]);

  //Source pour la liste qui appele les résultats de l'api:
  //https://stackoverflow.com/questions/71545423/react-autocomplete-calling-api
  useEffect(() => {
    axios.get('https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/combattants/all')
      .then((response) => {
        setListeCombattants(response.data.combattants);
      })
      .catch((error) => {
        console.error('Erreur pour la récupération des combattants:', error);
      });
  }, []);
 
  const validerNom = () => {
    let valide = true;
    let messageErreur: string[] = [];

    if (nom.length > 100) {
      valide = false;
      messageErreur.push('Le nom ne peut pas dépasser 100 caractères.');
    } else if (nom.length < 1) {
      valide = false;
      messageErreur.push('Le nom ne peut pas être null.');
    }
    setNomValide(valide);
    setErreursValidationNom(messageErreur);

    return valide;
  };

  const validerPrenom = () => {
    let valide = true;
    let messageErreur: string[] = [];
    if (prenom.length > 100) {
      valide = false;
      messageErreur.push('Le prénom ne peut pas dépasser 100 caractères.');
    } else if (prenom.length < 1) {
      valide = false;
      messageErreur.push('Le prénom ne peut pas être null.');
    }
    setPrenomValide(valide);
    setErreursValidationPrenom(messageErreur);
    return valide;
  };

  const validerAge = () => {
    let valide = true;
    let messageErreur: string[] = [];
    const ageNum = parseInt(age);
    if (age.length < 1) {
      valide = false;
      messageErreur.push('L\'âge est requis.');
    } else if (ageNum < 18) {
      valide = false;
      messageErreur.push('Le combattant doit avoir 18 ans ou plus.');
    }
    setAgeValide(valide);
    setErreursValidationAge(messageErreur);
    return valide;
  };

  const validerNationalite = () => {
    let valide = true;
    let messageErreur: string[] = [];
    if (nationalite.length < 1) {
      valide = false;
      messageErreur.push('La nationalité est requise.');
    } else if (nationalite.length !== 2) {
      valide = false;
      messageErreur.push('La nationalité doit être écrite au format ISO 3166-1 alpha-2 (\'BR\', \'US\', ...).');
    }
    setNationaliteValide(valide);
    setErreursValidationNationalite(messageErreur);
    return valide;
  };

  const validerCategorie = () => {
    let valide = true;
    if (categorie.length < 1) {
      valide = false;
    }
    setCategorieValide(valide);
    return valide;
  };

  const validerTechniqueFavorite = () => {
    let valide = true;
    if (techniqueFavorite.length < 1) {
      valide = false;
    }
    setTechniqueFavoriteValide(valide);
    return valide;
  };

  const validerMatchRecents = () => {
    let valide = true;
    let messageErreur: string[] = [];
    if (matchRecents.length < 1) {
      valide = false;
      messageErreur.push('Au moins un match récent est requis.');
    }
    setMatchRecentsValide(valide);
    setErreursValidationMatchRecents(messageErreur);
    return valide;
  };

  const ajouterMatch = () => {
    if (!adversaire || dateMatch.length < 1 || resultat.length < 1) {
      alert('Tous les champs du match sont requis');
      return;
    }

    const nouveauMatch: IMatchesRecents = {
      adversaire: `${adversaire.prenom} ${adversaire.nom}`,
      date: new Date(dateMatch),
      resultat: resultat,
    };

    setMatchRecents([...matchRecents, nouveauMatch]);

    setAdversaire(null);
    setDateMatch('');
    setResultat('');
  };

  const supprimerMatch = (index: number) => {
    //Aide de l'IA pour régler problème
    const nouveauxMatchs = matchRecents.filter((_, i) => i != index);
    setMatchRecents(nouveauxMatchs);
  };

  const ajouterCombattant = async () => {
    try {
      let nomOk = validerNom();
      let prenomOk = validerPrenom();
      let ageOk = validerAge();
      let nationaliteOk = validerNationalite();
      let categorieOk = validerCategorie();
      let techniqueOk = validerTechniqueFavorite();
      let matchsOk = validerMatchRecents();

      if (nomOk && prenomOk && ageOk && nationaliteOk && categorieOk && techniqueOk && matchsOk) {

        const matchsFormates = matchRecents.map((match) => ({
          adversaire: match.adversaire,
          resultat: match.resultat,
          date: new Date(match.date).toISOString()
        }));
        const nouveauCombattant = {
          nom,
          prenom,
          surnom,
          age: Number(age),
          nationalite,
          categorie,
          victoire: Number(victoire),
          defaites: Number(defaites),
          ufcChampion,
          techniqueFavorite: [techniqueFavorite],
          urlImage,
          matchRecents: matchsFormates
        };
        
        await axios.post(
        'https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/combattants/add',
        { combattant: nouveauCombattant }
        );

        alert("Le combattant a été ajouté avec succès !");
        navigate('/listeTous')
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout du combattant.");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold",  color: "red" }}>
        Formulaire d'ajout de combattant
      </Typography>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Informations générales</Typography>

        <Box sx={{ display: "grid", gap: 2 }}>

          <Typography>NOM*</Typography>
          <TextField
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            onBlur={validerNom}
            slotProps={{ htmlInput: { maxLength: 100 } }}
            placeholder="Nom"
            fullWidth
          />
          {nomValide !== null && !nomValide && (
            <Typography sx={{ color: 'red' }}>{erreursValidationNom}</Typography>
          )}

          <Typography>PRÉNOM*</Typography>
          <TextField
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            onBlur={validerPrenom}
            slotProps={{ htmlInput: { maxLength: 100 } }}
            placeholder="Prénom"
            fullWidth
          />
          {prenomValide !== null && !prenomValide && (
            <Typography sx={{ color: 'red' }}>{erreursValidationPrenom}</Typography>
          )}

          <Typography>SURNOM</Typography>
          <TextField
            value={surnom}
            onChange={(e) => setSurnom(e.target.value)}
            slotProps={{ htmlInput: { maxLength: 100 } }}
            placeholder="Surnom"
            fullWidth
          />

          <Typography>ÂGE*</Typography>
          <TextField
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onBlur={validerAge}
            placeholder="Âge"
            fullWidth
          />
          {ageValide !== null && !ageValide && (
            <Typography sx={{ color: 'red' }}>{erreursValidationAge}</Typography>
          )}

          <Typography>NATIONALITÉ*</Typography>
          <TextField
            value={nationalite}
            onChange={(e) => setNationalite(e.target.value)}
            onBlur={validerNationalite}
            slotProps={{ htmlInput: { maxLength: 2 } }}
            placeholder="Nationalité ('BR', 'CA', 'US', ...)"
            fullWidth
          />
          {nationaliteValide !== null && !nationaliteValide && (
            <Typography sx={{ color: 'red' }}>{erreursValidationNationalite}</Typography>
          )}

          <Typography>CATÉGORIE*</Typography>
          <FormControl fullWidth>
            <InputLabel>Catégorie</InputLabel>
            <Select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              onBlur={validerCategorie}
              label="Catégorie"
            >
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
          </FormControl>
          {categorieValide !== null && !categorieValide && (
            <Typography sx={{ color: 'red' }}>La catégorie est requise.</Typography>
          )}

          <Typography>TECHNIQUE*</Typography>
          <FormControl fullWidth>
            <InputLabel>Technique</InputLabel>
            <Select
              value={techniqueFavorite}
              onChange={(e) => setTechniqueFavorite(e.target.value)}
              onBlur={validerTechniqueFavorite}
              label="Technique"
            >
              <MenuItem value="Jiu-Jitsu">Jiu-Jitsu</MenuItem>
              <MenuItem value="Lutte">Lutte</MenuItem>
              <MenuItem value="Boxe">Boxe</MenuItem>
              <MenuItem value="Kickboxing">Kickboxing</MenuItem>
            </Select>
          </FormControl>
          {techniqueFavoriteValide !== null && !techniqueFavoriteValide && (
            <Typography sx={{ color: 'red' }}>La technique est requise.</Typography>
          )}

          <Typography>VICTOIRES</Typography>
          <TextField
            type="number"
            value={victoire}
            onChange={(e) => setVictoire(e.target.value)}
            placeholder="Victoires"
            fullWidth
          />

          <Typography>DÉFAITES</Typography>
          <TextField
            type="number"
            value={defaites}
            onChange={(e) => setDefaites(e.target.value)}
            placeholder="Défaites"
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={ufcChampion}
                onChange={(e) => setUfcChampion(e.target.checked)}
              />
            }
            label="Champion UFC"
          />

          <Typography>URL DE L'IMAGE</Typography>
          <TextField
            value={urlImage}
            onChange={(e) => setUrlImage(e.target.value)}
            placeholder="URL de l'image"
            fullWidth
          />
        </Box>
      </Paper>
   
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Ajouter un match récent</Typography>

        <Box sx={{ display: "grid", gap: 2 }}>
          <Typography>NOM ADVERSAIRE*</Typography>
          <Autocomplete
            options={listeCombattants}
            getOptionLabel={(option) => `${option.prenom} ${option.nom}`}
            value={adversaire}
            onChange={(_, adversaireSelectionne) => setAdversaire(adversaireSelectionne)}
            renderInput={(params) => (
              <TextField {...params} label="Adversaire" />
            )}
          />

            
          <Typography>DATE MATCH*</Typography>  
          <TextField
            type="date"
            value={dateMatch}
            onChange={(e) => setDateMatch(e.target.value)}
            fullWidth
          />

          <Typography>RÉSULTAT*</Typography>
          <FormControl fullWidth>
            <InputLabel>Résultat</InputLabel>
            <Select
              value={resultat}
              onChange={(e) => setResultat(e.target.value)}
              label="Résultat"
            >
              <MenuItem value="victoire">Victoire</MenuItem>
              <MenuItem value="defaite">Défaite</MenuItem>
              <MenuItem value="nul">Null</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={ajouterMatch} sx={{ color: "white", fontWeight: "bold", backgroundColor: "black", "&:hover": { backgroundColor: "grey" }}}>
            Ajouter match
          </Button>
        </Box>
      </Paper>

      {matchRecents.length > 0 && (
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 2 }}>
          <Typography variant="h6">
            Matchs récents ({matchRecents.length})
          </Typography>

          {matchRecents.map((match, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
                p: 2,
                borderRadius: 2,
                border: "1px solid #ddd",
                bgcolor: "#fafafa"
              }}
            >
              <Typography>
                vs {match.adversaire} — {match.date.toISOString().split("T")[0]} — {match.resultat}
              </Typography>

              <IconButton onClick={() => supprimerMatch(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Paper>
      )}

      {matchRecentsValide !== null && !matchRecentsValide && (
        <Typography sx={{ color: 'red', mb: 2 }}>
          {erreursValidationMatchRecents}
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={ajouterCombattant}
        sx={{ width: "100%", py: 1.5, color: "white", fontWeight: "bold", backgroundColor: "black", "&:hover": { backgroundColor: "grey" } }}
      >
        Ajouter le combattant
      </Button>
    </Box>
  );
}
//
//Inspiré de: https://apical.xyz/fiches/formulaire_react_native/la_validation
//Exercice d'un formulaire d'ajout dans le cours de AppMobile2
//Quelques modifications ont été apportées par l'IA pour améliorer seulement la visualisation de la page.