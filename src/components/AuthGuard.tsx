import { useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { cn } from "@/libs/style.ts";
import { useNavigate } from '@tanstack/react-router';

type AuthGuardProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

export const AuthGuard = ({ children, redirectTo = '/' }: AuthGuardProps) => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-redirect after a delay if not authenticated
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        navigate({ to: redirectTo });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  if (!isAuthenticated) {
    return (
      <section className={cn("bg-black text-white px-6 py-12 font-Arimo")}>
        <div className="p-4 space-y-4">
          <div className="flex items-center">
            <div className="mr-4 text-3xl">🔒</div>
            <div>
              <h2 className="text-xl font-semibold">Authentication Required</h2>
              <p className="text-yellow-500">Please log in to access this page</p>
            </div>
          </div>
          <p className="text-zinc-400">Redirecting to home page shortly...</p>
        </div>
      </section>
    );
  }

  return <>{children}</>;
};