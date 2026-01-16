import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronUp,
    faSearch,
    faHome,
    faUserGroup,
    faTags,
    faPlug,
    faCog,
    faBoxOpen,
    faSitemap,
    faList,
    faLeaf,
    faCamera
} from '@fortawesome/free-solid-svg-icons';

const SecondarySidebar = () => {
    const [tenantOpen, setTenantOpen] = useState(false);
    const [filterTerm, setFilterTerm] = useState('');
    const dropdownRef = useRef(null);

    const tenants = [
        { name: 'AL Adhesif Labels Ltd', initials: 'AL' },
        { name: 'AS AIA Services New Zealand Limited', initials: 'AS' },
        { name: 'AN Air New Zealand Ltd', initials: 'AN' },
        { name: 'AB All Blacks Organization', initials: 'AB' },
        { name: 'AH All Hands Demo Limited', initials: 'AH' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setTenantOpen(false);
            }
        };

        if (tenantOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [tenantOpen]);

    const filteredTenants = tenants.filter(t => 
        t.name.toLowerCase().includes(filterTerm.toLowerCase())
    );

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-20 top-0 z-40">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center mb-3">
                    <img src="/images/Logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                    {/* <div className="flex-1 ml-3">
                        <div className="text-sm font-semibold text-gray-900">ABC Group Ltd</div>
                    </div> */}
                </div>
                
               
                <div className="relative" ref={dropdownRef}>
                    <button
                        className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                        onClick={() => setTenantOpen(!tenantOpen)}
                    >
                        <span className="text-sm font-medium text-gray-700">Swathy Corp 2</span>
                        <FontAwesomeIcon icon={tenantOpen ? faChevronUp : faChevronDown} size="sm" className="text-gray-500" />
                    </button>

                    {tenantOpen && (
                        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-md shadow-xl border border-gray-200 py-1 z-50 animate-fadeIn">
                            <div className="px-4 py-2 text-gray-600 text-sm space-y-1 border-b border-gray-100">
                                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Help & Guides</div>
                                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Terms of Use</div>
                                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Privacy Policy</div>
                            </div>
                            <div className="px-4 py-2 border-b border-gray-100">
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Type to filter..." 
                                        className="w-full border border-gray-300 rounded pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:border-brand-green" 
                                        value={filterTerm}
                                        onChange={(e) => setFilterTerm(e.target.value)}
                                    />
                                    <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-2.5 text-gray-400 text-xs" />
                                </div>
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                                {filteredTenants.map((t, idx) => (
                                    <div key={idx} className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                                        <div className="w-8 h-8 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0">{t.initials}</div>
                                        <span className="text-sm text-gray-700 font-medium">{t.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

           
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
                <div>
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Organisation</div>
                    <div className="space-y-1">
                        <NavItem icon={faHome} label="Manage" />
                        <NavItem icon={faUserGroup} label="Users" />
                        <NavItem icon={faTags} label="Tags" />
                        <NavItem icon={faPlug} label="Integrations" active />
                    </div>
                </div>

                <div>
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Utilities</div>
                    <div className="space-y-1">
                        <NavItem icon={faCog} label="Configuration" />
                        <NavItem icon={faSitemap} label="Hierarchy" />
                        <NavItem icon={faBoxOpen} label="Assets" />
                    </div>
                </div>

                <div>
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Carbon</div>
                    <div className="space-y-1">
                        <NavItem icon={faCog} label="Configuration" />
                        <NavItem icon={faSitemap} label="Hierarchy" />
                        <NavItem icon={faList} label="Inventory Items" />
                        <NavItem icon={faLeaf} label="Emission Factors" />
                        <NavItem icon={faCamera} label="Snapshots" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, active }) => (
    <div className={`flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${active ? 'bg-brand-green text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
        <FontAwesomeIcon icon={icon} className={`${active ? 'text-white' : 'text-gray-400'}`} size="sm" fixedWidth />
        <span className={`text-sm font-medium`}>{label}</span>
    </div>
);

export default SecondarySidebar;
