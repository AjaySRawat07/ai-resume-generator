'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CheckUserClient = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/sign-in');
      }
    }
  }, [isLoaded, user, router]);

  return <></>
};

export default CheckUserClient;
