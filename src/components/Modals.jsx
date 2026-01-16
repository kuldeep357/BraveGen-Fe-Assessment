import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export const Modal = ({ isOpen, onClose, title, children, icon, iconColor, actions }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-scaleIn border border-gray-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <div className="flex flex-col items-start">
                    {icon && (
                        <div className={`w-16 h-16 rounded-full ${iconColor} flex items-center justify-center mb-4`}>
                            <FontAwesomeIcon icon={icon} className="text-white text-2xl" />
                        </div>
                    )}

                    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>

                    <div className="text-sm text-gray-500 mb-6 w-full">
                        {children}
                    </div>

                    <div className="flex items-center justify-between w-full space-x-4">
                        {actions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const DeleteModal = ({ isOpen, onClose, connectionName, integrationName, onConfirm }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Remove "${connectionName}" Connection?`}
            icon={faTimes}
            iconColor="bg-red-500"
            actions={
                <>
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                    >
                        Undo
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-medium shadow-sm"
                    >
                        Remove
                    </button>
                </>
            }
        >
            <p>Are you sure you want to remove {integrationName || 'Amazon QuickSight'} "{connectionName}" connection?</p>
        </Modal>
    );
};

export const EditModal = ({ isOpen, onClose, connectionName, integrationName, onConfirm }) => {
    // In a real app, you'd manage local state here for the form fields
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Edit Connection: ${connectionName}`}
            icon={faExclamationTriangle}
            iconColor="bg-yellow-400"
            actions={
                <>
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 font-medium shadow-sm"
                    >
                        Save Changes
                    </button>
                </>
            }
        >
            <div className="w-full space-y-4 text-left">
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-xs text-yellow-800 mb-4">
                    Edit details for {integrationName} connection. Changes may affect data sync.
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Connection Name
                    </label>
                    <input
                        type="text"
                        defaultValue={connectionName}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Configuration / API Key
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••••••••••"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave blank to keep existing configuration.</p>
                </div>
            </div>
        </Modal>
    );
};

export const ViewModal = ({ isOpen, onClose, connectionName, integrationName, details }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`View Connection: ${connectionName}`}
            icon={null}
            iconColor="bg-blue-400"
            actions={
                <button
                    onClick={onClose}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm"
                >
                    Close
                </button>
            }
        >
            <div className="space-y-2 text-left">
                <p><strong>Integration:</strong> {integrationName}</p>
                <p><strong>Name:</strong> {connectionName}</p>
                <p><strong>Source:</strong> {details?.source}</p>
                <p><strong>Entity/Group:</strong> {details?.entityGroup}</p>
                <p><strong>Interval:</strong> {details?.interval}</p>
                <p><strong>Connector URL:</strong> <a href={details?.connectorUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline truncate block">{details?.connectorUrl}</a></p>
            </div>
        </Modal>
    );
};
