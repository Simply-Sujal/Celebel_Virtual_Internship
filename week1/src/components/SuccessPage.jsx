import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const { state } = useLocation();
    const { firstName, lastName, userName, email, phoneNo, country, city, panNumber, aadharNumber } = state || {};

    if (!state) {
        return <div className="text-center text-red-500">No data submitted!</div>;
    }

    return (
        <section className='w-full h-screen flex items-center justify-center bg-green-200'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-lg'>
                <h1 className='text-3xl font-bold text-green-600 text-center mb-6'>Submission Successful</h1>
                <div className='space-y-4'>
                    <p><strong>First Name:</strong> {firstName}</p>
                    <p><strong>Last Name:</strong> {lastName}</p>
                    <p><strong>Username:</strong> {userName}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Phone Number:</strong> {phoneNo}</p>
                    <p><strong>Country:</strong> {country}</p>
                    <p><strong>City:</strong> {city}</p>
                    <p><strong>Pan Number:</strong> {panNumber}</p>
                    <p><strong>Aadhar Number:</strong> {aadharNumber}</p>
                </div>
            </div>
        </section>
    );
};

export default SuccessPage;
