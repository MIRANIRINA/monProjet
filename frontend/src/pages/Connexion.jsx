import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Box, TextField, Stack, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
const Connexion = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  useEffect(() => {
    const user = localStorage.getItem('utilisateur');
    if (user) {
      navigate('/produits'); 
    }
  }, [navigate]);

  const onSubmit = (data) => {
    axios.get(`http://localhost:5000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}&motDePasse=${data.motDePasse}`)
      .then((res) => {
        if (res.data.length > 0) {
          const user = res.data[0]; 
          localStorage.setItem("utilisateur", JSON.stringify(user));
          toast.success("Connexion réussie");

          dispatch(loginSuccess({ user, token: 'fake-token' }));
          navigate('/produits');
        } else {
          toast.error("Les identifiants sont incorrects");
        }
      })
      .catch((err) => {
        console.error(err); 
        toast.error("Une erreur est survenue lors de la connexion");
      });
  };

  return (
    <Stack alignItems="center" justifyContent="center" width="100%" height="100vh" >
      <Box width={500} sx={{ bgcolor: "blanchedalmond", padding: 3 }}>
        <Typography variant='h4' sx={{textAlign:'center'}}>Connexion</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" gap={2}>
            <TextField
              label="Veuillez saisir votre mail"
              variant="outlined"
              fullWidth
              type='email'
              {...register("mailUtilisateur", {
                required: "Veuillez entrer votre mail",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Veuillez entrer une adresse mail valide"
                }
              })}
              error={!!errors.mailUtilisateur}
              helperText={errors.mailUtilisateur?.message}
            />
            <TextField
              label="Veuillez saisir votre mot de passe"
              variant="outlined"
              fullWidth
              type='password'
              {...register("motDePasse", {
                required: "Veuillez saisir un mot de passe",
                minLength: {
                  value: 6,
                  message: "Le mot de passe doit contenir au moins 6 caractères"
                }
              })}
              error={!!errors.motDePasse}
              helperText={errors.motDePasse?.message}
            />
          </Stack>
          <Button variant="contained" type='submit' sx={{ marginTop: 2 }}>
            CONNEXION
          </Button>
        </form>
      </Box>
      <ul style={{textAlign:'center'}}>
        <h4>Voulez-vous créer un compte ?</h4>
        <h4><Link to="/inscription">Cliquez ici</Link></h4>
      </ul>
    </Stack>
  );
};

export default Connexion;
