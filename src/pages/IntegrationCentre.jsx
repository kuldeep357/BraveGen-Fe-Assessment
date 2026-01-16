import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlug, faArrowRight, faTrashAlt, faPen, faBolt, faChartBar, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { services } from '../mock-data/mock-data';
import { DeleteModal, EditModal, ViewModal } from '../components/Modals';
import { useIntegrations } from '../hooks/useIntegration';


const ServiceIcon = ({ type, size = 'large' }) => {
    const [imageError, setImageError] = useState(false);
    const isLarge = size === 'large';
    const sizeClass = isLarge ? 'w-12 h-12' : 'w-8 h-8';

    // Check if type is one of the image-based ones and redundant requests aren't made if we know we don't have images for everything yet,
    // but preserving original logic where possible.
    const getImageSrc = () => {
        switch (type) {
            case 'aws': return '/images/image 348.png';
            case 'kafka': return '/images/image 348 copy.png';
            case 'powerbi': return '/images/image 351.png';
            case 'zapier': return '/images/image 348 copy 2.png';
            case 'tableau': return '/images/image 348 copy.png';
            case 'measurabl': return '/images/measurabl_icon.jpeg.png';
            case 'snowflake': return '/images/snowflake_icon.png.png'; // Added Snowflake image path
            default: return null;
        }
    };

    const getFallback = () => {
        switch (type) {
            case 'aws':
                return (
                    <div className={`${sizeClass} bg-blue-600 rounded flex items-center justify-center`}>
                        <FontAwesomeIcon icon={faArrowRight} className="text-white text-xl" />
                    </div>
                );
            case 'kafka':
                return (
                    <div className={`${sizeClass} bg-black rounded flex items-center justify-center`}>
                        <span className="text-white font-bold text-xl">K</span>
                    </div>
                );
            case 'zapier':
                return (
                    <div className={`${sizeClass} bg-orange-500 rounded flex items-center justify-center`}>
                        <FontAwesomeIcon icon={faBolt} className="text-white text-xl" />
                    </div>
                );
            case 'tableau':
                return (
                    <div className={`${sizeClass} bg-red-600 rounded flex items-center justify-center`}>
                        <span className="text-white font-bold text-xl">T</span>
                    </div>
                );
            case 'powerbi':
                return (
                    <div className={`${sizeClass} bg-yellow-500 rounded flex items-center justify-center`}>
                        <FontAwesomeIcon icon={faChartBar} className="text-white text-xl" />
                    </div>
                );
            case 'snowflake':
                return (
                    <div className={`${sizeClass} bg-blue-400 rounded flex items-center justify-center`}>
                        <FontAwesomeIcon icon={faSnowflake} className="text-white text-xl" />
                    </div>
                );
            case 'measurabl':
                return (
                    <div className={`${sizeClass} bg-green-600 rounded flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">m</span>
                    </div>
                );
            default:
                return (
                    <div className={`${sizeClass} bg-gray-500 rounded flex items-center justify-center`}>
                        <FontAwesomeIcon icon={faPlug} className="text-white text-xl" />
                    </div>
                );
        }
    };

    if (imageError || !getImageSrc()) {
        return getFallback();
    }

    return (
        <img
            src={getImageSrc()}
            alt={type}
            className={`${sizeClass} object-contain ${!isLarge ? 'flex-shrink-0' : ''}`}
            onError={() => setImageError(true)}
        />
    );
};


const getServiceIcon = (type) => {
    return <ServiceIcon type={type} size="large" />;
};


const getTableIcon = (type) => {
    return <ServiceIcon type={type} size="small" />;
};

const IntegrationCentre = () => {
    const {
        searchTerm,
        handleSearch,
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedItems,
        handleOpenDelete,
        handleOpenEdit,
        handleOpenView,
        deleteModalOpen,
        setDeleteModalOpen,
        editModalOpen,
        setEditModalOpen,
        viewModalOpen,
        setViewModalOpen,
        selectedItem,
        handleDeleteConfirm,
        handleEditConfirm
    } = useIntegrations();

    const [copiedId, setCopiedId] = useState(null);

    const handleCopyToClipboard = async (url, id) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage <= 3) {

                for (let i = 2; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {

                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="max-w-7xl mx-auto">

            <div className="mb-12">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Choose a Service to Connect</h2>
                <p className="text-sm text-gray-500 mb-6">Connect BraveGen to other tools you use.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center items-center gap-3 mb-4">
                                {getServiceIcon(service.id)}
                                <h3 className="font-bold text-gray-900 text-lg mb-2">{service.name}</h3>
                            </div>
                            <p className="text-sm text-gray-800 h-10 mb-4 line-clamp-2">{service.description}</p>
                            <button className="bg-gray-900 text-white text-xs font-semibold px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                                Add Connection
                            </button>
                        </div>
                    ))}
                </div>
            </div>


            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Existing Connections</h2>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    {/* Search Bar */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="relative max-w-md">
                            <input
                                type="text"
                                placeholder="Integration or Name"
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-brand-green bg-gray-50"
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400 text-sm" />
                        </div>
                    </div>


                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-white border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-500">Integration ↓</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500">Name</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500">Source</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500">Entity/Group</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500">Interval</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500">Connector URL</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-right">Instructions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {paginatedItems.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                            No connections found
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    {getTableIcon(item.type)}
                                                    <span className="text-sm text-gray-700">{item.integration}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-blue-600 hover:underline cursor-pointer font-medium">{item.name}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${item.source === 'Carbon' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : 'bg-blue-100 text-blue-800 border border-blue-300'}`}>
                                                    {item.source}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.entityGroup}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.interval}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleCopyToClipboard(item.connectorUrl, item.id)}
                                                    className="text-gray-900 text-sm cursor-pointer hover:text-blue-700 flex items-center space-x-1 transition-colors p-2 px-5 rounded-md bg-gray-50  border-2 border-gray-200 border-dashed"
                                                >
                                                    <span>{copiedId === item.id ? 'Copied' : 'Copy to clipboard'}</span>
                                                    {copiedId === item.id && (
                                                        <span className="text-green-600 text-xs ml-1">✓</span>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-3">
                                                    <button
                                                        className="text-[#0087ff] bg-[#e4f3ff] p-3 px-6 rounded-md hover:text-blue-800 text-sm font-medium transition-colors"
                                                        title="View"
                                                        onClick={() => handleOpenView(item)}
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        className="text-brand-green hover:text-green-500 transition-colors bg-[#ecffea] p-3 rounded-md"
                                                        onClick={() => handleOpenEdit(item)}
                                                        title="Edit"
                                                    >
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </button>
                                                    <button
                                                        className="text-[#ff4e4e] hover:text-red-500 transition-colors bg-[#ffc5c5] p-3 rounded-md transition-colors"
                                                        onClick={() => handleOpenDelete(item)}
                                                        title="Delete"
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>


                    {totalPages > 0 && (
                        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(c => Math.max(1, c - 1))}
                                className="text-xs font-medium text-gray-500 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ← Previous
                            </button>

                            <div className="flex space-x-1">
                                {getPageNumbers().map((p, idx) => (
                                    p === '...' ? (
                                        <span key={`ellipsis-${idx}`} className="px-2 text-xs text-gray-500">...</span>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => typeof p === 'number' && setCurrentPage(p)}
                                            disabled={typeof p !== 'number'}
                                            className={`min-w-[24px] h-6 px-1 text-xs rounded flex items-center justify-center ${p === currentPage
                                                ? 'bg-gray-100 font-bold text-gray-900'
                                                : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    )
                                ))}
                            </div>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))}
                                className="text-xs font-medium text-gray-500 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </div>
            </div>


            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                connectionName={selectedItem?.name || ''}
                integrationName={selectedItem?.integration || ''}
                onConfirm={handleDeleteConfirm}
            />

            <EditModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                connectionName={selectedItem?.name || ''}
                integrationName={selectedItem?.integration || ''}
                onConfirm={handleEditConfirm}
            />

            <ViewModal
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                connectionName={selectedItem?.name || ''}
                integrationName={selectedItem?.integration || ''}
                details={selectedItem}
            />
        </div>
    );
};

export default IntegrationCentre;
