"use client";
import React from 'react';
import { useParams } from 'next/navigation';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    company: {
        name: string;
    };
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
    phone: string;
    website: string;
}

const UserPage: React.FC = () => {
    const { id } = useParams();
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        if (id) {
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                });
        }
    }, [id]);

    return (
        <div>
            {user ? (
                <div>
                    <h1>Полное имя: {user.name}</h1>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Адрес: {user.address.street}, {user.address.city}</p>
                    <p>Телефон: {user.phone}</p>
                    <p>Вебсайт: {user.website}</p>
                    <p>Компания: {user.company.name}</p>
                </div>
            ) : (
                <p>Загрузка...</p>
            )}
        </div>
    );
};

export default UserPage;