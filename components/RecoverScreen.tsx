
import React, { useState } from 'react';

interface RecoverScreenProps {
  onBackToLogin: () => void;
}

const RecoverScreen: React.FC<RecoverScreenProps> = ({ onBackToLogin }) => {
  const [isSent, setIsSent] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[450px] border border-terminal-blue p-8 bg-terminal-deep-blue/10 relative">
        <div className="absolute top-0 right-0 p-2 text-[10px] text-terminal-blue font-bold tracking-tighter">
          SYS_RECOVERY_MODE
        </div>
        
        <div className="mb-8 border-b border-terminal-blue/30 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-2xl text-terminal-blue blue-glow">lock_reset</span>
            <span className="text-white text-lg font-bold tracking-tighter uppercase">Credential_Retriever</span>
          </div>
          <p className="text-[10px] text-terminal-blue uppercase tracking-widest leading-relaxed">
            Identity verification required to initialize override.
          </p>
        </div>

        {!isSent ? (
          <div className="space-y-8">
            <div className="flex flex-col gap-3">
              <label className="text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                <span className="text-terminal-blue">>></span> Registered_Node (Email)
              </label>
              <input 
                className="input-terminal border-terminal-blue/50 text-terminal-blue w-full py-4 px-4 text-sm focus:ring-terminal-blue/50" 
                placeholder="USER@NODE_ID" 
                type="email" 
              />
            </div>

            <button 
              onClick={() => setIsSent(true)}
              className="w-full border border-terminal-blue text-terminal-blue hover:bg-terminal-blue hover:text-black transition-all font-bold py-4 text-sm uppercase tracking-[0.3em]"
            >
              [ INITIALIZE_OVERRIDE ]
            </button>
          </div>
        ) : (
          <div className="space-y-6 text-center animate-pulse">
            <div className="p-4 border border-terminal-green bg-terminal-green/5 text-terminal-green text-xs uppercase tracking-widest font-bold">
              Packet Sent Successfully. Check your communication node for override link.
            </div>
            <p className="text-[10px] text-terminal-blue uppercase">
              Tracking ID: 0xFD34-99-R
            </p>
          </div>
        )}

        <div className="mt-10 pt-4 border-t border-terminal-blue/20">
          <button 
            onClick={onBackToLogin}
            className="text-[10px] uppercase tracking-widest text-terminal-blue hover:text-white transition-colors"
          >
            [ ABORT_AND_RETURN_TO_BASE ]
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecoverScreen;
