import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
// import { router } from "./router";
import { router } from "./router";
import { AuthProvider } from "./contexts/authContext";
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
