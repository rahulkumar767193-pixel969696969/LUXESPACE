
import React from 'react';
import { DesignHistoryItem } from '../types';

interface HistoryProps {
  history: DesignHistoryItem[];
  onDelete: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, onDelete }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Your Design History</h1>
          <p className="text-gray-600">Revisit and manage your previous AI transformations.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-lg">
          <span className="text-indigo-600 font-bold">{history.length}</span> <span className="text-indigo-400 text-sm">Designs</span>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="bg-white p-20 rounded-3xl shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-history text-3xl text-gray-200"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No history yet</h2>
          <p className="text-gray-500">Your generated room designs will appear here.</p>
          <a href="/" className="inline-block mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Start Generating</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {history.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 group">
              <div className="relative h-48 overflow-hidden">
                <img src={item.afterImage} alt="Design Result" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="w-8 h-8 bg-red-500/90 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-md backdrop-blur-sm transition-colors"
                  >
                    <i className="fas fa-trash-alt text-xs"></i>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">{item.styleType}</span>
                  <h3 className="text-white font-bold mt-1">{item.roomType}</h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span className="flex items-center gap-1"><i className="far fa-calendar-alt"></i> {item.timestamp}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button className="py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">View Details</button>
                  <button className="py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors">Download</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
