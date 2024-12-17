import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "@/lib/auth";
export const client = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
  baseURL: "http://localhost:3000",
});
