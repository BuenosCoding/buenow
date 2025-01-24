import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Script {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  game_type: string;
  created_at: string;
}

interface Purchase {
  id: string;
  user_id: string;
  script_id: string;
  created_at: string;
}

interface DataContextType {
  scripts: Script[];
  purchases: Purchase[];
  addScript: (script: Omit<Script, 'id' | 'created_at'>) => void;
  updateScript: (id: string, script: Partial<Script>) => void;
  deleteScript: (id: string) => void;
  addPurchase: (userId: string, scriptId: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

const SCRIPTS_KEY = 'app_scripts';
const PURCHASES_KEY = 'app_purchases';

export function DataProvider({ children }: { children: ReactNode }) {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const savedScripts = localStorage.getItem(SCRIPTS_KEY);
    const savedPurchases = localStorage.getItem(PURCHASES_KEY);
    
    if (savedScripts) setScripts(JSON.parse(savedScripts));
    if (savedPurchases) setPurchases(JSON.parse(savedPurchases));
  }, []);

  const addScript = (scriptData: Omit<Script, 'id' | 'created_at'>) => {
    const newScript = {
      ...scriptData,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    
    const updatedScripts = [...scripts, newScript];
    setScripts(updatedScripts);
    localStorage.setItem(SCRIPTS_KEY, JSON.stringify(updatedScripts));
  };

  const updateScript = (id: string, scriptData: Partial<Script>) => {
    const updatedScripts = scripts.map(script =>
      script.id === id ? { ...script, ...scriptData } : script
    );
    setScripts(updatedScripts);
    localStorage.setItem(SCRIPTS_KEY, JSON.stringify(updatedScripts));
  };

  const deleteScript = (id: string) => {
    const updatedScripts = scripts.filter(script => script.id !== id);
    setScripts(updatedScripts);
    localStorage.setItem(SCRIPTS_KEY, JSON.stringify(updatedScripts));
  };

  const addPurchase = (userId: string, scriptId: string) => {
    const newPurchase = {
      id: crypto.randomUUID(),
      user_id: userId,
      script_id: scriptId,
      created_at: new Date().toISOString(),
    };
    
    const updatedPurchases = [...purchases, newPurchase];
    setPurchases(updatedPurchases);
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(updatedPurchases));
  };

  return (
    <DataContext.Provider value={{
      scripts,
      purchases,
      addScript,
      updateScript,
      deleteScript,
      addPurchase,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}