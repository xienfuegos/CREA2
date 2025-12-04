import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { academicEvents2025 } from '../constants';

const CalendarWidget = () => {
    const sortedEvents = [...academicEvents2025].sort((a, b) => a.start.getTime() - b.start.getTime());
    
    const getEventColor = (type: string) => {
        switch(type) {
            case 'cuatrimestre': return 'bg-blue-100 text-blue-800 border-l-4 border-blue-500';
            case 'inscripcion': return 'bg-green-100 text-green-800 border-l-4 border-green-500';
            case 'examen': return 'bg-red-100 text-red-800 border-l-4 border-red-500';
            case 'evaluacion': return 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500';
            default: return 'bg-gray-100 text-gray-800 border-l-4 border-gray-500';
        }
    };

    const formatDate = (date: Date) => date.toLocaleDateString('es-AR', { day: 'numeric', month: 'long' });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    Calendario Académico 2025
                </h3>
                <span className="text-xs font-medium px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">Actualizado</span>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {sortedEvents.map((event, index) => (
                    <div key={index} className={`p-3 rounded-md text-sm ${getEventColor(event.type)} transition-all hover:translate-x-1`}>
                        <div className="font-bold">{event.title}</div>
                        <div className="flex items-center gap-1 mt-1 opacity-90 text-xs">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(event.start)} - {formatDate(event.end)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarWidget;