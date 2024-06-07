import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const navigate = useNavigate();

    const countries = {
        India: ['Mumbai', 'Delhi', 'Nagpur'],
        Brazil: ['Rio de Janeiro', 'São Paulo', 'Brasília'],
        Australia: ['Sydney', 'Melbourne', 'Perth'],
        China: ['Beijing', 'Shanghai', 'Guangzhou'],
        Germany: ['Berlin', 'Munich', 'Hamburg']
    };

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        phoneNo: "",
        country: "",
        city: "",
        panNumber: "",
        aadharNumber: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(prevPassword => !prevPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm(formData);
        setFormErrors(validationError);
        if (Object.keys(validationError).length === 0) {
            navigate("/success", { state: formData });
        } else {
            setIsFormValid(false);
        }
    };

    useEffect(() => {
        const validationError = validateForm(formData);
        setFormErrors(validationError);
        setIsFormValid(Object.keys(validationError).length === 0);
    }, [formData]);

    // validation logic 
    const validateForm = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.firstName) {
            errors.firstName = "First Name is mandatory";
        }
        if (!values.lastName) {
            errors.lastName = "Last Name is mandatory";
        }
        if (!values.userName) {
            errors.userName = "User Name is mandatory";
        }
        if (!values.email) {
            errors.email = "Email is mandatory";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a proper email id";
        }

        if (!values.password) {
            errors.password = "Password is mandatory";
        } else if (values.password.length < 8) {
            errors.password = "Password must be greater than 8 characters";
        } else if (values.password.length > 15) {
            errors.password = "Password must be less than 15 characters";
        }

        if (!values.phoneNo) {
            errors.phoneNo = "Phone Number is mandatory";
        }

        if (!values.country) {
            errors.country = "Country is mandatory";
        }

        if (!values.city) {
            errors.city = "City is mandatory";
        }

        if (!values.panNumber) {
            errors.panNumber = "Pan Number is mandatory";
        }

        if (!values.aadharNumber) {
            errors.aadharNumber = "Aadhar Number is mandatory";
        }

        return errors;
    };

    return (
        <section className='w-full bg-blue-200 flex items-center justify-center py-4'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-[700px]'>
                <h1 className='text-3xl font-bold text-blue-600 text-center mb-6'>User Form</h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>

                    <div>
                        <label className='block font-semibold mb-1'>First Name </label>
                        <input type="text" name='firstName' value={formData.firstName} placeholder='Enter First Name' onChange={handleChange} className='w-full px-3 py-2 border rounded-lg' />
                        {formErrors.firstName && <p className='text-red-500 text-sm'>{formErrors.firstName}</p>}
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Last Name </label>
                        <input type="text" name='lastName' value={formData.lastName} placeholder='Enter Last Name' onChange={handleChange} className='w-full px-3 py-2 border rounded-lg' />
                        {formErrors.lastName && <p className='text-red-500 text-sm'>{formErrors.lastName}</p>}
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Username </label>
                        <input type="text" name='userName' value={formData.userName} placeholder='Enter Username' onChange={handleChange} className='w-full px-3 py-2 border rounded-lg' />
                        {formErrors.userName && <p className='text-red-500 text-sm'>{formErrors.userName}</p>}
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Email </label>
                        <input type="email" name='email' value={formData.email} placeholder='Enter Email' onChange={handleChange} className='w-full px-3 py-2 border rounded-lg' />
                        {formErrors.email && <p className='text-red-500 text-sm'>{formErrors.email}</p>}
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Password</label>
                        <input type={showPassword ? "text" : "password"} name='password' value={formData.password} placeholder='Enter Password' onChange={handleChange} className='w-full px-3 py-2 border rounded-lg' />
                        <button onClick={handleShowPassword} className='text-blue-500 text-sm'>{showPassword ? "Hide Password" : "Show Password"}</button>
                        {formErrors.password && <p className='text-red-500 text-sm'>{formErrors.password}</p>}
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>PhoneNo. (country code - number)</label>
                        <input type="text" name='phoneNo' value={formData.phoneNo} placeholder='Enter Phone Number' onChange={handleChange} className='w-full px-3 py-2 border rounded-lg' />
                        {formErrors.phoneNo && <p className='text-red-500 text-sm'>{formErrors.phoneNo}</p>}
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Country</label>
                        <select name='country' value={formData.country} onChange={handleChange} className='w-full px-3 py-2 border rounded-lg'>
                            <option value="">Select Country</option>
                            {Object.keys(countries).map(country => <option key={country} value={country}>{country}</option>)}
                        </select>
                        {formErrors.country && <p className='text-red-500 text-sm'>{formErrors.country}</p>}
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>City</label>
                        <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.country} className='w-full px-3 py-2 border rounded-lg'>
                            <option value="">Select City</option>
                            {formData.country && countries[formData.country].map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                        {formErrors.city && <p className='text-red-500 text-sm'>{formErrors.city}</p>}
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Pan No.</label>
                        <input type="text" name='panNumber' value={formData.panNumber} placeholder='Enter Pan Number' onChange={handleChange} className='w-full px-3 py-2 border rounded-lg' />
                        {formErrors.panNumber && <p className='text-red-500 text-sm'>{formErrors.panNumber}</p>}
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Aadhar No.</label>
                        <input type="text" name='aadharNumber' value={formData.aadharNumber} placeholder='Enter Aadhar Number' onChange={handleChange} className='w-full px-3 py-2 border rounded-lg' />
                        {formErrors.aadharNumber && <p className='text-red-500 text-sm'>{formErrors.aadharNumber}</p>}
                    </div>

                    <button className='pointer py-3 px-8 bg-blue-500 text-white font-semibold rounded-lg mt-4' type='submit' disabled={!isFormValid}>Submit</button>
                </form>
            </div>
        </section>
    );
};

export default UserForm;
