import React, { useState } from 'react';
import { Plus, Layout } from 'lucide-react';
import { useBoardStore } from '../store';

interface Props {
  onDashboardSelect: (dashboardId: string) => void;
}

const DashboardList: React.FC<Props> = ({ onDashboardSelect }) => {
  const [newDashboardTitle, setNewDashboardTitle] = useState('');
  const { dashboards, addDashboard } = useBoardStore();

  const handleCreateDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDashboardTitle.trim()) {
      addDashboard(newDashboardTitle);
      setNewDashboardTitle('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Dashboards</h2>
        <form onSubmit={handleCreateDashboard} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newDashboardTitle}
            onChange={(e) => setNewDashboardTitle(e.target.value)}
            placeholder="New dashboard name..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Create Dashboard
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboards.map((dashboard) => (
          <button
            key={dashboard.id}
            onClick={() => onDashboardSelect(dashboard.id)}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <Layout className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">{dashboard.title}</h3>
            </div>
            <p className="text-sm text-gray-500">
              Created on {new Date(dashboard.createdAt).toLocaleDateString()}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardList;