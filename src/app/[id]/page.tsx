import React from 'react';
import UserPage from './UserPage';

const fetchUser = async (id: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!response.ok) {
        throw new Error('Ошибка при получении данных');
    }
    return response.json();
};

const UserServerPage: React.FC<{ params: { id: string } }> = async ({ params }) => {
    const user = await fetchUser(params.id); // Здесь используем await, так как это серверный компонент
    
    return <UserPage user={user} />;
};

export default UserServerPage;