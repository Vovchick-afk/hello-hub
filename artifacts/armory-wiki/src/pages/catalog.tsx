import { BookOpen, Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArticleCard } from '@/components/article-card';
import { SectionKicker } from '@/components/site-shell';
import { articles, categories, type ArticleCategory } from '@/data/articles';

export default function Catalog() {
  const [location, setLocation] = useLocation();
  const initialCategory = new URLSearchParams(location.split('?')[1] ?? '').get('category') ?? 'Все';
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>(initialCategory);
  const filtered = useMemo(() => articles.filter((article) => {
    const matchesCategory = category === 'Все' || article.category === category;
    const haystack = `${article.title} ${article.excerpt} ${article.category}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase().trim());
  }), [category, query]);
  const chooseCategory = (next: string) => {
    setCategory(next);
    setLocation(next === 'Все' ? '/catalog' : `/catalog?category=${encodeURIComponent(next)}`, { replace: true });
  };
  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-20 pt-14 lg:px-8 lg:pt-20">
      <div className="fade-up flex flex-col justify-between gap-8 border-b border-border pb-10 md:flex-row md:items-end">
        <div><SectionKicker>Справочная полка</SectionKicker><h1 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-6xl">Каталог</h1><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Материалы об истории, терминах и известных моделях. Ищите по смыслу — или просто листайте.</p></div>
        <div className="flex items-center gap-3 font-meta text-[10px] uppercase tracking-[0.14em] text-muted-foreground"><BookOpen size={16} className="text-primary" /> {articles.length} материала</div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
        <label className="relative block"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} data-testid="input-catalog-search" type="search" placeholder="Например: патрон, история, Мосин…" className="h-14 w-full rounded-sm border border-input bg-card pl-12 pr-12 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/10" />{query && <button type="button" onClick={() => setQuery('')} data-testid="button-clear-search" aria-label="Очистить поиск" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"><X size={17} /></button>}</label>
        <div className="flex items-center gap-2 rounded-sm border border-border bg-secondary/45 px-4 font-meta text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><SlidersHorizontal size={16} className="text-primary" /> Фильтр</div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2" data-testid="catalog-category-filters"><button type="button" onClick={() => chooseCategory('Все')} data-testid="button-filter-all" className={`rounded-sm px-4 py-2 font-meta text-[10px] uppercase tracking-[0.12em] transition-colors ${category === 'Все' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary'}`}>Все</button>{categories.map((item) => <button type="button" key={item.name} onClick={() => chooseCategory(item.name)} data-testid={`button-filter-${item.name}`} className={`rounded-sm px-4 py-2 font-meta text-[10px] uppercase tracking-[0.12em] transition-colors ${category === item.name ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary'}`}>{item.name}</button>)}</div>
      <div className="mt-10 flex items-center justify-between border-b border-border pb-4"><div className="font-meta text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{filtered.length} {filtered.length === 1 ? 'результат' : 'результатов'}{category !== 'Все' ? ` · ${category}` : ''}</div><Filter size={16} className="text-muted-foreground" /></div>
      {filtered.length > 0 ? <div className="mt-5 grid gap-4 md:grid-cols-2">{filtered.map((article) => <ArticleCard key={article.slug} article={article} />)}</div> : <div className="paper-panel mt-5 flex min-h-[280px] flex-col items-center justify-center rounded-sm px-6 text-center"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary"><Search size={20} /></div><h2 className="mt-5 font-display text-2xl font-semibold">Такой записи пока нет</h2><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Попробуйте убрать часть запроса или выбрать другой раздел.</p><button type="button" onClick={() => { setQuery(''); chooseCategory('Все'); }} data-testid="button-reset-catalog" className="mt-6 inline-flex items-center gap-2 font-meta text-[10px] uppercase tracking-[0.13em] text-primary hover:underline">Сбросить фильтры</button></div>}
      <div className="mt-16 flex items-center justify-between border-t border-border pt-5"><Link href="/" data-testid="link-catalog-home" className="font-meta text-[10px] uppercase tracking-[0.14em] text-muted-foreground hover:text-primary">← На главную</Link><span className="font-meta text-[10px] text-muted-foreground">Архив обновляется редакцией</span></div>
    </div>
  );
}