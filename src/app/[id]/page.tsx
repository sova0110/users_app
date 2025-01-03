"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

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

const Skeleton: React.FC = () => (
    <Card className="relative p-4 w-full bg-yellow-200 flex flex-col items-center animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-1 w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded mb-1 w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded mb-1 w-1/2"></div>
  </Card>
);

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
        <div className="flex items-center justify-center w-screen h-screen bg-blue-700">
        {user ? (
            <div className="w-11/12 md:w-1/2 lg:w-2/5">
                <Card className="p-4 bg-yellow-200 shadow-md rounded-lg flex flex-col items-center">
                    <h1 className="text-lg font-bold text-center">Полное имя: {user.name}</h1>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Адрес: {user.address.street}, {user.address.city}</p>
                    <p>Телефон: {user.phone}</p>
                    <p>Вебсайт: {user.website}</p>
                    <p>Компания: {user.company.name}</p>
                    <Link href={`/`}>
                        <Button className="bg-red-400 text-white hover:bg-green-600 hover:text-yellow-400 p-2 rounded">
                        Назад
                        </Button>
                    </Link>
                </Card>
            </div>
        ) : (
            <div className="w-11/12 md:w-1/2 lg:w-2/5">
                <Card className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
                    <Skeleton />
                </Card>
            </div>
        )}
            <img 
                src="https://svgsilh.com/svg/147392.svg" 
                alt="Pic_corner"
                className="absolute bottom-0 left-0 w-[300px] h-[300px]"
            />
    </div>
    );
};

export default UserPage;