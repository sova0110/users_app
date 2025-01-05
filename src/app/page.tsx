
import UsersPage from './UsersPage';

const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
      throw new Error('Ошибка при получении данных');
  }
  return response.json();
};

const UsersServerPage: React.FC = async () => {
  const users = await fetchUsers();
  
  return <UsersPage users={users} />;
};

export default UsersServerPage;