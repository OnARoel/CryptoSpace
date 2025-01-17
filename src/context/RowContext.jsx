// src/context/RowContext.js
import { createContext, useState } from 'react';

export const RowContext = createContext();

export const RowProvider = ({ children }) => {
    const [selectedRows, setSelectedRows] = useState(20);

    return (
        <RowContext.Provider value={{ selectedRows, setSelectedRows }}>
            {children}
        </RowContext.Provider>
    );
};