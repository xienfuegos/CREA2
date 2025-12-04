import React, { useState } from 'react';
import {
    Menu, BookOpen, Sparkles, Wand2, Palette, ClipboardList,
    FileQuestion, Rocket, HeartHandshake, CheckCircle
} from 'lucide-react';
import { User, Tutorial, AIToolType } from '../types';
import CalendarWidget from './CalendarWidget';
import ResourcesWidget from './ResourcesWidget';
import TutorialsWidget from './TutorialsWidget';
import AIToolOverlay from './AIToolOverlay';
import TutorialOverlay from './TutorialOverlay';
import icon01 from '../assets/icon01.png';

interface DashboardProps {
    user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);
    const [activeAITool, setActiveAITool] = useState<AIToolType | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-indigo-100 relative">
            {/* Chatito Floating Button */}
            <button
                onClick={() => setActiveAITool('chat')}
                className="fixed bottom-6 right-6 z-40 bg-indigo-600 text-white p-3 rounded-full shadow-xl hover:bg-indigo-700 hover:scale-110 transition-all group flex items-center gap-3"
            >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/50">
                    {/* Using a Lucide Icon instead of external image for reliability */}
                    <img src={icon01} alt="Chatito" className="w-full h-full object-cover" />
                </div>
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-bold">
                    Chatito
                </span>
            </button>

            {/* Navbar */}
            <nav className="bg-white sticky top-0 z-30 border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden">
                                <Menu className="w-6 h-6" />
                            </button>
                            <div className="flex items-center gap-2">
                                <div className="bg-indigo-600 p-1.5 rounded-lg">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-extrabold text-xl tracking-tight text-gray-800">CREA<span className="text-indigo-600">Profes</span></span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-bold text-gray-800">{user.firstName} {user.lastName}</span>
                                <span className="text-xs text-gray-500 font-medium">Docente UNPilar</span>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 cursor-pointer hover:ring-2 hover:ring-indigo-300 transition-all">
                                <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-indigo-700 font-bold">
                                    {user.firstName[0]}{user.lastName[0]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Hola, <span className="text-indigo-600">{user.firstName}</span> 👋
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Bienvenido a tu panel de recursos docentes. Aquí tienes todo lo que necesitas para tu ciclo lectivo.
                    </p>
                </div>

                {/* AI Tools Widget */}
                <div className="mb-8 animate-fade-in">
                    <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
                        {/* Abstract Shapes Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl"></div>

                        <div className="relative z-10 mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                                <Sparkles className="w-6 h-6 text-yellow-300" /> Centro de IA Docente
                            </h2>
                            <p className="text-indigo-100 max-w-xl text-lg">
                                Tu suite de herramientas inteligentes para planificar, crear y evaluar.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                            {[
                                { id: 'enricher', icon: Wand2, title: 'Enriquecedor', desc: 'Mejora y expande tu material didáctico con explicaciones profundas y ejemplos.' },
                                { id: 'stylizer', icon: Palette, title: 'Estilizador', desc: 'Adapta el tono de tus textos (formal, motivador, conciso) según la audiencia.' },
                                { id: 'planner', icon: ClipboardList, title: 'Planificador', desc: 'Estructura clases completas con objetivos, tiempos y estrategias didácticas.' },
                                { id: 'quiz', icon: FileQuestion, title: 'Quiz Maker', desc: 'Genera exámenes automáticos con diferentes formatos y rúbricas de evaluación.' },
                                { id: 'abp', icon: Rocket, title: 'Proyectos ABP', desc: 'Diseña proyectos educativos completos con hitos, entregables y criterios.' },
                                { id: 'inclusion', icon: HeartHandshake, title: 'Inclusión', desc: 'Recibe sugerencias de adaptación para estudiantes con diferentes necesidades.' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveAITool(item.id as AIToolType)}
                                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-left transition-all hover:translate-y-[-2px] flex items-start gap-4 group"
                                >
                                    <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-colors shrink-0 mt-1">
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight mb-1">{item.title}</h3>
                                        <p className="text-indigo-100 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column (Main Content) */}
                    <div className="lg:col-span-8 space-y-8">
                        <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            <TutorialsWidget onStartTutorial={setActiveTutorial} />
                        </section>
                        <section className="h-[500px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <ResourcesWidget />
                        </section>
                    </div>

                    {/* Right Column (Sidebar Widgets) */}
                    <div className="lg:col-span-4 space-y-8">
                        <section className="h-[600px] animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            <CalendarWidget />
                        </section>

                        <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" /> Estado del Campus
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-indigo-100 text-sm">
                                    <span>Plataforma Moodle</span>
                                    <span className="bg-green-400/20 text-green-300 px-2 py-0.5 rounded text-xs font-bold border border-green-400/30">OPERATIVO</span>
                                </div>
                                <div className="flex justify-between items-center text-indigo-100 text-sm">
                                    <span>Sistema SIU Guaraní</span>
                                    <span className="bg-green-400/20 text-green-300 px-2 py-0.5 rounded text-xs font-bold border border-green-400/30">OPERATIVO</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-indigo-500/50">
                                    <p className="text-xs text-indigo-200">
                                        ¿Necesitas soporte técnico? <br />
                                        <a href="#" className="underline hover:text-white font-medium">Contactar a Mesa de Ayuda</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlays */}
            {activeTutorial && (
                <TutorialOverlay
                    tutorial={activeTutorial}
                    onClose={() => setActiveTutorial(null)}
                />
            )}

            {activeAITool && (
                <AIToolOverlay
                    tool={activeAITool}
                    onClose={() => setActiveAITool(null)}
                />
            )}
        </div>
    );
};

export default Dashboard;