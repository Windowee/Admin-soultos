import './Admin.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminLogin from './AdminLogin'; // New authentication component

// Import your admin page components
import AdminOrders from './AdminOrders';
import AdminPayments from './AdminPayments';
import AdminVerifications from './AdminVerifications';

function AdminApp() {
    return (
        <Router>
            <AdminLogin>
                <header>
                    <div className="header-navbar-container">
                        {/* Navigation Bar */}
                        <nav className="navbar">
                            <ul>
                                <li><Link to="/admin/orders">Orders</Link></li>
                                <li><Link to="/admin/payments">Payments</Link></li>
                                <li><Link to="/admin/verifications">Verifications</Link></li>
                            </ul>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main>
                    <Routes>
                        <Route path="/admin/orders" element={<AdminOrders />} />
                        <Route path="/admin/payments" element={<AdminPayments />} />
                        <Route path="/admin/verifications" element={<AdminVerifications />} />
                    </Routes>
                </main>
            </AdminLogin>
        </Router>
    );
}

export default AdminApp;


