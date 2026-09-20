import { Crosshair, Menu, Search, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';

const navItems = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/about', label: 'О проекте' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-[hsl(var(--sidebar))]/95 text-[hsl(var(--sidebar-foreground))] backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <Link href="/" data-testid="link-brand" className="group flex items-center gap-3">
            <span className="camouflage flex h-10 w-10 items-center justify-center rounded-sm border border-[hsl(var(--sidebar-primary)/.55)] text-[hsl(var(--sidebar-primary))] shadow-sm">
              <Crosshair size={21} strokeWidth={1.5} />
            </span>
            <span>
              <span className="font-display block text-[25px] font-semibold leading-none tracking-tight">Арсенал</span>
              <span className="font-meta mt-1 block text-[9px] uppercase tracking-[0.18em] text-[hsl(var(--sidebar-foreground)/.52)]">Энциклопедия</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
            {navItems.map((item) => {
              const active = item.href === '/' ? location === '/' : location.startsWith(item.href);
              return <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label}`} className={`font-meta text-[11px] uppercase tracking-[0.12em] transition-colors ${active ? 'text-[hsl(var(--sidebar-primary))]' : 'text-[hsl(var(--sidebar-foreground)/.62)] hover:text-[hsl(var(--sidebar-foreground))]'}`}>{item.label}</Link>;
            })}
          </nav>
          <div className="hidden items-center gap-5 md:flex">
            <Link href="/catalog" data-testid="link-header-search" className="flex items-center gap-2 font-meta text-[10px] uppercase tracking-[0.13em] text-[hsl(var(--sidebar-foreground)/.62)] transition-colors hover:text-[hsl(var(--sidebar-primary))]">
              <Search size={15} /> Искать в каталоге
            </Link>
            <span className="h-5 w-px bg-border" />
             <span className="font-meta text-[10px] text-[hsl(var(--sidebar-foreground)/.45)]">RU / 2024</span>
          </div>
           <button type="button" aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'} data-testid="button-mobile-menu" onClick={() => setMobileOpen((open) => !open)} className="rounded-sm p-2 text-[hsl(var(--sidebar-foreground)/.65)] transition-colors hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-primary))] md:hidden">
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
         {mobileOpen && <div className="border-t border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar))] px-5 py-4 md:hidden">
           {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} data-testid={`link-mobile-${item.label}`} className="block border-b border-[hsl(var(--sidebar-border))] py-3 font-meta text-[11px] uppercase tracking-[0.12em] text-[hsl(var(--sidebar-foreground)/.68)] last:border-0">{item.label}</Link>)}
        </div>}
      </header>
      <main>{children}</main>
      <footer className="mt-24 border-t border-border bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))]">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3"><Crosshair size={20} className="text-[hsl(var(--sidebar-primary))]" /><span className="font-display text-xl">Арсенал</span></div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[hsl(var(--sidebar-foreground)/.65)]">Спокойная энциклопедия об истории, технологии и культурном контексте огнестрельного оружия.</p>
          </div>
          <div><div className="rule-label text-[hsl(var(--sidebar-primary))]">Разделы</div><div className="mt-4 space-y-3">{navItems.slice(1).map((item) => <Link href={item.href} key={item.href} data-testid={`link-footer-${item.label}`} className="block text-sm text-[hsl(var(--sidebar-foreground)/.72)] transition-colors hover:text-[hsl(var(--sidebar-primary))]">{item.label}</Link>)}</div></div>
          <div><div className="rule-label text-[hsl(var(--sidebar-primary))]">Принцип</div><p className="mt-4 text-sm leading-6 text-[hsl(var(--sidebar-foreground)/.65)]">Факт важнее эффекта. Контекст важнее мифа. Без инструкций по применению.</p></div>
        </div>
        <div className="border-t border-[hsl(var(--sidebar-border))]"><div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-5 font-meta text-[9px] uppercase tracking-[0.14em] text-[hsl(var(--sidebar-foreground)/.45)] sm:flex-row sm:justify-between lg:px-8"><span>Редакционный проект · 2024</span><span>Материалы для образования и исследования</span></div></div>
      </footer>
    </div>
  );
}

export function SectionKicker({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-3 font-meta text-[10px] uppercase tracking-[0.18em] text-primary"><span className="h-px w-7 bg-primary" />{children}<span className="h-1.5 w-1.5 bg-accent" /></div>;
}