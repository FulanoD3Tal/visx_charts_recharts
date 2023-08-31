export default function ChartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='h-[350px] md:h-[400px] w-full'>{children}</section>
  );
}
