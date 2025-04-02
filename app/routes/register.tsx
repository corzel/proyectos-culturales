import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { register, createUserSession } from "~/utils/auth.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await register({ email, password });
    return createUserSession(user.id, "/");
  } catch (error) {
    return json({ error: (error as Error).message }, { status: 400 });
  }
}

export default function Register() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Registrarse</h1>
      <Form method="post" className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            className="w-full p-2 border rounded"
          />
        </div>
        {actionData?.error && (
          <div className="text-red-500">{actionData.error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Registrarse
        </button>
      </Form>
    </div>
  );
}
