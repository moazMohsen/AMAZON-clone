import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import firebaseConfig from './firebase.config';
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import App from "./App";

import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={'loading'} persistor={persistor}></PersistGate>
    <App />
  </Provider>
);

