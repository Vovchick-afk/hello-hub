import { ArrowUpRight, Clock3 } from 'lucide-react';
import { Link } from 'wouter';
import type { Article } from '@/data/articles';

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link href={`/article/${article.slug}`} data-testid={`link-article-${article.slug}`} className={`group paper-panel hover-lift block overflow-hidden rounded-sm ${featured ? 'md:col-span-2' : ''}`}>
      <div className={`relative flex min-h-[175px] flex-col justify-between overflow-hidden p-5 ${featured ? 'bg-primary text-primary-foreground md:min-h-[250px] md:p-8' : 'bg-card'}`}>
        <div className="absolute -right-5 -top-10 font-display text-[150px] leading-none opacity-[0.07]">{featured ? 'А' : '§'}</div>
        <div className="relative flex items-start justify-between gap-4">
          <span className={`rule-label ${featured ? 'text-primary-foreground/65' : 'text-primary'}`}>{article.category} · {article.year}</span>
          <ArrowUpRight size={18} className="shrink-0 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <div className="relative mt-10">
          <div className={`mb-2 font-meta text-[10px] uppercase tracking-[0.16em] ${featured ? 'text-primary-foreground/65' : 'text-muted-foreground'}`}>{article.eyebrow}</div>
          <h3 className={`font-display text-xl font-semibold leading-[1.18] tracking-tight ${featured ? 'max-w-lg text-2xl md:text-3xl' : ''}`}>{article.title}</h3>
          <p className={`mt-3 max-w-xl text-sm leading-6 ${featured ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>{article.excerpt}</p>
        </div>
        <div className={`relative mt-6 flex items-center gap-2 font-meta text-[10px] uppercase tracking-[0.1em] ${featured ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}><Clock3 size={13} /> {article.readingTime} чтения</div>
      </div>
    </Link>
  );
}