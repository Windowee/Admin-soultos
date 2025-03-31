import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch("https://api-web.windowee.com/reservations") // Update the URL if necessary
            .then((response) => response.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error("Error fetching reservations:", error));
    }, []);

    // Filter orders based on reservation name or service title
    const filteredOrders = orders.filter(
        (order) =>
            order.reservation_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.service_title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <input
                type="text"
                placeholder="Search by reservation name or service"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            />
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Service</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Reservation Details</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Client</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <tr key={order.id}>
                                {/* Service */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', verticalAlign: 'top' }}>
                                    {order.service_title}
                                </td>

                                {/* Reservation Details */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', verticalAlign: 'top' }}>
                                    <strong>Date & Time:</strong> {order.selected_time}<br />
                                    <strong>Reservation Name:</strong> {order.reservation_name}<br />
                                    <strong>People:</strong> {order.number_of_people}<br />
                                    <strong>Seats:</strong> {order.seats}<br />
                                    <strong>Payment Method:</strong> {order.pay_at_venue ? "Pay at venue" : "Prepaid"}
                                </td>

                                {/* Client */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', verticalAlign: 'top' }}>
                                    {order.reservation_name}
                                </td>

                                {/* Price */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', verticalAlign: 'top' }}>
                                    <strong>Service Fee:</strong> {order.service_fee}€<br />
                                    <strong>Total:</strong> {order.total_price}€
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>
                                No reservations found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrders;




