import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { LinkIcon } from '@heroicons/react/24/solid';

const words = `A front-end developer who also revels in design. Enjoy the process of creating my own designed work into a functional product. Commit to developing a unique style website with a positive user experience. Prefer to experience new things and implement them.`;

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between bg-[#f3f3f3] p-16'>
      <div className='flex h-[730px] w-full  flex-col  justify-between border border-stone-700 p-5'>
        <div className='flex flex-col items-end'>
          <div className='pr-5 font-playFairDisplay text-6xl font-black'>
            Shuyuan Chuang
          </div>
          <div className='w-[50%] pr-5 pt-2 text-end'>
            <TextGenerateEffect words={words} />
          </div>
        </div>
        <div className='flex items-end gap-2 pb-3 pl-4'>
          <div className='flex cursor-pointer items-center'>
            <div className='rounded-full border border-stone-800 bg-stone-800 p-3'>
              <LinkIcon className='size-6  text-white' />
            </div>
            <div className='rounded-3xl border border-stone-800 px-10 py-2 text-2xl font-bold'>
              Hello
            </div>
          </div>
          <div className='flex cursor-pointer items-center'>
            <div className='rounded-full border border-stone-800 bg-stone-800 p-3'>
              <LinkIcon className='size-6  text-white' />
            </div>
            <div className='rounded-3xl border border-stone-800 px-10 py-2 text-2xl font-bold'>
              Hello
            </div>
          </div>
        </div>
      </div>
      <div className='w-full text-xs'>
        © <span className='font-bold'>2024</span> Build by NextJS & TailwindCss
      </div>
    </main>
  );
}
