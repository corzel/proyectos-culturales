import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getEnv } from "~/utils/env.server";

export async function loader() {
  return json({ env: getEnv() });
}

export default function EnvTestRoute() {
  const { env } = useLoaderData<typeof loader>();
  
  return (
    <div>
      <h1>Variables de Entorno</h1>
      <pre>{JSON.stringify(env, null, 2)}</pre>
    </div>
  );
}
