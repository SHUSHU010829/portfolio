'use client';

import { useRouter } from 'next/navigation';

export const Link = () => {
  const router = useRouter();

  return (
    <>
      <div
        className='flex cursor-pointer items-center'
        onClick={() => {
          router.push('https://github.com/SHUSHU010829');
        }}
      >
        <div className='rounded-full border border-stone-800 bg-stone-800 p-3'>
          {/* <LinkIcon className='size-6  text-white' /> */}
        </div>
        <div className='rounded-3xl border border-stone-800 px-10 py-2 text-2xl font-bold'>
          GITHUB
        </div>
      </div>
      <div
        className='flex cursor-pointer items-center'
        onClick={() => {
          router.push('https://github.com/SHUSHU010829');
        }}
      >
        <div className='rounded-full border border-stone-800 bg-stone-800 p-3'>
          {/* <LinkIcon className='size-6  text-white' /> */}
        </div>
        <div className='rounded-3xl border border-stone-800 px-10 py-2 text-2xl font-bold'>
          GITHUB
        </div>
      </div>
    </>
  );
};
