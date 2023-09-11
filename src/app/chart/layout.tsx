import QueryProvider from '@/providers/query-provider';

export default function ChartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <section className='h-[350px] md:h-[400px] w-full'>{children}</section>
    </QueryProvider>
  );
}
