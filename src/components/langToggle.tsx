'use client';

import { Link, usePathname } from '@/navigation';

export const LangToggle = () => {
  const pathname = usePathname();

  return (
    <>
      <div className='flex space-x-10'>
        <Link href={pathname} locale='en'>
          🏴󠁧󠁢󠁥󠁮󠁧󠁿 English
        </Link>
        <Link href={pathname} locale='zh'>
          🇫🇷 中文
        </Link>
      </div>
    </>
  );
};
