import React, { useState } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { RECURSOS_DATA } from '../constants';

const ResourcesWidget = () => {
    const [activeCategory, setActiveCategory] = useState<string>(RECURSOS_DATA.docente[0].category);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    Caja de Herramientas
                </h3>
            </div>
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 custom-scrollbar">
                {RECURSOS_DATA.docente.map((cat) => (
                    <button
                        key={cat.category}
                        onClick={() => setActiveCategory(cat.category)}
                        className={`whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-full transition-colors flex items-center gap-2 ${
                            activeCategory === cat.category 
                            ? 'bg-indigo-600 text-white shadow-md' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        <cat.icon className="w-3 h-3" />
                        {cat.category}
                    </button>
                ))}
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                {RECURSOS_DATA.docente.find(c => c.category === activeCategory)?.tools.map((tool, idx) => (
                    <div key={idx} className="group p-4 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer">
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-gray-800 group-hover:text-indigo-700">{tool.name}</h4>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{tool.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesWidget;