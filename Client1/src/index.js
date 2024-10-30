import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DyeStore from './store/DyeStore';
import UserStore from './store/UserStore';
import CartStore from './store/Cart.Store';

export const API_URL = 'http://localhost:3000/'
export const  Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
       <Context.Provider value={{
          user: new UserStore(),
          dye: new DyeStore(),
          cart: new CartStore()
       }}>
        <App/>
       </Context.Provider>
  </React.StrictMode>
);
