
import React, { useState, useMemo } from 'react';

interface Task {
  id: string;
  title: string;
  desc?: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'med' | 'high';
  assigned: string;
  teamId: string;
  date: number; 
}

interface Team {
  id: string;
  name: string;
  code: string;
  isPersonal?: boolean;
  color: string;
}

interface DashboardScreenProps {
  onLogout: () => void;
}

type ViewMode = 'MONTH' | 'YEAR';

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onLogout }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('MONTH');
  const [selectedTeamId, setSelectedTeamId] = useState<string>('personal');
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeDay, setActiveDay] = useState<number | null>(15);

  const [teams, setTeams] = useState<Team[]>([
    { id: 'personal', name: 'PERSONAL_CLUSTER', code: 'N/A', isPersonal: true, color: '#00FF00' },
    { id: 'team-1', name: 'CORE_ENGINEERING', code: '0x3F2A-88', color: '#4D88FF' },
    { id: 'team-2', name: 'DESIGN_OPS_9', code: '0x9922-BC', color: '#FFA500' },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'UPDATE_CORE_CSS', status: 'completed', priority: 'med', assigned: 'YOU', teamId: 'personal', date: 1 },
    { id: '2', title: 'SOSA_COMPLIANCE_CHECK', status: 'pending', priority: 'high', assigned: 'TEAM', teamId: 'team-1', date: 2 },
    { id: '3', title: 'ASSET_REFINEMENT', status: 'pending', priority: 'low', assigned: 'J_DOE', teamId: 'team-2', date: 10 },
    { id: '4', title: 'UI_OVERHAUL', status: 'pending', priority: 'high', assigned: 'YOU', teamId: 'personal', date: 15 },
    { id: '5', title: 'SERVER_MIGRATION', status: 'pending', priority: 'med', assigned: 'CORE', teamId: 'team-1', date: 15 },
    { id: '6', title: 'SECURITY_AUDIT', status: 'pending', priority: 'high', assigned: 'YOU', teamId: 'personal', date: 22 },
  ]);

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const activeTeam = useMemo(() => teams.find(t => t.id === selectedTeamId) || teams[0], [teams, selectedTeamId]);

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    const colors = ['#4D88FF', '#FFA500', '#FF3B3B', '#FF00FF', '#00FFFF'];
    const newId = `team-${Date.now()}`;
    const code = `0x${Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase()}-${Math.floor(Math.random() * 0xFF).toString(16).toUpperCase()}`;
    setTeams(prev => [...prev, { 
      id: newId, 
      name: 'STATION_' + Math.floor(Math.random() * 100), 
      code, 
      color: colors[Math.floor(Math.random() * colors.length)] 
    }]);
    setShowCreateTeam(false);
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-terminal-red';
      case 'med': return 'text-terminal-orange';
      default: return 'text-terminal-blue';
    }
  };

  const dayTasks = useMemo(() => {
    if (activeDay === null) return [];
    // Consolidated View: Show tasks from ALL teams for the selected day
    return tasks.filter(t => t.date === activeDay);
  }, [tasks, activeDay]);

  return (
    <div className="flex flex-col h-screen w-full bg-terminal-black text-terminal-green overflow-hidden select-none">
      {/* Task Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
          <div className="w-full max-w-md border-2 border-terminal-green bg-black p-6 shadow-[0_0_50px_rgba(0,255,0,0.2)]">
            <h2 className={`text-lg font-bold uppercase tracking-widest mb-4 border-b border-terminal-green/20 pb-2 ${getPriorityColor(selectedTask.priority)}`}>
              Task://{selectedTask.title}
            </h2>
            <div className="space-y-3 text-[10px] uppercase">
              <p><span className="opacity-50">Team:</span> <span style={{ color: teams.find(tx => tx.id === selectedTask.teamId)?.color }}>{teams.find(tx => tx.id === selectedTask.teamId)?.name}</span></p>
              <p><span className="opacity-50">Priority:</span> {selectedTask.priority}</p>
              <p><span className="opacity-50">Status:</span> {selectedTask.status}</p>
              <div className="pt-4 flex gap-2">
                <button 
                  onClick={() => {
                    setTasks(prev => prev.map(t => t.id === selectedTask.id ? {...t, status: 'completed'} : t));
                    setSelectedTask(null);
                  }}
                  className="flex-1 bg-terminal-green text-black font-bold py-2 uppercase hover:bg-white transition-colors"
                >
                  Resolve
                </button>
                <button onClick={() => setSelectedTask(null)} className="flex-1 border border-terminal-green py-2 uppercase hover:bg-terminal-green/10">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="h-14 flex items-center justify-between border-b border-terminal-green bg-black px-6 flex-shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl terminal-glow">calendar_today</span>
            <h1 className="text-lg font-bold tracking-[0.2em] terminal-glow">TEAMCAL_V4</h1>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setViewMode('MONTH')}
              className={`px-3 py-1 text-[10px] border ${viewMode === 'MONTH' ? 'bg-terminal-green text-black' : 'border-terminal-green/30'}`}
            >
              [MONTH]
            </button>
            <button 
              onClick={() => setViewMode('YEAR')}
              className={`px-3 py-1 text-[10px] border ${viewMode === 'YEAR' ? 'bg-terminal-green text-black' : 'border-terminal-green/30'}`}
            >
              [YEAR_GRID]
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="opacity-50">NODE: 0xADMIN</span>
          <button onClick={onLogout} className="text-terminal-red border border-terminal-red px-2 py-0.5 hover:bg-terminal-red hover:text-black transition-all">LOGOUT</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-terminal-green bg-black flex flex-col p-4 flex-shrink-0">
          <div className="mb-6">
            <h3 className="text-[9px] font-bold opacity-50 uppercase tracking-widest mb-3">/clusters</h3>
            <div className="space-y-1">
              {teams.map(team => (
                <button 
                  key={team.id}
                  onClick={() => setSelectedTeamId(team.id)}
                  className={`w-full text-left p-2 text-[10px] uppercase border transition-all ${selectedTeamId === team.id ? 'bg-terminal-green/10 border-terminal-green' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  style={{ color: team.color }}
                >
                  {team.isPersonal ? '@ ' : '> '}{team.name}
                </button>
              ))}
              <button 
                onClick={() => setShowCreateTeam(true)}
                className="w-full mt-2 border border-dashed border-terminal-green/30 p-2 text-[9px] uppercase hover:bg-terminal-green/10"
              >
                + New_Team
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <h3 className="text-[9px] font-bold opacity-50 uppercase tracking-widest mb-3 border-b border-terminal-green/10 pb-1">
              {activeDay ? `Day_${activeDay}_Tasks` : 'Protocol_Feed'}
            </h3>
            <div className="space-y-2">
              {dayTasks.map(task => (
                <div 
                  key={task.id} 
                  onClick={() => setSelectedTask(task)}
                  className={`p-2 border border-terminal-green/20 bg-black/50 text-[9px] cursor-pointer hover:border-terminal-green transition-all ${task.status === 'completed' ? 'opacity-30 line-through' : ''}`}
                >
                  <div className="flex justify-between font-bold" style={{ color: teams.find(tx => tx.id === task.teamId)?.color }}>
                    <span>{task.title}</span>
                  </div>
                  <div className="mt-1 flex justify-between opacity-50 text-[8px]">
                    <span>{teams.find(tx => tx.id === task.teamId)?.name}</span>
                    <span className={getPriorityColor(task.priority)}>{task.priority}</span>
                  </div>
                </div>
              ))}
              {activeDay && dayTasks.length === 0 && (
                <p className="text-[9px] opacity-30 italic">No protocols for this node.</p>
              )}
            </div>
          </div>

          {showCreateTeam && (
            <div className="mt-4 p-3 border border-terminal-blue bg-terminal-blue/5">
              <form onSubmit={handleCreateTeam} className="space-y-2">
                <input className="input-terminal w-full p-2 text-[10px]" placeholder="TEAM_NAME" required autoFocus />
                <button type="submit" className="w-full bg-terminal-blue text-black font-bold p-1 text-[9px] uppercase">Init</button>
                <button type="button" onClick={() => setShowCreateTeam(false)} className="w-full text-[8px] opacity-50">Cancel</button>
              </form>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-black/40 p-6">
          <div className="mb-6">
            <p className="text-[10px] opacity-50 uppercase tracking-[0.2em]">Active Cluster: <span style={{ color: activeTeam.color }}>{activeTeam.name}</span></p>
            <h2 className="text-3xl font-bold uppercase tracking-tighter">October_2024</h2>
          </div>

          {viewMode === 'MONTH' ? (
            <div className="grid grid-cols-7 gap-px border border-terminal-green bg-terminal-green/20">
              {days.map(d => (
                <div key={d} className="bg-terminal-deep-blue/40 p-2 text-[10px] font-bold text-center border-b border-terminal-green/30">{d}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const dayNum = i - 1; // Start Tuesday (Oct 2024 starts Tuesday)
                const isOff = dayNum < 1 || dayNum > 31;
                const isSelected = activeDay === dayNum;
                // For the grid cells, we only show tasks for the CURRENTLY selected team
                const cellTasks = tasks.filter(t => t.date === dayNum && t.teamId === selectedTeamId);

                return (
                  <div 
                    key={i} 
                    onClick={() => !isOff && setActiveDay(dayNum)}
                    className={`h-28 bg-black p-2 border border-terminal-green/5 relative transition-all cursor-pointer 
                      ${isOff ? 'opacity-5 pointer-events-none' : 'hover:bg-terminal-green/[0.05]'}
                      ${isSelected && !isOff ? 'bg-terminal-green/5 border-terminal-green/50' : ''}
                    `}
                  >
                    <span className={`text-[10px] font-bold block text-right mb-1 ${isSelected ? 'text-terminal-green underline' : 'opacity-40'}`}>
                      {dayNum > 0 && dayNum <= 31 ? dayNum.toString().padStart(2, '0') : ''}
                    </span>
                    {!isOff && (
                      <div className="space-y-1 overflow-hidden">
                        {cellTasks.map(t => (
                          <div 
                            key={t.id} 
                            className="text-[8px] px-1 truncate border-l border-current"
                            style={{ color: activeTeam.color, backgroundColor: `${activeTeam.color}15` }}
                          >
                            {t.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {months.map((m, idx) => (
                <div key={m} className="border border-terminal-green/20 p-4 bg-black/60 group hover:border-terminal-green transition-all">
                  <div className="flex justify-between items-center mb-3 border-b border-terminal-green/10 pb-1">
                    <span className="text-xs font-bold tracking-widest">{m}</span>
                    <span className="text-[8px] opacity-30">Active: {idx === 9 ? tasks.filter(t => t.teamId === selectedTeamId).length : 0}</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }).map((_, i) => {
                      const hasTask = idx === 9 && tasks.some(t => t.date === i + 1 && t.teamId === selectedTeamId);
                      return (
                        <div 
                          key={i} 
                          className={`size-1.5 border border-terminal-green/5 ${hasTask ? 'shadow-[0_0_5px]' : ''}`}
                          style={hasTask ? { backgroundColor: activeTeam.color, borderColor: activeTeam.color, boxShadow: `0 0 5px ${activeTeam.color}` } : {}}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Global Status Bar */}
      <footer className="h-8 bg-black border-t border-terminal-green px-6 flex items-center justify-between text-[9px] uppercase flex-shrink-0">
        <div className="flex gap-6 opacity-60">
          <span>Cluster: <span style={{ color: activeTeam.color }}>{activeTeam.name}</span></span>
          <span>Status: Sync_Ok</span>
          <span>Security: 256_Bit</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-1.5 bg-terminal-green rounded-full animate-pulse shadow-[0_0_5px_#00FF00]"></span>
          <span className="terminal-glow">Kernel_Stable_v4</span>
        </div>
      </footer>
    </div>
  );
};

export default DashboardScreen;
