import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, Stack, Button, TextField } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 

export default function Inscription() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (data.motDePasse !== data.motDePasseConfirmation) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}`
      );

      if (response.data.length > 0) {
        toast.error("Un compte existe déjà avec cette adresse mail");
      } else {
        await axios.post("http://localhost:5000/utilisateurs", {
          nomUtilisateur: data.nomUtilisateur,
          mailUtilisateur: data.mailUtilisateur,
          motDePasse: data.motDePasse, 
        });

        toast.success("Inscription réussie !");
        navigate("/connexion"); 
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'inscription");
      console.error(error);
    }
  };

  return (
    <Stack alignItems="center" justifyContent="center" width="100%" height="100vh">
      <Box width={500} sx={{ bgcolor: "blanchedalmond", padding: 3 }}>
        <Typography variant="h4" sx={{textAlign:'center'}}>Inscription</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" gap={2}>
            <TextField
              label="Veuillez saisir un nom"
              variant="outlined"
              fullWidth
              {...register("nomUtilisateur", {
                required: "Veuillez saisir un nom",
                minLength: {
                  value: 5,
                  message: "Le nom doit contenir au moins 5 caractères",
                },
              })}
              error={!!errors.nomUtilisateur}
              helperText={errors.nomUtilisateur?.message}
            />
            <TextField
              label="Veuillez saisir votre mail"
              variant="outlined"
              fullWidth
              {...register("mailUtilisateur", {
                required: "Veuillez entrer votre mail",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Veuillez entrer une adresse mail valide",
                },
              })}
              error={!!errors.mailUtilisateur}
              helperText={errors.mailUtilisateur?.message}
            />
            <TextField
              label="Veuillez choisir un mot de passe"
              variant="outlined"
              fullWidth
              type="password"
              {...register("motDePasse", {
                required: "Veuillez saisir un mot de passe",
                minLength: {
                  value: 6,
                  message: "Le mot de passe doit contenir au moins 6 caractères",
                },
              })}
              error={!!errors.motDePasse}
              helperText={errors.motDePasse?.message}
            />
            <TextField
              label="Veuillez confirmer le mot de passe"
              variant="outlined"
              fullWidth
              type="password"
              {...register("motDePasseConfirmation", {
                required: "Veuillez confirmer votre mot de passe",
                minLength: {
                  value: 6,
                  message: "La confirmation doit contenir au moins 6 caractères",
                },
              })}
              error={!!errors.motDePasseConfirmation}
              helperText={errors.motDePasseConfirmation?.message}
            />
          </Stack>
          <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
            INSCRIPTION
          </Button>
        </form>
      </Box>
    </Stack>
  );
}
