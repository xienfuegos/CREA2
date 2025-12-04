import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { Tutorial } from '../types';

interface TutorialOverlayProps {
    tutorial: Tutorial;
    onClose: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ tutorial, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const isInteractive = tutorial.type === 'interactive';
    const totalSteps = isInteractive ? (tutorial.steps?.length || 0) : 1;

    // For interactive tutorials, we simulate a "hotspot" highlight
    const stepData = isInteractive ? tutorial.steps?.[currentStep] : null;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Simulated Hotspot for Interactive Mode */}
            {isInteractive && stepData && (
                <div 
                    className="absolute border-4 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)] rounded-lg pointer-events-none transition-all duration-500 z-40 animate-pulse"
                    style={{
                        top: stepData.hotspot.top,
                        left: stepData.hotspot.left,
                        right: stepData.hotspot.right,
                        width: stepData.hotspot.width,
                        height: stepData.hotspot.height,
                        transform: stepData.hotspot.transform
                    }}
                />
            )}

            {/* Modal Card */}
            <div className="relative z-50 bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-fade-in mx-4">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 flex justify-between items-start text-white">
                    <div>
                        <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wide mb-2 inline-block">
                            {tutorial.type === 'interactive' ? 'Tutorial Interactivo' : 'Guía de Lectura'}
                        </span>
                        <h2 className="text-xl font-bold">{tutorial.title}</h2>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {isInteractive && stepData ? (
                        <div>
                            <div className="mb-4 text-sm font-semibold text-gray-400 uppercase tracking-wide">
                                Paso {currentStep + 1} de {totalSteps}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-3">{stepData.text}</h3>
                            <p className="text-gray-600">Sigue las instrucciones resaltadas en la pantalla.</p>
                            
                            {/* Mock Visual Aid for Context */}
                            <div className="mt-6 bg-gray-100 p-4 rounded-lg border border-gray-200 text-xs text-gray-500 italic">
                                Nota: En una aplicación real, el sistema detectaría si has realizado la acción correctamente. 
                                En esta demo, pulsa "Siguiente" para continuar.
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-gray-600 mb-4">{tutorial.desc}</p>
                            {tutorial.content?.map((block, idx) => (
                                <div key={idx}>
                                    {block.type === 'h3' && <h3 className="text-lg font-bold text-gray-800 mt-4 mb-2">{block.text}</h3>}
                                    {block.type === 'h4' && <h4 className="font-semibold text-gray-800 mt-3 mb-1">{block.text}</h4>}
                                    {block.type === 'p' && <p className="text-gray-600 leading-relaxed">{block.text}</p>}
                                    {block.type === 'ul' && (
                                        <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-600">
                                            {block.items?.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                    {isInteractive ? (
                        <>
                            <button 
                                onClick={handlePrev} 
                                disabled={currentStep === 0}
                                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" /> Anterior
                            </button>
                            
                            <div className="flex gap-1">
                                {Array.from({ length: totalSteps }).map((_, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentStep ? 'bg-indigo-600 w-4' : 'bg-gray-300'}`} />
                                ))}
                            </div>

                            <button 
                                onClick={handleNext}
                                className="flex items-center gap-1 px-5 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md transition-all hover:translate-x-1"
                            >
                                {currentStep === totalSteps - 1 ? 'Finalizar' : 'Siguiente'}
                                {currentStep === totalSteps - 1 ? <CheckCircle className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </button>
                        </>
                    ) : (
                        <div className="flex justify-end w-full">
                            <button 
                                onClick={onClose}
                                className="px-5 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md transition-all"
                            >
                                Entendido
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorialOverlay;