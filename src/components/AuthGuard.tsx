import { useAuthContext } from '@/context/AuthContext';
import {cn} from "@/libs/style.ts";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthContext();
  console.log('hehe ko hack dc dau bro');
  if (!isAuthenticated) {
    return (
      <section className={cn("bg-black text-white px-6 py-12 font-Arimo")}>
        <div className="p-4 space-y-2">
          <p className="text-yellow-500">🔒 Please log in to access this page</p>
        </div>
      </section>

    );
  }

  return <>{children}</>;
};
