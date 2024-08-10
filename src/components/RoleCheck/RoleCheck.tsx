'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RoleCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      router.push('/admin');
    } else if (role === 'user') {
      router.push('/');
    }
    else{
        router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default RoleCheck;