import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { demoReducer, initialState } from './demoReducer';

const DemoContext = createContext();

export function DemoProvider({ children }) {
  const [state, dispatch] = useReducer(demoReducer, initialState, (initial) => {
    try {
      const savedBorrower = sessionStorage.getItem('nirnay_borrower_id');
      const savedTour = localStorage.getItem('nirnay-tour-completed');
      let groqKey = sessionStorage.getItem('nirnay_groq_key');
      
      if (!groqKey && import.meta.env.VITE_GROQ_API_KEY) {
        groqKey = import.meta.env.VITE_GROQ_API_KEY;
        sessionStorage.setItem('nirnay_groq_key', groqKey);
      }

      return {
        ...initial,
        selectedBorrowerId: savedBorrower || initial.selectedBorrowerId,
        tourRunning: !savedTour,
        groqKeyPresent: !!groqKey,
        groqMode: groqKey ? 'Live Groq' : 'demo'
      };
    } catch (e) {
      return initial;
    }
  });

  useEffect(() => {
    sessionStorage.setItem('nirnay_borrower_id', state.selectedBorrowerId);
  }, [state.selectedBorrowerId]);

  return (
    <DemoContext.Provider value={{ state, dispatch }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  return useContext(DemoContext);
}
