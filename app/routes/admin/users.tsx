import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export async function loader() {
  const users = await db.user.findMany();
  return json({ users });
}

export default function AdminUsersRoute() {
  const { users } = useLoaderData<typeof loader>();
  
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Administración de Usuarios</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Rol</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <button className="btn btn-sm btn-outline mr-2">
                    Editar
                  </button>
                  <button className="btn btn-sm btn-error">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
