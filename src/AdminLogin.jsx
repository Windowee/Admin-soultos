import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Hardcoded credentials (Note: In a real-world scenario, use secure backend authentication)
    const ADMIN_USERNAME = 'IAM123DA^&*ADMIN"?>BITCHES654';
    const ADMIN_PASSWORD = 'You876gonna(*&never$#@hack!@#da()_password';

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            // Store authentication state (basic approach, not secure for production)
            localStorage.setItem('adminAuthenticated', 'true');
            setError('');
        } else {
            setError('Invalid credentials');
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        // Check if already authenticated from previous session
        const storedAuth = localStorage.getItem('adminAuthenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('adminAuthenticated');
        navigate('/'); // Redirect to home or login page
    };

    // If not authenticated, show login form
    if (!isAuthenticated) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#121212'
            }}>
                <form
                    onSubmit={handleLogin}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '300px',
                        padding: '20px',
                        backgroundColor: '#1e1e1e',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>
                        Admin Login
                    </h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            marginBottom: '10px',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #333',
                            backgroundColor: '#2a2a2a',
                            color: 'white'
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            marginBottom: '10px',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #333',
                            backgroundColor: '#2a2a2a',
                            color: 'white'
                        }}
                    />
                    {error && (
                        <p style={{ color: 'red', textAlign: 'center' }}>
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        style={{
                            padding: '10px',
                            backgroundColor: '#4b0082',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }

    // If authenticated, render children (admin components)
    return (
        <div>
            <button
                onClick={handleLogout}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#ff4500',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Logout
            </button>
            {children}
        </div>
    );
};

export default AdminLogin;