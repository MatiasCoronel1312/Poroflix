import { useEffect, useState } from "react";

const DashboardUsers = ({ refreshStats }) => {
  const [users, setUsers] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(`${apiUrl}users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUsers(data);
  };
  return (
    <div className="border border-blue-700 rounded-3xl p-8 mt-10">
      <h2 className=" text-3xl font-bold mb-6">Usuarios</h2>
      <button className="border border-blue-700 px-5 py-2 rounded-xl">
        Ver usuarios
      </button>
      <table className="w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardUsers;
