import { Check, ChevronDown, Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'wouter';
import { getGetWeaponMetaQueryKey, getListWeaponsQueryKey, useGetWeaponMeta, useListWeapons } from '@workspace/api-client-react';
import { WeaponCard, WeaponCardSkeleton } from '@/components/weapon-card';
import { SectionKicker } from '@/components/site-shell';

export default function Catalog() {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('');
  const [ammunition, setAmmunition] = useState('');
  const [country, setCountry] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const meta = useGetWeaponMeta({ query: { queryKey: getGetWeaponMetaQueryKey() } });
  const params = useMemo(() => ({ q: query.trim() || undefined, family: family || undefined, ammunition: ammunition || undefined, country: country || undefined, manufacturer: manufacturer || undefined, limit: 50 }), [query, family, ammunition, country, manufacturer]);
  const weapons = useListWeapons(params, { query: { queryKey: getListWeaponsQueryKey(params), keepPreviousData: true } });
  const suggestions = useMemo(() => (weapons.data ?? []).slice(0, 6), [weapons.data]);
  const reset = () => { setQuery(''); setFamily(''); setAmmunition(''); setCountry(''); setManufacturer(''); };
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') { event.preventDefault(); inputRef.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const activeFilters = [family, ammunition, country, manufacturer].filter(Boolean).length;
  return (
    <div className="mx-auto max-w-[1280px] px-5 pb-20 pt-12 lg:px-8 lg:pt-18">
      <div className="fade-up grid gap-8 border-b border-border pb-10 lg:grid-cols-[1fr_320px]">
        <div><SectionKicker>База моделей · поиск по названию</SectionKicker><h1 className="mt-4 max-w-3xl font-display text-6xl font-semibold leading-[.88] tracking-tight md:text-8xl">КАТАЛОГ<br /><span className="text-primary">ЕДИНИЦ</span></h1><p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">Справочные карточки о моделях, их происхождении и месте в истории. Без романтизации и без инструкций по применению.</p></div>
        <div className="camouflage flex min-h-[175px] flex-col justify-between rounded-sm p-5 text-[hsl(var(--sidebar-foreground))]"><div className="flex items-center justify-between"><span className="stamp px-2 py-1">FIELD INDEX / 01</span><span className="font-meta text-[10px] text-[hsl(var(--sidebar-primary))]">RU</span></div><div><div className="font-display text-4xl">Точная полка</div><div className="mt-1 font-meta text-[9px] uppercase tracking-[.13em] text-[hsl(var(--sidebar-foreground)/.6)]">название · семейство · контекст</div></div></div>
      </div>
      <div className="mt-8">
        <label className="relative block"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => window.setTimeout(() => setFocused(false), 130)} data-testid="input-catalog-search" type="search" placeholder="Введите точное название модели" className="h-16 w-full rounded-sm border border-input bg-card pl-12 pr-20 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/10" />{query && <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={reset} data-testid="button-clear-search" aria-label="Очистить поиск" className="absolute right-14 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"><X size={17} /></button>}<span className="absolute right-4 top-1/2 -translate-y-1/2 font-meta text-[10px] text-muted-foreground">/</span>
          {focused && query && suggestions.length > 0 && <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-sm border border-border bg-card shadow-lg">{suggestions.map((weapon) => <Link href={`/article/${weapon.slug}`} key={weapon.slug} onMouseDown={(event) => event.preventDefault()} data-testid={`option-autocomplete-${weapon.slug}`} className="flex items-center justify-between border-b border-border px-4 py-3 last:border-0 hover:bg-secondary"><span><span className="block font-display text-xl">{weapon.title}</span><span className="font-meta text-[9px] uppercase tracking-[.12em] text-muted-foreground">{weapon.family} · {weapon.country}</span></span><Check size={15} className="text-primary" /></Link>)}</div>}
        </label>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-testid="catalog-filters">
        {([['family', 'Семейство', meta.data?.families ?? [], family, setFamily], ['ammunition', 'Патрон', meta.data?.ammunition ?? [], ammunition, setAmmunition], ['country', 'Страна', meta.data?.countries ?? [], country, setCountry], ['manufacturer', 'Производитель', meta.data?.manufacturers ?? [], manufacturer, setManufacturer] ] as const).map(([key, label, values, value, setter]) => <label key={key} className="relative"><span className="mb-1 block font-meta text-[9px] uppercase tracking-[.14em] text-muted-foreground">{label}</span><select value={value} onChange={(event) => setter(event.target.value)} data-testid={`select-filter-${key}`} className="h-11 w-full appearance-none rounded-sm border border-border bg-card px-3 pr-9 text-sm outline-none focus:border-primary"><option value="">Все значения</option>{values.map((option) => <option value={option} key={option}>{option}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 bottom-3 text-muted-foreground" /></label>)}
      </div>
      <div className="mt-10 flex items-center justify-between border-b border-border pb-4"><div className="flex items-center gap-3 font-meta text-[10px] uppercase tracking-[0.14em] text-muted-foreground"><SlidersHorizontal size={15} className="text-primary" /> {weapons.isLoading ? 'Сверяем полку…' : `${weapons.data?.length ?? 0} результатов`}{activeFilters > 0 && ` · ${activeFilters} фильтра`}</div><button type="button" onClick={reset} data-testid="button-reset-catalog" className="font-meta text-[10px] uppercase tracking-[.12em] text-muted-foreground hover:text-primary">Сбросить</button></div>
      {weapons.isLoading ? <div className="mt-5 grid gap-4 md:grid-cols-2"><WeaponCardSkeleton /><WeaponCardSkeleton /></div> : weapons.isError ? <div className="paper-panel mt-5 flex min-h-[280px] flex-col items-center justify-center rounded-sm px-6 text-center"><div className="stamp px-3 py-2">Ошибка соединения</div><h2 className="mt-5 font-display text-3xl">Полка временно закрыта</h2><p className="mt-2 text-sm text-muted-foreground">Не удалось получить записи. Попробуйте обновить запрос.</p><button type="button" onClick={() => weapons.refetch()} data-testid="button-retry-catalog" className="mt-6 bg-primary px-5 py-3 font-meta text-[10px] uppercase tracking-[.13em] text-primary-foreground">Повторить</button></div> : (weapons.data?.length ?? 0) > 0 ? <div className="mt-5 grid gap-4 md:grid-cols-2">{weapons.data?.map((weapon, index) => <WeaponCard key={weapon.slug} weapon={weapon} index={index} />)}</div> : <div className="paper-panel mt-5 flex min-h-[280px] flex-col items-center justify-center rounded-sm px-6 text-center"><Search size={22} className="text-primary" /><h2 className="mt-5 font-display text-3xl">Такой записи пока нет</h2><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Проверьте точное название или очистите один из фильтров.</p><button type="button" onClick={reset} data-testid="button-empty-reset" className="mt-6 font-meta text-[10px] uppercase tracking-[.13em] text-primary hover:underline">Сбросить фильтры</button></div>}
      <div className="mt-16 flex items-center justify-between border-t border-border pt-5"><Link href="/" data-testid="link-catalog-home" className="font-meta text-[10px] uppercase tracking-[0.14em] text-muted-foreground hover:text-primary">← На главную</Link><span className="font-meta text-[10px] text-muted-foreground">Данные API · редакционная база</span></div>
    </div>
  );
}