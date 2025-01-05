"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

interface UsersPageProps {
    users: User[];
}

const Skeleton: React.FC = () => (
    <Card className="relative p-4 w-full border border-black bg-blue-100 flex flex-col items-center animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-1 w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded mb-1 w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded mb-1 w-1/2"></div>
    </Card>
);

const UsersPage: React.FC<UsersPageProps> = ({ users }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const isLoading = users.length === 0;

    return (
        <div className="bg-blue-200 w-screen h-screen">
            <div className="bg-blue-200">
                <h1 className="text-center text-2xl font-Georgia">Список пользователей</h1>
                <input
                    type="text"
                    placeholder="Поиск по имени"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border border-black w-1/2 mx-auto block"
                />
                <div className="m-4 bg-blue-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} />
                        ))
                    ) : filteredUsers.length === 0 ? (
                        <div className="text-center">Нет пользователей для отображения</div>
                    ) : (
                        filteredUsers.map(user => (
                            <Card key={user.id} className="relative p-4 w-full border border-black bg-blue-100 flex flex-col items-center">
                                <h2>{user.name}</h2>
                                <p>Email: {user.email}</p>
                                <p>Компания: {user.company.name}</p>
                                <Link href={`/${user.id}`}>
                                    <Button className="bg-blue-400 text-white hover:bg-blue-600 hover:text-yellow-400 p-2 rounded">
                                        Подробнее
                                    </Button>
                                </Link>
                                <img src="https://cdn.icon-icons.com/icons2/1496/PNG/512/hibernate_103391.png" className="absolute bottom-2 right-2 w-12 h-12" alt="Snowflake" />
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsersPage;