// src/pages/ProductPage.jsx
import React from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/productForm';

const ProductPage = () => (
  <div>
    <h1>Gestion des Produits</h1>
    <ProductForm />
    <ProductList />
  </div>
);

export default ProductPage;