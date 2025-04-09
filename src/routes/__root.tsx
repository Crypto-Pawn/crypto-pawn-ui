import { createRootRouteWithContext } from '@tanstack/react-router';
import { EntryPoint } from '@/components/EntryPoint';

export const Route = createRootRouteWithContext()({
  component: EntryPoint,
});
