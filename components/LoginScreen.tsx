
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
  onGoToSignUp: () => void;
  onGoToRecover: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onGoToSignUp, onGoToRecover }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      {isLoading && (
        <div className="fixed inset-0 bg-black/90 z-[10000] flex flex-col items-center justify-center">
          <div className="w-64 h-2 border border-terminal-green mb-4 p-[1px]">
            <div className="h-full bg-terminal-green animate-[typing_1.5s_ease-in-out_infinite]"></div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] animate-pulse">Establishing OAuth Handshake...</p>
        </div>
      )}

      <div className="w-full max-w-[450px]">
        {/* Header */}
        <div className="w-full mb-8 text-left border-b border-terminal-green/30 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-2xl terminal-glow">terminal</span>
            <span className="text-white text-lg font-bold tracking-tighter">TEAMCAL_LOGIN_V1.0</span>
          </div>
          <p className="text-[10px] text-terminal-blue uppercase tracking-widest font-bold">
            Status: AUTH_REQUIRED // Connection: ENCRYPTED
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <label className="text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2">
              <span className="text-terminal-orange">>></span> Username
            </label>
            <input 
              className="input-terminal w-full py-4 px-4 text-sm" 
              placeholder="root@teamcal" 
              type="text" 
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2">
              <span className="text-terminal-orange">>></span> Password
            </label>
            <input 
              className="input-terminal w-full py-4 px-4 text-sm" 
              placeholder="********" 
              type="password" 
            />
          </div>

          <div className="pt-2">
            <button 
              onClick={onLogin}
              className="w-full bg-terminal-green text-terminal-black hover:bg-white hover:text-black transition-all duration-200 font-bold py-4 text-sm uppercase tracking-[0.3em] active:scale-95"
            >
              Execute Login
            </button>
            <div className="mt-4 flex justify-between items-center text-[10px] uppercase font-bold">
              <span className="text-terminal-red">Err: 0 critical</span>
              <span className="text-terminal-orange animate-pulse">Warning: auth_timeout</span>
            </div>
          </div>

          {/* OAuth Simulation */}
          <div className="grid grid-cols-2 gap-4 py-2">
            <button 
              onClick={handleOAuth}
              className="border border-white/20 text-[10px] py-3 hover:bg-white hover:text-black transition-all uppercase tracking-widest font-bold"
            >
              Google_Auth
            </button>
            <button 
              onClick={handleOAuth}
              className="border border-white/20 text-[10px] py-3 hover:bg-white hover:text-black transition-all uppercase tracking-widest font-bold"
            >
              Github_Auth
            </button>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col items-start gap-4 pt-6 border-t border-terminal-green/30">
            <button 
              onClick={onGoToRecover}
              className="text-xs uppercase tracking-widest text-terminal-blue hover:text-terminal-green transition-colors"
            >
              [Recover_Credentials]
            </button>
            <p className="text-xs uppercase tracking-widest">
              <span className="text-terminal-green/50">Unregistered?</span>
              <button 
                onClick={onGoToSignUp}
                className="text-white hover:bg-terminal-green hover:text-terminal-black px-2 py-0.5 ml-2 transition-colors border border-white/20"
              >
                [CREATE_NEW_NODE]
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Persistent Status Bar */}
      <div className="fixed bottom-0 left-0 w-full p-6 flex justify-between items-end text-[10px] uppercase tracking-widest opacity-80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="size-2 bg-terminal-green shadow-[0_0_5px_#00FF00]"></span>
            <span className="text-terminal-green">Kernel: Online</span>
          </div>
          <div className="text-terminal-green/40">Lat: 24ms // Loc: Sector-7</div>
        </div>
        <div className="text-right">
          <div className="text-white">User: guest@terminal</div>
          <div className="text-terminal-blue">Build: 0x442-B</div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
