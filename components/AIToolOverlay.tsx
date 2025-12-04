import React, { useState, useEffect, useRef } from 'react';
import {
    MessageSquare, Sparkles, Palette, ClipboardList,
    FileQuestion, Rocket, HeartHandshake, Wand2, X,
    Send, Loader2, Eye, EyeOff, Copy, PenTool, Settings, GraduationCap
} from 'lucide-react';
import { AIToolType, ChatMessage } from '../types';
import { generateAIContent } from '../services/geminiService';
import { academicEvents2025, RECURSOS_DATA } from '../constants';
import icon01 from '../assets/icon01.png';

interface AIToolOverlayProps {
    tool: AIToolType;
    onClose: () => void;
}

const getAppContextString = () => {
    const events = academicEvents2025.map(e => `- ${e.title}: ${e.start.toLocaleDateString()} al ${e.end.toLocaleDateString()}`).join('\n');
    const tools = RECURSOS_DATA.docente.map(c => `Categoría ${c.category}: ` + c.tools.map(t => t.name).join(', ')).join('\n');
    return `
    DATOS DEL CAMPUS Y CALENDARIO:
    ${events}
    
    HERRAMIENTAS DISPONIBLES:
    ${tools}
    `;
};

const AIToolOverlay: React.FC<AIToolOverlayProps> = ({ tool, onClose }) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'model', text: '¡Hola, colega! Soy Chatito. Como diría Paulo Freire: "Enseñar no es transferir conocimiento, sino crear las posibilidades para su propia producción o construcción". Estoy aquí para dialogar y construir juntos. ¿En qué puedo acompañarte hoy?' }]);

    // Quiz State
    const [quizFormat, setQuizFormat] = useState('Multiple Choice');
    const [quizDifficulty, setQuizDifficulty] = useState('Intermedio');
    const [includeRubric, setIncludeRubric] = useState(false);

    // Stylizer State
    const [tone, setTone] = useState('Formal Institucional');

    // View State
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, output]);

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setLoading(true);

        const appContext = getAppContextString();
        const context = `Eres "Chatito", un asistente pedagógico inspirado en la filosofía de Paulo Freire.
        
        INFORMACIÓN CONTEXTUAL IMPORTANTE:
        ${appContext}
        
        Tu rol es acompañar a los docentes de la UNPilar.
        Adopta un tono cálido, dialógico, crítico y reflexivo. Usa frases pedagógicas inspiradoras.
        Fomenta la curiosidad y la construcción colectiva del conocimiento.
        No des solo respuestas cerradas, invita a la reflexión y al diálogo.
        Sé amable, proactivo y didáctico.`;

        const fullPrompt = `${context}\n\nHistorial:\n${messages.map(m => `${m.role}: ${m.text}`).join('\n')}\nUser: ${userMsg}\nModel:`;

        const response = await generateAIContent(fullPrompt);
        setMessages(prev => [...prev, { role: 'model', text: response }]);
        setLoading(false);
    };

    const handleContentGeneration = async (type: AIToolType) => {
        if (!input.trim() || loading) return;
        setLoading(true);
        setIsPreviewMode(false);

        let prompt = '';

        switch (type) {
            case 'enricher':
                prompt = `Actúa como un experto en pedagogía. ENRIQUECE el siguiente contenido educativo: "${input}". 
                Proporciona: 1. Explicación profunda. 2. Analogías prácticas. 3. Una actividad breve. Usa formato Markdown limpio.`;
                break;
            case 'stylizer':
                prompt = `Reescribe el siguiente texto con un tono "${tone}". Texto: "${input}"`;
                break;
            case 'planner':
                prompt = `Crea un PLAN DE CLASE detallado para el tema: "${input}". 
                Incluye: 
                - Objetivos de aprendizaje.
                - Cronograma (Inicio, Desarrollo, Cierre).
                - Estrategias didácticas.
                - Materiales.
                Usa formato Markdown.`;
                break;
            case 'quiz':
                prompt = `Genera un EXAMEN sobre el tema: "${input}".
                
                Configuración:
                - Formato: ${quizFormat}
                - Dificultad: ${quizDifficulty}
                
                ${includeRubric ? 'IMPORTANTE: Genera también una RÚBRICA de evaluación detallada al final.' : ''}
                
                Si es Multiple Choice:
                **1. Pregunta**
                a) Opción
                b) Opción
                c) Opción
                *Respuesta Correcta:* X
                
                Si es Tarjetas (Flashcards):
                **Anverso:** Concepto
                **Reverso:** Definición/Respuesta
                
                Usa formato Markdown claro y estructurado.`;
                break;
            case 'abp':
                prompt = `Actúa como un experto en Aprendizaje Basado en Proyectos (ABP).
                Diseña un PROYECTO EDUCATIVO completo para el tema: "${input}".
                
                La estructura debe incluir:
                1. **Título Atractivo del Proyecto**
                2. **Pregunta Impulsora (Driving Question)**: Que despierte curiosidad.
                3. **Producto Final**: ¿Qué crearán los alumnos?
                4. **Hitos/Etapas**: 3 etapas clave con sus actividades.
                5. **Criterios de Evaluación**: 3 criterios clave.
                
                Usa formato Markdown claro con encabezados y listas.`;
                break;
            case 'inclusion':
                prompt = `Actúa como un especialista en Educación Inclusiva.
                Analiza la siguiente actividad o tema: "${input}".
                
                Propón ADAPTACIONES curriculares o de acceso para:
                1. **Dislexia / Dificultades de Lectoescritura**: Sugerencias concretas.
                2. **TDAH (Déficit de Atención)**: Estrategias de enfoque.
                3. **Altas Capacidades**: Actividades de ampliación/reto.
                
                Sé práctico, empático y directo. Usa formato Markdown.`;
                break;
        }

        const response = await generateAIContent(prompt);
        setOutput(response);
        setLoading(false);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const getToolIcon = () => {
        switch (tool) {
            case 'chat': return <img src={icon01} alt="Chatito" className="w-6 h-6 object-contain" />;
            case 'enricher': return <Sparkles className="w-6 h-6" />;
            case 'stylizer': return <Palette className="w-6 h-6" />;
            case 'planner': return <ClipboardList className="w-6 h-6" />;
            case 'quiz': return <FileQuestion className="w-6 h-6" />;
            case 'abp': return <Rocket className="w-6 h-6" />;
            case 'inclusion': return <HeartHandshake className="w-6 h-6" />;
            default: return <Wand2 className="w-6 h-6" />;
        }
    };

    const getToolTitle = () => {
        switch (tool) {
            case 'chat': return 'Chatito';
            case 'enricher': return 'Enriquecedor de Contenido';
            case 'stylizer': return 'Estilizador de Comunicaciones';
            case 'planner': return 'Planificador de Clases';
            case 'quiz': return 'Generador de Exámenes';
            case 'abp': return 'Proyectos ABP';
            case 'inclusion': return 'Asistente de Inclusión';
            default: return 'Herramienta IA';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                            {getToolIcon()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{getToolTitle()}</h2>
                            <p className="text-indigo-100 text-sm">Potenciado por Gemini 2.5 Flash</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-gray-50">

                    {/* Left: Input / Configuration Area */}
                    <div className={`flex-1 flex flex-col p-6 ${tool === 'chat' ? 'w-full' : 'md:w-5/12 md:border-r border-gray-200'} overflow-hidden bg-white md:bg-gray-50`}>

                        {tool === 'chat' ? (
                            <>
                                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar" ref={scrollRef}>
                                    {messages.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-indigo-600 text-white rounded-br-none'
                                                : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none'
                                                }`}>
                                                {msg.text.split('\n').map((line, i) => <p key={i} className="min-h-[1rem]">{line}</p>)}
                                            </div>
                                        </div>
                                    ))}
                                    {loading && (
                                        <div className="flex justify-start">
                                            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm flex gap-2 items-center">
                                                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                                                <span className="text-xs text-gray-500 font-medium">Chatito está pensando...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <form onSubmit={handleChatSubmit} className="relative mt-auto">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Pregúntale a Chatito..."
                                        className="w-full pl-5 pr-12 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all"
                                        disabled={loading}
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading || !input.trim()}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </>
                        ) : (
                            // Input for Tools
                            <div className="flex flex-col h-full">
                                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <PenTool className="w-4 h-4 text-indigo-600" />
                                    {tool === 'enricher' && 'Concepto a enriquecer'}
                                    {tool === 'stylizer' && 'Texto a transformar'}
                                    {tool === 'planner' && 'Tema de la clase'}
                                    {tool === 'quiz' && 'Tema del examen'}
                                    {tool === 'abp' && 'Tema del proyecto (Ej: Cambio Climático)'}
                                    {tool === 'inclusion' && 'Actividad a adaptar (Ej: Lectura de Quijote)'}
                                </label>

                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={tool === 'quiz' ? 'Ej: Revolución de Mayo' : 'Escribe aquí...'}
                                    className="flex-1 w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none shadow-sm transition-all text-gray-700 text-sm mb-4"
                                />

                                {/* --- Tool Specific Options --- */}

                                {tool === 'stylizer' && (
                                    <div className="mb-4 animate-fade-in-fast">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Tono</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['Formal Institucional', 'Amable y Cercano', 'Motivador', 'Conciso'].map((t) => (
                                                <button key={t} onClick={() => setTone(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${tone === t ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'bg-white border-gray-200 text-gray-600'}`}>{t}</button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {tool === 'quiz' && (
                                    <div className="mb-4 space-y-4 animate-fade-in-fast bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block flex items-center gap-1"><Settings className="w-3 h-3" /> Formato</label>
                                            <select
                                                value={quizFormat}
                                                onChange={(e) => setQuizFormat(e.target.value)}
                                                className="w-full p-2 rounded-lg border border-gray-200 text-sm bg-white"
                                            >
                                                <option value="Multiple Choice">Opción Múltiple</option>
                                                <option value="Verdadero/Falso">Verdadero / Falso</option>
                                                <option value="Desarrollo">Preguntas de Desarrollo</option>
                                                <option value="Tarjetas de Estudio">Tarjetas (Flashcards)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Dificultad</label>
                                            <div className="flex gap-2">
                                                {['Básica', 'Intermedio', 'Avanzada'].map(level => (
                                                    <button
                                                        key={level}
                                                        onClick={() => setQuizDifficulty(level)}
                                                        className={`flex-1 py-1.5 text-xs rounded-md border ${quizDifficulty === level ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200'}`}
                                                    >
                                                        {level}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 pt-2 border-t border-indigo-100">
                                            <input
                                                type="checkbox"
                                                id="rubric"
                                                checked={includeRubric}
                                                onChange={(e) => setIncludeRubric(e.target.checked)}
                                                className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                            />
                                            <label htmlFor="rubric" className="text-sm text-gray-700 font-medium cursor-pointer select-none flex items-center gap-1">
                                                <GraduationCap className="w-4 h-4 text-indigo-500" /> Incluir Rúbrica de Evaluación
                                            </label>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={() => handleContentGeneration(tool)}
                                    disabled={loading || !input.trim()}
                                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                                    Generar {tool === 'quiz' ? 'Examen' : 'Contenido'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right: Output / Preview Area */}
                    {tool !== 'chat' && (
                        <div className="flex-1 flex flex-col p-6 bg-white h-full overflow-hidden md:w-7/12">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-purple-600" /> Resultado IA
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                                        disabled={!output}
                                        className={`p-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${isPreviewMode ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        title="Previsualizar formato"
                                    >
                                        {isPreviewMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(output)}
                                        disabled={!output}
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors flex items-center gap-1"
                                        title="Copiar texto"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm overflow-y-auto custom-scrollbar relative">
                                {output ? (
                                    isPreviewMode ? (
                                        // Preview Mode (Rendered Markdown simulation)
                                        <div className="prose prose-indigo prose-sm max-w-none">
                                            {output.split('\n').map((line, i) => {
                                                if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-indigo-700 mt-4 mb-2">{line.replace('## ', '')}</h2>;
                                                if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} className="block mt-2 mb-1">{line.replace(/\*\*/g, '')}</strong>;
                                                if (line.startsWith('- ')) return <li key={i} className="ml-4 text-gray-700">{line.replace('- ', '')}</li>;
                                                return <p key={i} className="mb-2 text-gray-600">{line}</p>;
                                            })}
                                        </div>
                                    ) : (
                                        // Edit/Raw Mode
                                        <textarea
                                            value={output}
                                            readOnly
                                            className="w-full h-full resize-none outline-none text-gray-700 font-mono text-sm leading-relaxed"
                                        />
                                    )
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center p-8">
                                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                                            <Wand2 className="w-8 h-8 opacity-40" />
                                        </div>
                                        <p className="text-sm">Configura las opciones y genera tu contenido.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIToolOverlay;