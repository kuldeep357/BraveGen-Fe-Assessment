import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faSearch,
    faBell,
    faPlusCircle,
    faHome,
    faUserGroup,
    faTags,
    faPlug,
    faCog,
    faBoxOpen
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [tenantOpen, setTenantOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const tenants = [
        { name: 'Adhesif Labels Ltd', initials: 'AL' },
        { name: 'AIA Services New Zealand Limited', initials: 'AS' },
        { name: 'Air New Zealand Ltd', initials: 'AN' },
        { name: 'All Blacks Organization', initials: 'AB' },
        { name: 'All Hands Demo Limited', initials: 'AH' },
    ];

    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
            {/* Top Bar */}
            <div className="px-8 py-3 flex justify-between items-center border-b border-gray-100">

                {/* Tenant Switcher */}
                <div className="relative">
                    <button
                        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 border border-gray-200 rounded-md px-3 py-1.5 min-w-50 justify-between"
                        onClick={() => setTenantOpen(!tenantOpen)}
                    >
                        <span className="text-sm font-medium">ABC Group Ltd</span>
                        <FontAwesomeIcon icon={faPlusCircle} className="text-gray-400" />
                    </button>

                    {tenantOpen && (
                        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50 animate-fade-in-down">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <div className="flex items-center justify-between text-white bg-green-600 rounded px-3 py-2 cursor-pointer">
                                    <span>ABC Group Ltd</span>
                                    <FontAwesomeIcon icon={faChevronDown} rotation={180} />
                                </div>
                            </div>
                            <div className="px-4 py-2 border-t border-gray-100">
                                <div className="relative">
                                    <input type="text" placeholder="Type to filter..." className="w-full border border-gray-300 rounded pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:border-green-500" />
                                    <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-2.5 text-gray-400 text-xs" />
                                </div>
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                                {tenants.map((t, idx) => (
                                    <div key={idx} className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-8 h-8 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold">{t.initials}</div>
                                        <span className="text-sm text-gray-700">{t.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

              
                <div className="flex items-center space-x-2 text-xl font-semibold text-gray-800">
                    <FontAwesomeIcon icon={faPlug} className="text-gray-400 text-lg" />
                    <span>Integrations</span>
                </div>

               
                <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-gray-600 relative">
                        <FontAwesomeIcon icon={faBell} size="lg" />
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400 transform translate-x-1/4 -translate-y-1/4"></span>
                    </button>

                  
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="w-10 h-10 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-sm hover:opacity-90"
                        >
                            FM
                        </button>
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
                                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">Signed in as <br /><span className="font-bold">Frankie M</span></div>
                                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Your Profile</div>
                                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Sign out</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

           
            <div className="flex pt-4 px-8 space-x-8">
                <div className="flex flex-col space-y-6 w-48 shrink-0">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Organisation</div>
                    <div className="space-y-1">
                        <NavItem icon={faHome} label="Manage" />
                        <NavItem icon={faUserGroup} label="Users" />
                        <NavItem icon={faTags} label="Tags" />
                        <NavItem icon={faPlug} label="Integrations" active />
                    </div>

                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">Utilities</div>
                    <div className="space-y-1">
                        <NavItem icon={faCog} label="Configuration" />
                        <NavItem icon={faUserGroup} label="Hierarchy" />
                        <NavItem icon={faBoxOpen} label="Assets" />
                    </div>

                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">Carbon</div>
                    <div className="space-y-1">
                        <NavItem icon={faCog} label="Configuration" />
                        <NavItem icon={faUserGroup} label="Hierarchy" />
                    </div>
                </div>

                {/* <div className="flex-1">
                </div> */}
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, active }) => (
    <div className={`flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer ${active ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}>
        <FontAwesomeIcon icon={icon} className={active ? 'text-green-600' : 'text-gray-400'} size="sm" />
        <span className={`text-sm font-medium ${active ? 'font-semibold' : ''}`}>{label}</span>
    </div>
);

export { NavItem }; 
export default Header;
