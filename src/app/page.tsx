export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between bg-[#f3f3f3] p-16'>
      <div className='h-[710px] w-full border border-stone-700 p-5'>
        <div className='text-end font-playFairDisplay text-6xl font-black'>
          Shuyuan Chuang
        </div>
      </div>
      <div className='w-full text-xs'>
        © <span className='font-bold'>2024</span> Shuyuan Chuang Build by
        Next.JS & TailwindCss
      </div>
    </main>
  );
}
