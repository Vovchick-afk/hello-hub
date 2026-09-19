import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-[700px] flex-col items-center justify-center px-5 text-center">
      <div className="relative"><Compass size={38} strokeWidth={1.2} className="text-primary" /><span className="absolute -right-3 -top-2 font-meta text-[9px] text-primary">404</span></div>
      <h1 className="mt-7 font-display text-5xl font-semibold tracking-tight md:text-6xl">Страница потерялась</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">Похоже, этот лист ещё не попал в каталог. Вернитесь в начало или откройте полку материалов.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/" data-testid="link-404-home" className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 font-meta text-[10px] uppercase tracking-[0.13em] text-primary-foreground hover:bg-accent">На главную</Link><Link href="/catalog" data-testid="link-404-catalog" className="inline-flex items-center gap-2 px-4 py-3 font-meta text-[10px] uppercase tracking-[0.13em] text-muted-foreground hover:text-primary"><ArrowLeft size={14} /> В каталог</Link></div>
    </div>
  );
}