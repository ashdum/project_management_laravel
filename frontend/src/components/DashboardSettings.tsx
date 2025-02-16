import React, { useState } from 'react';
import { Settings, Image as ImageIcon, X } from 'lucide-react';
import { Dashboard } from '../types';

const PREDEFINED_BACKGROUNDS = [
  {
    id: 'bg1',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80',
    name: 'Gradient 1',
  },
  {
    id: 'bg2',
    url: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5',
    thumbnail: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=200&q=80',
    name: 'Gradient 2',
  },
  {
    id: 'bg3',
    url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d',
    thumbnail: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=200&q=80',
    name: 'Gradient 3',
  },
  {
    id: 'bg4',
    url: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb',
    thumbnail: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=200&q=80',
    name: 'Gradient 4',
  },
  {
    id: 'bg5',
    url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85',
    thumbnail: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=200&q=80',
    name: 'Gradient 5',
  },
  {
    id: 'bg6',
    url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d',
    thumbnail: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=200&q=80',
    name: 'Gradient 6',
  },
  {
    id: 'bg7',
    url: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf',
    thumbnail: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=200&q=80',
    name: 'Gradient 7',
  },
  {
    id: 'bg8',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80',
    name: 'Gradient 8',
  }
];

interface DashboardSettingsProps {
  dashboard: Dashboard;
  onUpdateBackground: (background: string) => void;
}

const DashboardSettings: React.FC<DashboardSettingsProps> = ({
  dashboard,
  onUpdateBackground,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="ml-auto">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          title="Dashboard Settings"
        >
          <Settings size={20} />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-end z-50">
          <div className="w-80 h-full bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Dashboard Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <ImageIcon size={16} />
                Background
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {PREDEFINED_BACKGROUNDS.map(bg => (
                  <button
                    key={bg.id}
                    onClick={() => onUpdateBackground(bg.url)}
                    className={`relative aspect-video rounded-lg overflow-hidden group ${
                      dashboard.background === bg.url ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={bg.thumbnail}
                      alt={bg.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-medium">
                        {bg.name}
                      </span>
                    </div>
                    {dashboard.background === bg.url && (
                      <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                        <span className="w-3 h-3 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSettings;