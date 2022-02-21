import React from 'react';

import historiaContext from './historiaContext';
import historiaReducer from './historiaReducer';

const historiaState = props => {
    const initialState = {
        nuevaHistoria: false
    }

    // dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(historiaReducer, initialState)

    // serie de funciones para el crud

    return (
        <historiaContext.Provider
        value={{formulario: state.formulario}}>
            {props.children}
        </historiaContext.Provider>
    )
}
