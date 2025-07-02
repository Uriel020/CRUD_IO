import { createContext } from 'react';

type FormContextProviderProps = {
    children: React.ReactNode;
};

type FormContextType = {
    
};

export const FormContext = createContext({} as FormContextType);

export const FormContextProvider = ({ children }: FormContextProviderProps) => {

    return (
        <FormContext.Provider
            value={{
                
            }}
        >
            {children}
        </FormContext.Provider>
    );
};