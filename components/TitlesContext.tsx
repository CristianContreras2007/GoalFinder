import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveTitles = async (titles: string[]) => {
  try {
    await AsyncStorage.setItem('selectedTitles', JSON.stringify(titles));
  } catch (e) {
    console.error('Failed to save titles', e);
  }
};

const loadTitles = async (): Promise<string[]> => {
  try {
    const titles = await AsyncStorage.getItem('selectedTitles');
    return titles ? JSON.parse(titles) : [];
  } catch (e) {
    console.error('Failed to load titles', e);
    return [];
  }
};

interface TitlesContextType {
  titles: string[];
  setTitles: React.Dispatch<React.SetStateAction<string[]>>;
  refreshTitles: () => Promise<void>; 
}

const TitlesContext = createContext<TitlesContextType | undefined>(undefined);

export const TitlesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [titles, setTitles] = useState<string[]>([]);

  useEffect(() => {
    const fetchTitles = async () => {
      const savedTitles = await loadTitles();
      setTitles(savedTitles);
    };

    fetchTitles();
  }, []);

  useEffect(() => {
    saveTitles(titles);
  }, [titles]);
  
  const refreshTitles = async () => {
    const savedTitles = await loadTitles();
    setTitles(savedTitles);
  };

  return (
    <TitlesContext.Provider value={{ titles, setTitles, refreshTitles }}>
      {children}
    </TitlesContext.Provider>
  );
};

export const useTitles = () => {
  const context = React.useContext(TitlesContext);
  if (context === undefined) {
    throw new Error('useTitles must be used within a TitlesProvider');
  }
  return context;
};
