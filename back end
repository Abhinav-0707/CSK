
import React, { useState, useEffect } from 'react';
import { 
  LogIn, 
  UserPlus, 
  Zap, 
  Sparkles,
  Search,
  BookOpen,
  // Add missing Loader2 icon to imports
  Loader2
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CurriculumForm from './components/CurriculumForm';
import CurriculumViewer from './components/CurriculumViewer';
import { storageService } from './services/storageService';
import { geminiService } from './services/geminiService';
import { User, Curriculum } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthMode, setIsAuthMode] = useState<'login' | 'signup'>('login');
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [selectedCurriculum, setSelectedCurriculum] = useState<Curriculum | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [trendingSkills, setTrendingSkills] = useState<string[]>([]);
  const [isLoadingTrends, setIsLoadingTrends] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('curricu_forge_session');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setCurriculums(storageService.getCurriculumsByUser(parsedUser.id) || []);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: authForm.email,
      name: authForm.name || authForm.email.split('@')[0],
      joinedAt: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('curricu_forge_session', JSON.stringify(newUser));
    setCurriculums(storageService.getCurriculumsByUser(newUser.id) || []);
  };

  const handleLogout = () => {
    localStorage.removeItem('curricu_forge_session');
    setUser(null);
    setActiveTab('dashboard');
  };

  const generateCurriculum = async (formData: any) => {
    if (!user) return;
    setIsGenerating(true);
    try {
      const result = await geminiService.generateCurriculum(formData);
      const newCurriculum: Curriculum = {
        ...formData,
        ...result,
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        createdAt: new Date().toISOString(),
        // Ensure array fields exist
        modules: result.modules || [],
        outcomes: result.outcomes || [],
        assignments: result.assignments || [],
        tools: result.tools || [],
      } as Curriculum;
      
      storageService.saveCurriculum(newCurriculum);
      setCurriculums(prev => [newCurriculum, ...prev]);
      setSelectedCurriculum(newCurriculum);
      setActiveTab('viewer');
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Failed to generate curriculum. Please check your API key and network.');
    } finally {
      setIsGenerating(false);
    }
  };

  const fetchTrends = async (industry: string = 'Technology') => {
    setIsLoadingTrends(true);
    try {
      const trends = await geminiService.suggestTrendingSkills(industry);
      setTrendingSkills(trends || []);
    } catch (err) {
      console.error(err);
      setTrendingSkills([]);
    } finally {
      setIsLoadingTrends(false);
    }
  };

  const deleteCurriculum = (id: string) => {
    storageService.deleteCurriculum(id);
    setCurriculums(prev => (prev || []).filter(c => c.id !== id));
    setSelectedCurriculum(null);
    setActiveTab('history');
  };

  if (!user) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

        <div className="glass max-w-md w-full p-10 rounded-[2.5rem] shadow-2xl relative z-10 border-white/20">
          <div className="flex flex-col items-center mb-10">
            <div className="p-4 bg-white/10 rounded-3xl mb-4 border border-white/20">
              <Zap className="text-white w-10 h-10" fill="currentColor" />
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">CurricuForge</h1>
            <p className="text-purple-100 text-center mt-2 opacity-80">Forging the future of education with AI</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isAuthMode === 'signup' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 px-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-white/30"
                  value={authForm.name}
                  onChange={e => setAuthForm({ ...authForm, name: e.target.value })}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 px-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="instructor@forge.edu"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-white/30"
                value={authForm.email}
                onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 px-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-white/30"
                value={authForm.password}
                onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-purple-700 font-bold py-4 rounded-2xl hover:bg-purple-50 transition-all shadow-xl shadow-purple-900/20 mt-4 flex items-center justify-center gap-2"
            >
              {isAuthMode === 'login' ? <LogIn size={20} /> : <UserPlus size={20} />}
              {isAuthMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsAuthMode(isAuthMode === 'login' ? 'signup' : 'login')}
              className="text-white/60 hover:text-white transition-colors text-sm font-medium"
            >
              {isAuthMode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
        userName={user.name}
      />
      
      <main className="flex-1 ml-64 min-h-screen custom-scrollbar overflow-y-auto">
        {activeTab === 'dashboard' && (
          <Dashboard 
            userName={user.name} 
            curriculums={curriculums || []}
            onCreateNew={() => setActiveTab('create')}
            onViewHistory={() => setActiveTab('history')}
          />
        )}

        {activeTab === 'create' && (
          <CurriculumForm 
            onGenerate={generateCurriculum}
            isGenerating={isGenerating}
          />
        )}

        {activeTab === 'history' && (
          <div className="p-8 space-y-6">
            <h2 className="text-3xl font-bold">Saved Curriculum Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(curriculums || []).map(curr => (
                <div 
                  key={curr.id} 
                  onClick={() => { setSelectedCurriculum(curr); setActiveTab('viewer'); }}
                  className="glass p-6 rounded-2xl border-white/5 hover:border-white/20 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="font-bold text-lg leading-tight mb-2 truncate">{curr.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{curr.industry} • {curr.skillLevel}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-2 py-1 bg-white/5 rounded text-slate-400">
                      {new Date(curr.createdAt).toLocaleDateString()}
                    </span>
                    <span className="font-bold text-purple-400">{curr.qualityScore}% Match</span>
                  </div>
                </div>
              ))}
              {(!curriculums || curriculums.length === 0) && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-slate-500">Your library is empty. Let's create your first curriculum!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'trending' && (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto space-y-8">
              <header className="text-center">
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <Sparkles size={32} />
                </div>
                <h2 className="text-3xl font-bold">AI Industry Insights</h2>
                <p className="text-slate-400 mt-2">Discover what the market is looking for before you design your next course.</p>
              </header>

              <div className="glass p-8 rounded-3xl border-white/10 space-y-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="text" 
                      placeholder="Enter industry (e.g. Cybersecurity, AI, Arts)" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onKeyDown={(e) => e.key === 'Enter' && fetchTrends((e.target as HTMLInputElement).value)}
                    />
                  </div>
                  <button 
                    onClick={() => fetchTrends()}
                    className="px-8 py-4 gradient-bg rounded-xl font-bold hover:opacity-90 transition-all"
                  >
                    Get Insights
                  </button>
                </div>

                <div className="pt-6">
                  {isLoadingTrends ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2 className="animate-spin text-purple-500" size={32} />
                    </div>
                  ) : (trendingSkills && trendingSkills.length > 0) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {trendingSkills.map((skill, i) => (
                        <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-xs font-bold text-white shrink-0">
                            {i + 1}
                          </div>
                          <span className="font-medium text-slate-200">{skill}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-slate-500 italic">Enter an industry to see trending skills...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'viewer' && selectedCurriculum && (
          <CurriculumViewer 
            curriculum={selectedCurriculum}
            onBack={() => setActiveTab('history')}
            onDelete={deleteCurriculum}
          />
        )}
      </main>
    </div>
  );
};

export default App;
