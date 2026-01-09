
import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import DashboardScreen from './components/DashboardScreen';
import RecoverScreen from './components/RecoverScreen';

type Screen = 'LOGIN' | 'SIGNUP' | 'DASHBOARD' | 'RECOVER';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('LOGIN');

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {currentScreen === 'LOGIN' && (
        <LoginScreen 
          onLogin={() => navigateTo('DASHBOARD')} 
          onGoToSignUp={() => navigateTo('SIGNUP')} 
          onGoToRecover={() => navigateTo('RECOVER')}
        />
      )}
      
      {currentScreen === 'SIGNUP' && (
        <SignUpScreen 
          onSignUp={() => navigateTo('DASHBOARD')} 
          onGoToLogin={() => navigateTo('LOGIN')} 
        />
      )}

      {currentScreen === 'RECOVER' && (
        <RecoverScreen 
          onBackToLogin={() => navigateTo('LOGIN')} 
        />
      )}
      
      {currentScreen === 'DASHBOARD' && (
        <DashboardScreen 
          onLogout={() => navigateTo('LOGIN')} 
        />
      )}
    </div>
  );
};

export default App;
