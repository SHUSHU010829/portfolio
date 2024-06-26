import { Mail, Github, Linkedin } from 'lucide-react';

export default function Home() {
  return (
    <main className='flex min-h-screen w-full items-center justify-center bg-[#f3f3f3] p-10 font-sans'>
      <div className='flex flex-col items-center gap-5'>
        <div className='text-2xl font-bold'>網站重新維修中...⸜(๑˙ᵕ ˙๑)⸝</div>
        <div className='flex justify-center gap-1'>
          <div className='cursor-pointer p-2 duration-300 hover:text-stone-500'>
            <a href='mailto: shuyuan010829@gmail.com'>
              <Mail />
            </a>
          </div>
          <div className='cursor-pointer p-2 duration-300 hover:text-stone-500'>
            <a href='https://github.com/SHUSHU010829' target='_blank'>
              <Github />
            </a>
          </div>
          <div className='cursor-pointer p-2 duration-300 hover:text-stone-500'>
            <a href='https://www.linkedin.com/in/shuyuanchuang' target='_blank'>
              <Linkedin />
            </a>
          </div>
        </div>
        <div className='text-xs'>
          © <span className='font-bold'>2024</span> Shuyuan Chuang
        </div>
      </div>
    </main>
  );
}
