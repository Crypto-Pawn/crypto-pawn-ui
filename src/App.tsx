import {RouterProvider} from "@tanstack/react-router";
import {router} from "@/routes/router.tsx";

export function App() {
  return <RouterProvider router={router} />;
}
