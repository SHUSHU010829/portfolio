import Link from 'next/link';
import { useTranslations } from 'next-intl';

import {
  FileDown,
  Github,
  HomeIcon,
  Linkedin,
  Mail,
  PencilIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Dock, DockIcon } from '@/components/magicui/dock';

export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = {
  navbar: [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '#', icon: PencilIcon, label: 'Blog' },
  ],
  contact: {
    social: {
      GitHub: {
        name: 'GitHub',
        url: 'https://github.com/SHUSHU010829',
        icon: Github,
      },
      LinkedIn: {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/shuyuanchuang',
        icon: Linkedin,
      },
      email: {
        name: 'Send Email',
        url: 'mailto: shuyuan010829@gmail.com',
        icon: Mail,
      },
    },
  },
  action: [{ href: '#', icon: FileDown, label: 'Download Resume' }],
};

export default function Home() {
  const t = useTranslations('Resume');

  return (
    <main className='flex flex-col bg-[#f3f3f3] p-10 font-sans'>
      <article className='entry heti'>
        <h1>{t('name')}</h1>
        <p>噗噗</p>
      </article>
      <Dock direction='middle'>
        {DATA.navbar.map(item => (
          <DockIcon key={item.href}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'size-12 rounded-full'
                    )}
                  >
                    <item.icon className='size-4' />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DockIcon>
        ))}
        <Separator orientation='vertical' className='h-full' />
        {Object.entries(DATA.contact.social).map(([name, social]) => (
          <DockIcon key={name}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'size-12 rounded-full'
                    )}
                  >
                    <social.icon className='size-4' />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DockIcon>
        ))}
        <Separator orientation='vertical' className='h-full py-2' />
        {DATA.action.map(item => (
          <DockIcon key={item.href}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'size-12 rounded-full'
                    )}
                  >
                    <item.icon className='size-4' />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DockIcon>
        ))}
      </Dock>
    </main>
  );
}
