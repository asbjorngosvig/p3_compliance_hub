import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routers";
import {ConfirmProvider} from "../shared/components/ConfirmDialog.tsx";
import { useState } from "react";
import Loader from "../shared/components/Loader.tsx";

export default function App() {

  const [isLoading,setIsLoading] = useState(false);
  async function login(){
      try {
        
          await fetch("http://localhost:8080/api/users")
      } catch {

      }
  }
  if (isLoading) {
    return Loader;
  }
  return(
    <div onChange={login}>
      <ConfirmProvider>
      <RouterProvider router={router} />
      </ConfirmProvider>
  </div>
  );
}


