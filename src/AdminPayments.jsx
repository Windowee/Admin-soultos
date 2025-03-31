import React, { useState, useEffect } from 'react';

const AdminPayments = () => {
    const [bankDetails, setBankDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch bank details from the backend on component mount
    useEffect(() => {
        const fetchBankDetails = async () => {
            try {
                const response = await fetch('https://api-web.windowee.com/bank-details', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // Ensure amount_to_be_paid is a number
                const enrichedData = data.map(item => ({
                    ...item,
                    amount_to_be_paid: item.amount_to_be_paid ? Number(item.amount_to_be_paid) : 0,
                }));
                setBankDetails(enrichedData);
            } catch (error) {
                console.error('Error fetching bank details:', error);
            }
        };
        fetchBankDetails();
    }, []);

    // Filter bank details based on search term
    const filteredBankDetails = bankDetails.filter(detail =>
        detail.beneficiary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        detail.bank_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <input
                type="text"
                placeholder="Search by Beneficiary or Bank Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            />
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>User ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Amount</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Payment & Bank Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBankDetails.length > 0 ? (
                        filteredBankDetails.map((detail) => (
                            <tr key={detail.id}>
                                {/* User ID Column */}
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    {detail.user_id}
                                </td>

                                {/* Amount Column */}
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    ${detail.amount_to_be_paid.toFixed(2)}
                                </td>

                                {/* Combined Payment & Bank Details Column */}
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    <strong>Beneficiary:</strong> {detail.beneficiary || 'N/A'}<br />
                                    <strong>IBAN:</strong> {detail.iban || 'N/A'}<br />
                                    <strong>Bank Name:</strong> {detail.bank_name || 'N/A'}<br />
                                    <strong>BIC:</strong> {detail.bic_code || 'N/A'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>
                                No bank details found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPayments;