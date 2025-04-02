import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export async function loader() {
  const projects = await db.project.findMany();
  return json({ projects });
}

export default function ProjectsRoute() {
  const { projects } = useLoaderData<typeof loader>();
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mis Proyectos Culturales</h1>
      
      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600 mt-2">{project.description}</p>
            <div className="mt-4 flex gap-2">
              <button className="btn btn-primary">Continuar</button>
              <button className="btn btn-outline">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
