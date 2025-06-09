import React, { useState } from 'react';
import './AdminInsertBusiness.css';

const AdminInsertBusiness = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        role: '',
        place_id: '',
        user_category_id: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
                user_category_id: formData.user_category_id ? parseInt(formData.user_category_id) : null
            };

            // Add place_id only if it has a value
            if (formData.place_id) {
                submitData.place_id = parseInt(formData.place_id);
            }

            const response = await fetch('https://windowee.com/guest/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to register user');
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
                user_category_id: ''
            });

        } catch (error) {
            console.error('Error registering user:', error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        User Registration
                    </h2>
                    
                    {message && (
                        <div className={`mb-6 p-4 rounded-md ${
                            message.includes('Error') || message.includes('Failed')
                                ? 'bg-red-50 border border-red-200 text-red-700'
                                : 'bg-green-50 border border-green-200 text-green-700'
                        }`}>
                            {message}
                        </div>
                    )}

                    <div onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password *
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                User Role *
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                                <option value="">Select role</option>
                                <option value="business">Business</option>
                                <option value="client">Client</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="place_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    Place ID (Optional)
                                </label>
                                <input
                                    type="number"
                                    id="place_id"
                                    name="place_id"
                                    value={formData.place_id}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter place ID"
                                />
                            </div>

                            <div>
                                <label htmlFor="user_category_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    User Category ID *
                                </label>
                                <input
                                    type="number"
                                    id="user_category_id"
                                    name="user_category_id"
                                    value={formData.user_category_id}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter category ID"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
                                loading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            }`}
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