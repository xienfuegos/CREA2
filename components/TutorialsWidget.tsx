import React from 'react';
import { Video, ChevronRight } from 'lucide-react';
import { TUTORIALES_DATA } from '../constants';
import { Tutorial } from '../types';

interface TutorialsWidgetProps {
    onStartTutorial: (tutorial: Tutorial) => void;
}

const TutorialsWidget: React.FC<TutorialsWidgetProps> = ({ onStartTutorial }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Video className="w-5 h-5 text-indigo-600" />
                    Tutoriales Rápidos
                </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TUTORIALES_DATA.docente.map((tutorial, idx) => (
                    <div key={idx} className="relative p-5 rounded-xl border border-gray-100 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50">
                        <div className="absolute top-4 right-4">
                            {tutorial.type === 'interactive' ? (
                                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">Interactivo</span>
                            ) : (
                                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">Guía</span>
                            )}
                        </div>
                        <h4 className="font-bold text-gray-800 pr-16 mb-2">{tutorial.title}</h4>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tutorial.desc}</p>
                        <button onClick={() => onStartTutorial(tutorial)} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group">
                            Ver tutorial <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorialsWidget;