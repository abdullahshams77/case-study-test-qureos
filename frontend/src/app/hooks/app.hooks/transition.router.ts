import { useTransitioning } from '@/app/context/transition.context';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

const useTransitionRouter = () => {
  const router = useRouter();
  const { startTheTransition, stopTheTransition } = useTransitioning();

  const push = (url: string, as?: string, options?: any) => {
    startTheTransition(); // Start the loading or transition process
    startTransition(() => {
      router.push(url); // Perform navigation
      stopTheTransition(); // Stop loading after navigation
    });
  };

  return { push, prefetch : router.prefetch, back: router.back };
};

export default useTransitionRouter;