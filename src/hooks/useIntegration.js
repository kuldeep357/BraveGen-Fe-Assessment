import { useState, useMemo } from 'react';
import { integrations as initialIntegrations } from '../mock-data/mock-data';

export const useIntegrations = () => {
    const [integrations, setIntegrations] = useState(initialIntegrations);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const itemsPerPage = 5;

    const filteredIntegrations = useMemo(() => {
        return integrations.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.integration.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [integrations, searchTerm]);

    const totalPages = Math.ceil(filteredIntegrations.length / itemsPerPage);
    const paginatedItems = filteredIntegrations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleOpenDelete = (item) => {
        setSelectedItem(item);
        setDeleteModalOpen(true);
    };

    const handleOpenEdit = (item) => {
        setSelectedItem(item);
        setEditModalOpen(true);
    };

    const handleOpenView = (item) => {
        setSelectedItem(item);
        setViewModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        // In a real app, this would delete from the backend. 
        // Here we just update local state to simulate deletion.
        if (selectedItem) {
            setIntegrations(prev => prev.filter(i => i.id !== selectedItem.id));
        }
        setDeleteModalOpen(false);
        setSelectedItem(null);
    };

    const handleEditConfirm = () => {
        setEditModalOpen(false);
        setSelectedItem(null);
    };

    return {
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
        setSelectedItem,
        handleDeleteConfirm,
        handleEditConfirm
    };
};
