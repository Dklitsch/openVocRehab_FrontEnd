import { React, useState } from 'react';

export function useFormField(initialState, validator, errorMessage) {
    const [state, setState] = useState(initialState);
  
    function validateFormField(value) {

        const isValid = validator(value);
    
        setState(
    
            { 
                value : value,
                valid : isValid,
                message : isValid ? "" : errorMessage
            }
    
        )
    }
  
    return [state, validateFormField];
  }

