import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const TopBar = () => {
    const [profileOpen, setProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        if (profileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [profileOpen]);

    return (
        <div className="w-full flex items-center justify-between mb-6 bg-white rounded-full px-6 py-3">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
            </div>

            <div className="flex items-center space-x-3">
                <button className="text-gray-500 hover:text-gray-700 p-2 transition-colors" title="Search">
                    <FontAwesomeIcon icon={faSearch} size="lg" />
                </button>

                <button className="text-gray-500 hover:text-gray-700 relative p-2 transition-colors" title="Notifications">
                    <FontAwesomeIcon icon={faBell} size="lg" />
                  
                    <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold border-2 border-white">3</span>
                </button>

                <button className="text-gray-500 hover:text-gray-700 p-2 transition-colors" title="Help">
                    <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
                </button>

              
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm hover:opacity-90 transition-opacity"
                        title="User Profile"
                    >
                        JA
                    </button>
                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50 animate-fadeIn">
                            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                                Account Settings
                            </div>
                            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer text-red-600">
                                Sign Out
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
