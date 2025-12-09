import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ICombattant } from "../models/icombattant.model";
import type { IMatchesRecents } from "../models/icombattant.model";

export default function FormulaireModification() {
  //Champs pour chercher le combattant à modifier
  const {combattantId} = useParams();
  const [combattantAModifier, setCombattantAModifier] = useState<ICombattant | null>();
  
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

  //Messages d'erreurs
  const [erreursValidationNom, setErreursValidationNom] = useState<string[]>([]);
  const [erreursValidationPrenom, setErreursValidationPrenom] = useState<string[]>([]);
  const [erreursValidationAge, setErreursValidationAge] = useState<string[]>([]);
  const [erreursValidationNationalite, setErreursValidationNationalite] = useState<string[]>([]);

  useEffect(() => {
    chercherCombattantAModifier(combattantId as string);
  }, [combattantId]);

  useEffect(() => {
    if (combattantAModifier) {
      initialiserChampsAvecCombattant(combattantAModifier);
    }
  }, [combattantAModifier]);


  async function chercherCombattantAModifier(id: string) {
     if (combattantId) {
      try {
        const response = await axios.get(`https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/combattants/${id}`);
        setCombattantAModifier(response.data.combattant);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération du combattant :", error);
        return null;
      }
    }
    else{
      console.error("Aucun ID de combattant fourni pour la modification.");
    }
  }

  function initialiserChampsAvecCombattant(combattant: ICombattant) {
    setNom(combattant.nom);
    setPrenom(combattant.prenom);
    setSurnom(combattant.surnom);
    setAge(combattant.age.toString());
    setNationalite(combattant.nationalite);
    setCategorie(combattant.categorie);
    setVictoire(combattant.victoire.toString());
    setDefaites(combattant.defaites.toString());
    setUfcChampion(combattant.ufcChampion);
    setTechniqueFavorite(combattant.techniqueFavorite.join(', '));
    setUrlImage(combattant.urlImage || '');
    setMatchRecents(combattant.matchRecents);
  }

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

  const mettreAJourCombattant = async () => {
      try {
        let nomOk = validerNom();
        let prenomOk = validerPrenom();
        let ageOk = validerAge();
        let nationaliteOk = validerNationalite();
        let categorieOk = validerCategorie();
        let techniqueOk = validerTechniqueFavorite();
  
        if (nomOk && prenomOk && ageOk && nationaliteOk && categorieOk && techniqueOk) {
          const combattantAJour = {
            id: combattantAModifier?._id || '',  
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
            matchRecents
          };
          
          await axios.put(
          'https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/combattants/update',
          { combattant: combattantAJour }
          );
  
          alert("Le combattant a été mis à jour avec succès !");
        }
      } catch (error) {
        console.error(error);
        alert("Erreur lors de la mise à jour du combattant.");
      }
    };

  if (!combattantAModifier) {
    return <Typography>Chargement...</Typography>;
  }
 
  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        METTRE À JOUR LE COMBATTANT {combattantAModifier.prenom} {combattantAModifier.nom}
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
      <Button
        variant="contained"
        onClick={mettreAJourCombattant}
        sx={{ width: "100%", py: 1.5, color: "white", fontWeight: "bold", backgroundColor: "black", "&:hover": { backgroundColor: "grey" } }}
      >
        Mettre à jour
      </Button>
    </Box>
  ); 
}