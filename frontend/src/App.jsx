import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/NavBar';
import Rooms from './components/rooms';
const App = () => (
  <Provider store={store}>
    <Rooms />
    <Navbar />
    <Toaster position="top-right" />
  </Provider>
);

export default App;
