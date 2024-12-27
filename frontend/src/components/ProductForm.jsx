
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { createProduct, updateProduct } from '../redux/productSlice';

const ProductForm = ({ productToEdit }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  
  if (productToEdit && !isEdit) {
    setValue('titre', productToEdit.titre);
    setValue('prix', productToEdit.prix);
    setValue('description', productToEdit.description);
    setIsEdit(true);
  }

  const onSubmit = (data) => {
    if (productToEdit) {
      dispatch(updateProduct({ ...data, id: productToEdit.id }));
      toast.success('Produit modifié avec succès');
    } else {
      dispatch(createProduct(data));
      toast.success('Produit ajouté avec succès');
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <input {...register('titre')} placeholder="Titre" required />
      <input {...register('prix')} placeholder="Prix" type="number" required />
      <textarea {...register('description')} placeholder="Description" required />
      <button type="submit" >{isEdit ? 'Modifier' : 'Ajouter'}</button>
    </form>
  );
};

export default ProductForm;
