
import React from 'react';

interface SignUpScreenProps {
  onSignUp: () => void;
  onGoToLogin: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUp, onGoToLogin }) => {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-8">
      {/* Header Bar */}
      <header className="flex items-center justify-between border border-terminal-green p-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined terminal-glow">terminal</span>
          <h2 className="text-xl font-bold tracking-tighter uppercase">TeamCal_v2.0.exe</h2>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <span className="text-xs border border-terminal-green/30 px-2 py-0.5">[ STATUS: READY ]</span>
          <span className="text-xs border border-terminal-green/30 px-2 py-0.5">[ AUTH: REQUIRED ]</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[600px] border border-terminal-green p-6 md:p-10 relative">
          {/* Decorative Corner Brackets */}
          <div className="absolute -top-1 -left-1 w-4 h-4 bg-terminal-black border-l-2 border-t-2 border-terminal-green"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-terminal-black border-r-2 border-t-2 border-terminal-green"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-terminal-black border-l-2 border-b-2 border-terminal-green"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-terminal-black border-r-2 border-b-2 border-terminal-green"></div>

          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-terminal-green">></span>
              <h1 className="text-2xl font-bold uppercase tracking-widest terminal-glow">Initialization Sequence</h1>
            </div>
            <p className="text-[10px] opacity-70 border-b border-terminal-green/30 pb-4 uppercase">
              TEAMCAL PLANNER: SYSTEM ACCESS PORTAL. ENTER CREDENTIALS TO SYNC TEAM CLUSTER.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] flex justify-between">
                  <span>01. Identity_Name</span>
                  <span className="text-terminal-green/50">[Required]</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-terminal-green/50 font-bold">></span>
                  <input 
                    className="w-full bg-white/5 border border-terminal-green h-12 pl-8 pr-4 text-sm" 
                    placeholder="NAME_ENTRY" 
                    type="text" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] flex justify-between">
                  <span>02. Communication_Node</span>
                  <span className="text-terminal-green/50">[Email]</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-terminal-green/50 font-bold">></span>
                  <input 
                    className="w-full bg-white/5 border border-terminal-green h-12 pl-8 pr-4 text-sm" 
                    placeholder="USER@NET_NODE" 
                    type="email" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] flex justify-between">
                  <span>03. Encryption_Key</span>
                  <span className="text-terminal-green/50">[Secure]</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-terminal-green/50 font-bold">></span>
                  <input 
                    className="w-full bg-white/5 border border-terminal-green h-12 pl-8 pr-4 text-sm" 
                    placeholder="********" 
                    type="password" 
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={onSignUp}
              className="mt-6 w-full border-2 border-terminal-orange bg-terminal-orange/10 text-terminal-orange hover:bg-terminal-orange hover:text-terminal-black h-14 font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 group"
            >
              <span className="group-hover:translate-x-1 transition-transform">[ JOIN TEAM ]</span>
            </button>
          </div>

          <div className="mt-12 pt-6 border-t border-terminal-green/20 flex flex-col gap-4">
            <div className="flex justify-between items-center text-[10px] uppercase">
              <span className="text-terminal-green/40">External Protocols:</span>
              <div className="flex gap-4">
                <button className="text-white hover:text-terminal-green underline underline-offset-4">OAuth_Google</button>
                <button className="text-white hover:text-terminal-green underline underline-offset-4">OAuth_Github</button>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-xs uppercase">
                Returning user? 
                <button 
                  onClick={onGoToLogin}
                  className="text-white hover:text-terminal-green font-bold px-2 py-0.5 border border-white/40 hover:border-terminal-green transition-colors ml-4"
                >
                  EXEC LOGIN_SEQ
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="mt-8 flex flex-col md:flex-row items-center justify-between border border-terminal-green p-4 text-[10px] uppercase tracking-widest gap-4">
        <div className="flex gap-6">
          <button className="text-white/60 hover:text-terminal-green">_PRIVACY_DOC</button>
          <button className="text-white/60 hover:text-terminal-green">_TERMS_OF_SRV</button>
          <button className="text-white/60 hover:text-terminal-green">_SEC_ENCRYPT</button>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-terminal-green animate-pulse rounded-full shadow-[0_0_5px_#00FF00]"></span>
          <span>© 2024 TEAMCAL_SYSTEMS. ALL_RIGHTS_RESERVED.</span>
        </div>
      </footer>
    </div>
  );
};

export default SignUpScreen;
