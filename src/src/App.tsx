import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import PrinterList from './components/PrinterList';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <PrinterList />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;