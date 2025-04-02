import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getUser } from "~/utils/auth.server";

export async function loader({ request }: { request: Request }) {
  const user = await getUser(request);
  return json({ user });
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Bienvenido</h1>
      
      {user ? (
        <div>
          <p>Hola {user.email}!</p>
          <div className="mt-4 space-x-4">
            <Link to="/logout" className="text-blue-500 hover:underline">
              Cerrar sesión
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" className="text-blue-500 hover:underline">
                Panel de administración
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Iniciar sesión
          </Link>
          <Link to="/register" className="text-blue-500 hover:underline">
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
}
