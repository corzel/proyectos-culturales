import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export async function action({ request }) {
  const formData = await request.formData();
  const project = await db.project.create({
    data: {
      title: formData.get("title"),
      description: formData.get("description"),
    },
  });
  return redirect(`/projects/${project.id}`);
}

export default function NewProjectRoute() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Nuevo Proyecto Cultural</h1>
      
      <Form method="post" className="space-y-4">
        <div>
          <label className="block mb-1">Título del Proyecto</label>
          <input
            type="text"
            name="title"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Descripción</label>
          <textarea
            name="description"
            rows={4}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Crear Proyecto
        </button>
      </Form>
    </div>
  );
}
