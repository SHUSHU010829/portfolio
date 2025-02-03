import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IGetStartedButtonProps {
  text: string;
  className?: string;
}

export default function GetStartedButton({
  text = 'Get started',
  className,
}: IGetStartedButtonProps) {
  return (
    <div className='min-h-12 w-48'>
      <button
        className={cn(
          'group flex h-12 w-40 items-center justify-center gap-3 rounded-lg bg-slate-100 p-2 font-bold transition-colors duration-200 ease-in-out hover:bg-stone-900',
          className
        )}
      >
        <span
          className={cn(
            'text-stone-900 transition-colors duration-100 ease-in-out group-hover:text-slate-100'
          )}
        >
          {text}
        </span>
        <div
          className={cn(
            'relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full transition-transform duration-100',
            'bg-stone-900 group-hover:bg-slate-100'
          )}
        >
          <div className='absolute left-0 flex h-7 w-14 -translate-x-1/2 items-center justify-center transition-all duration-200 ease-in-out group-hover:translate-x-0'>
            <ArrowRight
              size={16}
              className={cn(
                'size-7 transform p-1 text-stone-900 opacity-0 group-hover:opacity-100'
              )}
            />
            <ArrowRight
              size={16}
              className={cn(
                'size-7 transform p-1 text-slate-100 opacity-100 transition-transform duration-300 ease-in-out group-hover:opacity-0'
              )}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
