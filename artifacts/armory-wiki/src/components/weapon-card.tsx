import { ArrowUpRight, ImageOff } from 'lucide-react';
import { Link } from 'wouter';

type Weapon = {
  slug: string;
  title: string;
  family: string;
  manufacturer: string;
  country: string;
  ammunition: string;
  kind: string;
  summary: string;
  imageUrl?: string | null;
  yearFrom?: number | null;
  yearTo?: number | null;
  variantCount: number;
};

export function WeaponCard({ weapon, index = 0 }: { weapon: Weapon; index?: number }) {
  const years = weapon.yearFrom ? `${weapon.yearFrom}${weapon.yearTo ? `–${weapon.yearTo}` : '—'}` : 'даты уточняются';
  return (
    <Link href={`/article/${weapon.slug}`} data-testid={`card-weapon-${weapon.slug}`} className="group paper-panel hover-lift relative block overflow-hidden rounded-sm">
      <div className="grid min-h-[250px] grid-cols-[104px_1fr] sm:grid-cols-[150px_1fr]">
        <div className="relative overflow-hidden bg-[hsl(var(--sidebar))]">
          {weapon.imageUrl ? <img src={weapon.imageUrl} alt={weapon.title} data-testid={`img-weapon-${weapon.slug}`} className="h-full w-full object-cover opacity-85 grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" /> : <div className="flex h-full min-h-[250px] items-center justify-center text-[hsl(var(--sidebar-primary)/.65)]"><ImageOff size={26} /></div>}
          <span className="absolute left-3 top-3 font-meta text-[9px] text-[hsl(var(--sidebar-primary))]">0{index + 1}</span>
        </div>
        <div className="flex flex-col justify-between p-5 sm:p-6">
          <div>
            <div className="flex items-center justify-between gap-3"><span className="font-meta text-[9px] uppercase tracking-[.14em] text-primary">{weapon.kind} · {years}</span><ArrowUpRight size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" /></div>
            <h3 data-testid={`text-weapon-title-${weapon.slug}`} className="mt-4 font-display text-3xl font-semibold leading-[.95] tracking-tight">{weapon.title}</h3>
            <p data-testid={`text-weapon-summary-${weapon.slug}`} className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">{weapon.summary}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-3 font-meta text-[9px] uppercase tracking-[.08em] text-muted-foreground"><span>{weapon.family}</span><span className="text-accent">/</span><span>{weapon.manufacturer}</span>{weapon.variantCount > 0 && <><span className="text-accent">/</span><span>{weapon.variantCount} варианта</span></>}</div>
        </div>
      </div>
    </Link>
  );
}

export function WeaponCardSkeleton() {
  return <div className="grid min-h-[250px] animate-pulse grid-cols-[104px_1fr] overflow-hidden rounded-sm border border-border bg-card sm:grid-cols-[150px_1fr]"><div className="bg-muted" /><div className="space-y-4 p-6"><div className="h-3 w-1/3 bg-muted" /><div className="h-9 w-3/4 bg-muted" /><div className="h-3 w-full bg-muted" /><div className="h-3 w-2/3 bg-muted" /></div></div>;
}