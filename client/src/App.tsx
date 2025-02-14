import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useMeStore } from "@/stores/useMeStore";
import { useEffect } from "react";

function App() {
  const { isAuthenticated, getMe } = useMeStore();

  useEffect(() => {
    if (isAuthenticated) {
      getMe();
    }
  }, [isAuthenticated, getMe]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
      <Toaster position="top-center" expand={false} richColors />
    </ThemeProvider>
  );
}

export default App;
