import React, { useState } from 'react';
import './AdminInsertBusiness.css';

const AdminInsertBusiness = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        role: '',
        place_id: '',
        user_category_id: '',
        token: ''
    });

    const [loading, setLoading] = useState(false);
    const [tokenLoading, setTokenLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [tokenMessage, setTokenMessage] = useState('');

    // Static data from your database tables
    const places = [
        { id: 1, name: 'Νομός Αττικής', region_id: null },
        { id: 2, name: 'Αθήνα', region_id: null },
        { id: 3, name: 'Πειραιάς', region_id: 2 },
        { id: 4, name: 'Θεσσαλονίκη', region_id: null },
        { id: 5, name: 'Πάτρα', region_id: null }
    ];

    const eventCategories = [
        { id: 1, name: 'FOOD', parent_id: null },
        { id: 5, name: 'ACTIVITIES', parent_id: null },
        { id: 6, name: 'SHOWS', parent_id: null }
    ];

    // Helper function to get category display name with parent
    const getCategoryDisplayName = (category) => {
        if (category.parent_id) {
            const parent = eventCategories.find(cat => cat.id === category.parent_id);
            return parent ? `${parent.name} > ${category.name}` : category.name;
        }
        return category.name;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // For token, only allow digits and limit to 6 characters
        if (name === 'token') {
            const digitOnly = value.replace(/\D/g, '').slice(0, 6);
            setFormData(prev => ({
                ...prev,
                [name]: digitOnly
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleTokenValidation = async () => {
        if (!formData.token || formData.token.length !== 6) {
            setTokenMessage('Please enter a valid 6-digit token');
            return;
        }

        setTokenLoading(true);
        setTokenMessage('');

        try {
            const response = await fetch('https://www.windowee.com/api/v2/guest/auth/register-validation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: parseInt(formData.token) })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Token validation failed');
            }

            const result = await response.json();
            setTokenMessage('Token validated successfully!');

        } catch (error) {
            console.error('Error validating token:', error);
            setTokenMessage(`Token validation error: ${error.message}`);
        } finally {
            setTokenLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Prepare data for submission
            const submitData = {
                email: formData.email,
                name: formData.name,
                password: formData.password,
                role: formData.role,
                user_category_id: parseInt(formData.user_category_id)
            };

            // Add place_id only if it has a value
            if (formData.place_id) {
                submitData.place_id = parseInt(formData.place_id);
            }

            // Add token if provided - convert to number
            if (formData.token) {
                submitData.token = parseInt(formData.token);
            }

            // Log the data being sent for debugging
            console.log('Sending data to API:', submitData);

            const response = await fetch('https://www.windowee.com/api/v2/guest/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error Response:', errorData);
                throw new Error(errorData.message || errorData.error || 'Failed to register user');
            }

            const result = await response.json();
            setMessage(`User "${formData.name}" registered successfully!`);
            
            // Reset form
            setFormData({
                email: '',
                name: '',
                password: '',
                role: '',
                place_id: '',
                user_category_id: '',
                token: ''
            });
            setTokenMessage('');

        } catch (error) {
            console.error('Error registering user:', error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-wrapper">
                <div className="register-card">
                    <h2 className="page-title">
                        User Registration
                    </h2>
                    
                    {message && (
                        <div className={`message ${
                            message.includes('Error') || message.includes('Failed')
                                ? 'error'
                                : 'success'
                        }`}>
                            {message}
                        </div>
                    )}

                    <div className="register-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">
                                User Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select role</option>
                                <option value="business">Business</option>
                                <option value="client">Client</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="place_id">
                                    Place (Optional)
                                </label>
                                <select
                                    id="place_id"
                                    name="place_id"
                                    value={formData.place_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select a place</option>
                                    {places.map(place => (
                                        <option key={place.id} value={place.id}>
                                            {place.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="user_category_id">
                                    Business Category
                                </label>
                                <select
                                    id="user_category_id"
                                    name="user_category_id"
                                    value={formData.user_category_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {eventCategories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {getCategoryDisplayName(category)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Token Validation Section */}
                        <div className="form-group">
                            <label htmlFor="token">
                                6-Digit Token (Optional)
                            </label>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <input
                                    type="text"
                                    id="token"
                                    name="token"
                                    value={formData.token}
                                    onChange={handleInputChange}
                                    maxLength="6"
                                    placeholder="000000"
                                    style={{ 
                                        flex: 1,
                                        textAlign: 'center',
                                        fontSize: '18px',
                                        letterSpacing: '3px'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={handleTokenValidation}
                                    disabled={tokenLoading || !formData.token || formData.token.length !== 6}
                                    style={{
                                        padding: '12px 24px',
                                        backgroundColor: tokenLoading || !formData.token || formData.token.length !== 6 ? '#666' : '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: tokenLoading || !formData.token || formData.token.length !== 6 ? 'not-allowed' : 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        opacity: tokenLoading || !formData.token || formData.token.length !== 6 ? 0.6 : 1
                                    }}
                                >
                                    {tokenLoading ? 'Validating...' : 'Validate'}
                                </button>
                            </div>
                            
                            {tokenMessage && (
                                <div className={`message ${
                                    tokenMessage.includes('error') || tokenMessage.includes('failed') || tokenMessage.includes('Please enter')
                                        ? 'error'
                                        : 'success'
                                }`} style={{ marginTop: '12px', marginBottom: '0' }}>
                                    {tokenMessage}
                                </div>
                            )}
                        </div>

                        <button 
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="submit-button"
                        >
                            {loading ? 'Registering...' : 'Register User'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminInsertBusiness;
