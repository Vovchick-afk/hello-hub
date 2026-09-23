import { ArrowRight, BookMarked, ChevronRight, Library, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import { ArticleCard } from '@/components/article-card';
import { SectionKicker } from '@/components/site-shell';
import { articles, categories } from '@/data/articles';
import { useListWeapons } from '@workspace/api-client-react';
import { WeaponCard, WeaponCardSkeleton } from '@/components/weapon-card';

export default function Home() {
  const featured = useListWeapons({ limit: 4 });
  return (
    <div>
      <section className="mx-auto grid max-w-[1240px] items-end gap-10 px-5 pb-20 pt-16 md:grid-cols-[1.2fr_.8fr] md:pt-24 lg:px-8 lg:pb-28">
        <div className="fade-up">
          <div className="mb-7 flex items-center gap-3 font-meta text-[10px] uppercase tracking-[0.2em] text-primary"><span className="h-px w-9 bg-primary" /> Полевой справочник · выпуск 01</div>
          <h1 className="font-display max-w-3xl text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[.93] tracking-[-0.06em]">Смотреть<br /><span className="text-primary">внимательнее.</span></h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">G.U.N.S — энциклопедия об огнестрельном оружии как о части истории, техники и культуры. Здесь мы разбираем предметы спокойно: без культа, без инструкций, с уважением к фактам.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/catalog" data-testid="link-hero-catalog" className="group inline-flex items-center gap-3 rounded-sm bg-primary px-5 py-3 font-meta text-[11px] uppercase tracking-[0.13em] text-primary-foreground transition-colors hover:bg-accent">Открыть каталог <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
            <Link href="/about" data-testid="link-hero-about" className="inline-flex items-center gap-2 px-2 py-3 font-meta text-[11px] uppercase tracking-[0.13em] text-muted-foreground transition-colors hover:text-primary">Как мы работаем <ChevronRight size={15} /></Link>
          </div>
        </div>
        <div className="fade-up fade-up-delay-2 relative min-h-[300px] border-l border-primary/30 pl-8 md:min-h-[360px]">
          <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-primary" />
          <div className="font-meta text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Запись редактора / 001</div>
          <p className="mt-10 font-display text-2xl leading-[1.35] text-foreground md:text-3xl">«Хорошая справка не делает предмет громче. Она помогает увидеть, из чего он сделан и что он значит».</p>
          <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground"><span className="h-px w-8 bg-border" /> Редакция «Арсенала»</div>
          <div className="absolute bottom-0 right-3 select-none font-display text-[120px] leading-none text-primary/10">А</div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/45">
        <div className="mx-auto grid max-w-[1240px] gap-0 px-5 md:grid-cols-3 lg:px-8">
          <div className="border-b border-border py-7 md:border-b-0 md:border-r md:pr-10"><div className="font-meta text-[10px] text-primary">01 / Подход</div><div className="mt-3 flex gap-3"><BookMarked size={20} className="mt-1 shrink-0 text-primary" /><p className="text-sm leading-6 text-muted-foreground">История начинается с источника, а не с эффектной подписи.</p></div></div>
          <div className="border-b border-border py-7 md:border-b-0 md:px-10 md:border-r"><div className="font-meta text-[10px] text-primary">02 / Фокус</div><div className="mt-3 flex gap-3"><Library size={20} className="mt-1 shrink-0 text-primary" /><p className="text-sm leading-6 text-muted-foreground">Технология объясняется через людей, производство и время.</p></div></div>
          <div className="py-7 md:pl-10"><div className="font-meta text-[10px] text-primary">03 / Граница</div><div className="mt-3 flex gap-3"><ShieldCheck size={20} className="mt-1 shrink-0 text-primary" /><p className="text-sm leading-6 text-muted-foreground">Никаких советов по применению, изготовлению или модификации.</p></div></div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pt-20 lg:px-8 lg:pt-28">
        <div className="flex items-end justify-between gap-6"><div><SectionKicker>Из редакционного стола</SectionKicker><h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Текущая полка</h2></div><Link href="/catalog" data-testid="link-featured-catalog" className="hidden items-center gap-2 font-meta text-[10px] uppercase tracking-[0.14em] text-muted-foreground hover:text-primary sm:flex">Все материалы <ArrowRight size={15} /></Link></div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">{articles.slice(0, 3).map((article, index) => <ArticleCard key={article.slug} article={article} featured={index === 0} />)}</div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pt-20 lg:px-8 lg:pt-28">
        <div className="flex items-end justify-between gap-6"><div><SectionKicker>Из базы моделей</SectionKicker><h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Живая полка</h2></div><Link href="/catalog" data-testid="link-home-all-weapons" className="hidden items-center gap-2 font-meta text-[10px] uppercase tracking-[0.14em] text-muted-foreground hover:text-primary sm:flex">Все модели <ArrowRight size={15} /></Link></div>
        {(Array.isArray(featured.data) ? featured.data : (featured.data as any)?.data ?? []).map((weapon: any, index: number) => <WeaponCard key={weapon.slug} weapon={weapon} index={index} />)}
        <Link href="/catalog" data-testid="link-home-all-weapons-mobile" className="mt-6 flex items-center gap-2 font-meta text-[10px] uppercase tracking-[0.14em] text-primary sm:hidden">Все модели <ArrowRight size={14} /></Link>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-4 pt-24 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[.7fr_1.3fr]">
           <div><SectionKicker>Навигация</SectionKicker><h2 className="mt-4 max-w-sm font-display text-4xl font-semibold tracking-tight">Пять способов войти в тему</h2><p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">Начните с эпохи, термина, технологии, культуры или конкретной модели — каждая дорожка ведёт к связанным материалам.</p></div>
          <div className="divide-y divide-border border-y border-border">{categories.map((category) => <Link href={`/catalog?category=${encodeURIComponent(category.name)}`} key={category.name} data-testid={`link-category-${category.name}`} className="group grid grid-cols-[54px_1fr_auto] items-center gap-4 py-5 transition-colors hover:text-primary"><span className="font-meta text-[11px] text-muted-foreground">{category.count}</span><span><span className="font-display text-2xl">{category.name}</span><span className="mt-1 block text-sm text-muted-foreground group-hover:text-foreground">{category.description}</span></span><ArrowRight size={18} className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" /></Link>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-4 pt-20 lg:px-8 lg:pt-28">
        <div className="relative overflow-hidden rounded-sm bg-[hsl(var(--accent))] px-6 py-12 text-[hsl(var(--accent-foreground))] md:px-12 md:py-14">
          <div className="absolute -right-5 -top-12 font-display text-[220px] leading-none opacity-10">§</div>
          <div className="relative max-w-2xl"><div className="rule-label opacity-60">Для первого чтения</div><h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">Не знаете, с чего начать?</h2><p className="mt-4 max-w-lg text-sm leading-6 opacity-75">Откройте справочник терминов: короткие определения помогут ориентироваться в дальнейших статьях без лишнего порога входа.</p><Link href="/article/kak-klassificiruyut-strelkovoe-oruzhie" data-testid="link-start-reading" className="mt-7 inline-flex items-center gap-2 border-b border-current pb-1 font-meta text-[10px] uppercase tracking-[0.14em]">Начать со справки <ArrowRight size={14} /></Link></div>
        </div>
      </section>
    </div>
  );
}