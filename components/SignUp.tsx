import React, { createContext, useState, ReactNode, FC } from 'react';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: string;
    zipCode: string;
    topics: string[];
}

interface SignUpContextType {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

interface SignUpProviderProps {
    children: ReactNode;
}

export const SignUpProvider: FC<SignUpProviderProps> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: '',
        zipCode: '',
        topics: [],
    });

    return (
        <SignUpContext.Provider value={{ formData, setFormData }}>
            {children}
        </SignUpContext.Provider>
    );
};
