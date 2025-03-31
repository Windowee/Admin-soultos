// src/AdminVerifications.jsx
import React, { useState, useEffect } from 'react';
import './AdminVerifications.css'; // Import the CSS file

const AdminVerifications = () => {
    const [withdraws, setWithdraws] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch withdraws from the backend on component mount
    useEffect(() => {
        const fetchWithdraws = async () => {
            try {
                const response = await fetch('https://api-web.windowee.com/withdraws-requests');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // Ensure amount_withdraw is a number
                const enrichedData = data.map(item => ({
                    ...item,
                    amount_withdraw: item.amount_withdraw ? Number(item.amount_withdraw) : 0,
                }));
                setWithdraws(enrichedData);
            } catch (error) {
                console.error('Error fetching withdraws:', error);
            }
        };
        fetchWithdraws();
    }, []);

    // Function to toggle status from unpaid to payed
    const toggleStatus = async (id) => {
        try {
            const response = await fetch(`https://api-web.windowee.com/withdraws-requests/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'payed' }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            // Update the local state to reflect the change
            setWithdraws(withdraws.map(withdraw =>
                withdraw.id === id ? { ...withdraw, status: 'payed' } : withdraw
            ));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status. Please try again.');
        }
    };

    // Filter withdraws based on search term (searching by user_id as a string)
    const filteredWithdraws = withdraws.filter(withdraw =>
        String(withdraw.user_id).includes(searchTerm)
    );

    return (
        <div className="verifications-container">
            <input
                type="text"
                placeholder="Search by User ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <table className="business-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredWithdraws.length > 0 ? (
                        filteredWithdraws.map((withdraw) => (
                            <tr key={withdraw.id}>
                                <td style={{ color: 'black', fontWeight: 'bold' }}>{withdraw.user_id}</td>
                                <td>${withdraw.amount_withdraw.toFixed(2)}</td>
                                <td>{new Date(withdraw.created_at).toLocaleDateString()}</td>
                                <td>
                                    {withdraw.status === 'unpaid' ? (
                                        <button
                                            onClick={() => toggleStatus(withdraw.id)}
                                            style={{
                                                padding: '5px 10px',
                                                backgroundColor: '#FF5733',
                                                color: 'white',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Mark as Paid
                                        </button>
                                    ) : (
                                        <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>Payed</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                No withdraws found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminVerifications;

