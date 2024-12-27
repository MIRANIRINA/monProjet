import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct } from '../redux/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const [editableProduct, setEditableProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const query = searchQuery.toLowerCase();

      
      return (
        product.titre.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) || 
        product.prix.toString().includes(query)
      );
    });

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (editableProduct) {
      dispatch(updateProduct(editableProduct));
      setEditableProduct(null);  // Ferme le formulaire d'édition après l'update
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div>
      <h2>Liste des produits</h2>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher par titre, description ou prix..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id} >
            {editableProduct && editableProduct.id === product.id ? (
              <div >
                <h3>Modifier le produit</h3>
                <label>
                  Titre :
                  <input
                    type="text"
                    name="titre"
                    value={editableProduct.titre}
                    onChange={handleEditChange}
                  />
                </label>
                <br />
                <label>
                  Description :
                  <input
                    type="text"
                    name="description"
                    value={editableProduct.description}
                    onChange={handleEditChange}
                  />
                </label>
                <br />
                <label>
                  Prix :
                  <input
                    type="number"
                    name="prix"
                    value={editableProduct.prix}
                    onChange={handleEditChange}
                  />
                </label>
                <br />
                <button onClick={handleUpdate}>Sauvegarder</button>
                <button onClick={() => setEditableProduct(null)}>Annuler</button>
              </div>
            ) : (
              <div>
                <h3>{product.titre}</h3>
                <p>{product.description}</p>
                <p>Prix: {product.prix} ARIARY</p>
                <button onClick={() => setEditableProduct(product)}>Modifier</button>
                <button onClick={() => handleDelete(product.id)}>Supprimer</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Aucun produit trouvé.</p>
      )}
    </div>
  );
};

export default ProductList;
