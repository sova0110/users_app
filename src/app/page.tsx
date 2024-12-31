"use client";
import { useEffect, useState } from 'react';
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

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Загрузка...</div>;
  }

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
          {filteredUsers.map(user => (
            <Card key={user.id} className="relative p-4 w-full border border-black  bg-blue-100 flex flex-col items-center">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;



