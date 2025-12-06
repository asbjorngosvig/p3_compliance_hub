import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routers";
import {ConfirmProvider} from "../shared/components/ConfirmDialog.tsx";

export default function App() {

  return(
      <ConfirmProvider>
      <RouterProvider router={router} />
      </ConfirmProvider>
  );
}


