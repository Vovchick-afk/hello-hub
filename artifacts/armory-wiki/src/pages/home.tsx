import { ArrowRight, BookMarked, Database, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import { useListWeapons } from '@workspace/api-client-react';
import { SectionKicker } from '@/components/site-shell';
import { WeaponCard, WeaponCardSkeleton } from '@/components/weapon-card';

export default function Home() {
  const featured = useListWeapons({ limit: 4 });
  return (
    <div>
      <section className="camouflage relative overflow-hidden text-[hsl(var(--sidebar-foreground))]">
        <div className="mx-auto grid min-h-[600px] max-w-[1280px] items-end gap-12 px-5 pb-16 pt-24 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:pb-24">
          <div className="fade-up relative z-10">
            <div className="stamp mb-6 inline-flex px-3 py-2">Справочная энциклопедия · RU</div>
            <h1 data-testid="text-home-title" className="font-display max-w-5xl text-[clamp(4.5rem,13vw,10.5rem)] font-semibold leading-[.78] tracking-[-.025em]">АРСЕНАЛ<span className="text-[hsl(var(--sidebar-primary))]">.</span></h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-[hsl(var(--sidebar-foreground)/.72)]">Модели, история, устройство и контекст — собранные спокойно, проверяемо и без мифологии вокруг оружия.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link href="/catalog" data-testid="link-home-catalog" className="inline-flex items-center gap-3 bg-[hsl(var(--sidebar-primary))] px-5 py-3 font-meta text-[10px] uppercase tracking-[.14em] text-[hsl(var(--sidebar))] transition-transform hover:-translate-y-0.5">Открыть каталог <ArrowRight size={15} /></Link><Link href="/about" data-testid="link-home-about" className="inline-flex items-center gap-3 border border-[hsl(var(--sidebar-foreground)/.35)] px-5 py-3 font-meta text-[10px] uppercase tracking-[.14em] text-[hsl(var(--sidebar-foreground)/.78)] hover:border-[hsl(var(--sidebar-primary))] hover:text-[hsl(var(--sidebar-primary))]">Как мы работаем</Link></div>
          </div>
          <div className="relative hidden min-h-[310px] lg:block">
            <div className="absolute right-8 top-3 h-64 w-52 rotate-6 border border-[hsl(var(--sidebar-primary)/.45)] bg-[hsl(var(--sidebar)/.5)] p-4 shadow-2xl"><div className="h-full border border-[hsl(var(--sidebar-foreground)/.14)] p-3"><div className="font-meta text-[9px] text-[hsl(var(--sidebar-primary))]">ARCHIVE / 1998</div><div className="mt-20 font-display text-5xl leading-[.8]">ФАКТ<br />И<br /><span className="text-[hsl(var(--sidebar-primary))]">ФОРМА</span></div></div></div>
            <div className="absolute bottom-0 left-10 h-52 w-64 -rotate-6 border border-[hsl(var(--sidebar-primary)/.35)] bg-[hsl(var(--sidebar-accent)/.7)] p-4"><div className="font-meta text-[9px] text-[hsl(var(--sidebar-primary))]">FIELD NOTE 04</div><div className="mt-10 max-w-[160px] font-display text-4xl leading-[.85]">БЕЗ<br />ИНСТРУКЦИЙ</div><div className="mt-5 h-px w-full bg-[hsl(var(--sidebar-primary)/.45)]" /></div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8">
        <div className="grid gap-10 border-b border-border pb-16 lg:grid-cols-[.8fr_1.2fr]">
          <div><SectionKicker>Зачем это нужно</SectionKicker><h2 className="mt-5 max-w-md font-display text-5xl font-semibold leading-[.88] tracking-tight md:text-6xl">Читать предмет,<br /><span className="text-primary">а не легенду.</span></h2></div>
          <div className="grid gap-8 sm:grid-cols-3"><Value icon={<Database size={19} />} title="База" text="Карточки моделей с понятными полями, датами и связями между вариантами." /><Value icon={<BookMarked size={19} />} title="Контекст" text="История создания и место в культуре — без вырванных из времени фактов." /><Value icon={<ShieldCheck size={19} />} title="Граница" text="Только образование. Никаких инструкций по сборке, переделке или применению." /></div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 pb-20 lg:px-8">
        <div className="flex items-end justify-between border-b border-border pb-5"><div><SectionKicker>Из базы данных</SectionKicker><h2 className="mt-3 font-display text-4xl font-semibold">На полке сейчас</h2></div><Link href="/catalog" data-testid="link-home-all-weapons" className="hidden items-center gap-2 font-meta text-[10px] uppercase tracking-[.14em] text-primary sm:flex">Весь каталог <ArrowRight size={14} /></Link></div>
        {featured.isLoading ? <div className="mt-5 grid gap-4 md:grid-cols-2"><WeaponCardSkeleton /><WeaponCardSkeleton /></div> : featured.isError ? <div className="paper-panel mt-5 p-8"><p data-testid="status-home-error" className="text-sm text-muted-foreground">База временно недоступна. Загляните в каталог чуть позже.</p></div> : <div className="mt-5 grid gap-4 md:grid-cols-2">{(featured.data ?? []).map((weapon, index) => <WeaponCard key={weapon.slug} weapon={weapon} index={index} />)}</div>}
        <Link href="/catalog" data-testid="link-home-all-weapons-mobile" className="mt-6 flex items-center gap-2 font-meta text-[10px] uppercase tracking-[.14em] text-primary sm:hidden">Весь каталог <ArrowRight size={14} /></Link>
      </section>
      <section className="border-y border-border bg-secondary/45">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-14 md:grid-cols-[1fr_auto] md:items-center lg:px-8"><div><div className="font-meta text-[10px] uppercase tracking-[.15em] text-primary">Редакционная заметка / 01</div><h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[.9] md:text-5xl">Оружие существует не только на чертежах.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">У каждой модели есть промышленная история, человеческий контекст и последствия. Мы начинаем с этих вопросов.</p></div><Link href="/about" data-testid="link-home-editorial" className="inline-flex items-center gap-3 border border-primary px-5 py-3 font-meta text-[10px] uppercase tracking-[.14em] text-primary hover:bg-primary hover:text-primary-foreground">Редакционные принципы <ArrowRight size={15} /></Link></div>
      </section>
    </div>
  );
}

function Value({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div><div className="flex h-9 w-9 items-center justify-center border border-primary text-primary">{icon}</div><h3 className="mt-5 font-display text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>;
}