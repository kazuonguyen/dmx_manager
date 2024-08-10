'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Initialize customers in localStorage if it doesn't exist
        if (!localStorage.getItem('customers')) {
            const initialCustomers = [
                {"id":1,"name":"Alice Johnson","email":"alice@example.com","phone":"123-456-7890"},
                {"id":2,"name":"Bob Smith","email":"bob@example.com","phone":"234-567-8901"},
                {"id":3,"name":"Charlie Brown","email":"charlie@example.com","phone":"345-678-9012"}
            ];
            localStorage.setItem('customers', JSON.stringify(initialCustomers));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null); // Clear any existing error message
        let role = 'user';

        if (username === 'admin') {
            if (password === 'admin') {
                role = 'admin';
            } else {
                setErrorMessage('Incorrect password for admin.');
                return;
            }
        }

        localStorage.setItem('role', role);

        // Set customer info
        const customerInfo = {
            id: Math.floor(Math.random() * 1000) + 4, // Generate a random ID starting from 4
            name: username,
            email: `${username.toLowerCase()}@example.com`,
            phone: Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')
        };
        localStorage.setItem('customerInfo', JSON.stringify(customerInfo));

        // Add customer to customers array if role is user
        if (role === 'user') {
            const customers = JSON.parse(localStorage.getItem('customers') || '[]');
            customers.push(customerInfo);
            localStorage.setItem('customers', JSON.stringify(customers));
        }

        // Redirect based on role
        if (role === 'admin') {
            router.push('/admin');
        } else {
            router.push('/user');
        }
    };

    return (
        <div className="flex min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {errorMessage && (
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
