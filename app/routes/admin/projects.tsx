import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export async function loader() {
  const projects = await db.project.findMany();
  return json({ projects });
}

export default function AdminProjectsRoute() {
  const { projects } = useLoaderData<typeof loader>();
  
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Administración de Proyectos</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t">
                <td className="p-3">{project.title}</td>
                <td className="p-3">{project.description}</td>
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
