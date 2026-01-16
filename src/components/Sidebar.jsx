import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faBoxOpen,
    faThumbsUp,
    faLeaf,
    faBolt,
    faFileAlt,
    faPlayCircle,
    faCog
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const menuItems = [
        { icon: faChartLine, label: 'Insights' },
        { icon: faBoxOpen, label: 'Collect' },
        { icon: faThumbsUp, label: 'Reviews' },
        { icon: faLeaf, label: 'Carbon' },
        { icon: faBolt, label: 'Utilities' },
        { icon: faFileAlt, label: 'Reports' },
        { icon: faPlayCircle, label: 'Actions' },
    ];

    return (
        <div className="w-20 bg-gray-900 h-screen flex flex-col items-center py-6 text-gray-400 fixed left-0 top-0 z-50">
            <div className="mb-10 text-white">
                <img src="/images/Logo.png" alt="BraveGen Logo" className="w-10 h-10 object-contain" />
            </div>

            <div className="flex-1 w-full space-y-3 flex flex-col items-center justify-center">
                {menuItems.map((item, index) => (
                    <div key={index} className={`flex flex-col items-center space-y-1 cursor-pointer hover:text-white transition-colors group ${item.active ? 'text-white' : ''}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.active ? 'bg-gray-800' : 'group-hover:bg-gray-800'} transition-all`}>
                            <FontAwesomeIcon icon={item.icon} size="lg" />
                        </div>
                        <span className="text-[10px] font-medium">{item.label}</span>
                        {item.active && <div className="absolute left-0 w-1 h-8 bg-brand-green rounded-r-md" />}
                    </div>
                ))}
            </div>

            <div className="mt-auto cursor-pointer">
                <div className="flex flex-col items-center space-y-1">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center">
                        <FontAwesomeIcon icon={faCog} size="lg" className="text-brand-green" />
                    </div>
                    <span className="text-[10px] font-medium text-brand-green">Settings</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
