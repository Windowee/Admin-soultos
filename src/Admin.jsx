import './Admin.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminLogin from './AdminLogin'; // New authentication component
import SharePage from './SharePage';
// Import your admin page components
import AdminOrders from './AdminOrders';
import AdminPayments from './AdminPayments';
import AdminVerifications from './AdminVerifications';
import AdminInsertBusiness from './AdminInsertBusiness'; // New import

function AdminApp() {
    return (
        <Router>
            <Routes>
                {/* SharePage route outside of AdminLogin and header */}
                <Route path="assets/admin/event/:id" element={<SharePage />} />

                {/* Public Insert Business route (no authentication required) */}
                <Route path="/admin/insert-business" element={<AdminInsertBusiness />} />

                {/* Admin routes wrapped in AdminLogin */}
                <Route
                    path="/admin/*"
                    element={
                        <AdminLogin>
                            <header>
                                <div className="header-navbar-container">
                                    {/* Navigation Bar */}
                                    <nav className="navbar">
                                        <ul>
                                            <li><Link to="/admin/orders">Orders</Link></li>
                                            <li><Link to="/admin/payments">Payments</Link></li>
                                            <li><Link to="/admin/verifications">Verifications</Link></li>
                                            <li><Link to="/admin/insert-business">Insert Business</Link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </header>

                            {/* Main Content */}
                            <main>
                                <Routes>
                                    <Route path="orders" element={<AdminOrders />} />
                                    <Route path="payments" element={<AdminPayments />} />
                                    <Route path="verifications" element={<AdminVerifications />} />
                                </Routes>
                            </main>
                        </AdminLogin>
                    }
                />
            </Routes>
        </Router>
    );
}

export default AdminApp;


