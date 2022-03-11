import { useState } from 'react';
import initialState from '../context/initialState';

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addarticulos = (payload) => {
    setState({
      ...state,
      articulos: [payload],
    });
  };

  const addubicacion = (payload) => {
    setState({
      ...state,
    ubicacion: [payload],
    });
  };
  return {
    addarticulos,
    addubicacion,
    state,
  };
};

export default useInitialState;
