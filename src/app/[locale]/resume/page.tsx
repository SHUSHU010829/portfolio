import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Resume');

  return (
    <main className='flex flex-col bg-[#f3f3f3] p-10 font-sans'>
      <article className='entry heti'>
        <h1>{t('name')}</h1>
        <p>噗噗</p>
      </article>
    </main>
  );
}
