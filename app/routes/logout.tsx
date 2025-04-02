import { logout } from "~/utils/auth.server";

export async function loader({ request }: { request: Request }) {
  return logout(request);
}
