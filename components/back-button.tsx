// components/BackButtonClient.js
'use client'; // This directive is necessary for client components in Next.js 13 app directory

import { ArrowLeftCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack}>
      <ArrowLeftCircle className='h-4 w-4' />
    </button>
  );
};

export default BackButton;
