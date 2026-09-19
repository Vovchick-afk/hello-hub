import { ArrowLeft, Bookmark, Check, Clock3, ExternalLink, FileText, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { ArticleCard } from '@/components/article-card';
import { SectionKicker } from '@/components/site-shell';
import { articles, getArticle } from '@/data/articles';

export default function ArticlePage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const article = getArticle(slug);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  if (!article) return <ArticleMissing />;
  const related = articles.filter((item) => item.slug !== article.slug && item.category === article.category).slice(0, 2);
  return (
    <article className="mx-auto max-w-[1240px] px-5 pb-20 pt-12 lg:px-8 lg:pt-16">
      <div className="fade-up grid gap-10 border-b border-border pb-12 lg:grid-cols-[1fr_310px]">
        <div>
          <Link href="/catalog" data-testid="link-article-back" className="mb-10 inline-flex items-center gap-2 font-meta text-[10px] uppercase tracking-[0.13em] text-muted-foreground transition-colors hover:text-primary"><ArrowLeft size={15} /> Вернуться в каталог</Link>
          <SectionKicker>{article.category} · {article.year}</SectionKicker>
          <h1 data-testid={`text-article-title-${article.slug}`} className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-[.98] tracking-[-0.05em]">{article.title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{article.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-meta text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><span className="flex items-center gap-2"><Clock3 size={14} className="text-primary" /> {article.readingTime} чтения</span><span className="flex items-center gap-2"><FileText size={14} className="text-primary" /> {article.eyebrow}</span></div>
        </div>
        <aside className="self-end border-l border-primary/30 pl-6"><div className="rule-label text-primary">Коротко</div><div className="mt-5 space-y-4">{article.facts.map((fact) => <div key={fact.label}><div className="font-meta text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{fact.label}</div><div data-testid={`text-fact-${fact.label}`} className="mt-1 font-display text-lg">{fact.value}</div></div>)}</div></aside>
      </div>
      <div className="grid gap-12 pt-12 lg:grid-cols-[180px_minmax(0,680px)_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start"><div className="rule-label text-muted-foreground">В статье</div><nav className="mt-5 space-y-3">{article.sections.map((section, index) => <a href={`#section-${index}`} key={section.heading} data-testid={`link-toc-${index}`} className="block text-sm leading-5 text-muted-foreground transition-colors hover:text-primary">{section.heading}</a>)}</nav></aside>
        <div className="prose prose-stone max-w-none prose-headings:font-display prose-headings:font-semibold prose-p:font-sans prose-p:text-[16px] prose-p:leading-8 prose-p:text-foreground/85">
          {article.sections.map((section, index) => <section key={section.heading} id={`section-${index}`} className="scroll-mt-28 [&+section]:mt-12"><div className="mb-4 font-meta text-[10px] uppercase tracking-[0.16em] text-primary">0{index + 1}</div><h2 data-testid={`heading-section-${index}`} className="font-display text-3xl tracking-tight">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
          <div className="mt-14 border-y border-border py-6"><div className="font-meta text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Редакционное примечание</div><p className="mt-3 text-sm leading-6 text-muted-foreground">Материал носит исключительно историко-образовательный характер. «Арсенал» не публикует инструкции по изготовлению, модификации или применению оружия.</p></div>
        </div>
        <aside className="lg:pl-8"><div className="paper-panel rounded-sm p-5"><div className="rule-label text-primary">Источники</div><ul className="mt-5 space-y-4">{article.sources.map((source) => <li key={source} className="flex gap-2 text-sm leading-5 text-muted-foreground"><ExternalLink size={13} className="mt-1 shrink-0 text-primary" />{source}</li>)}</ul></div><div className="mt-4 flex gap-2"><button type="button" onClick={() => setSaved((value) => !value)} data-testid="button-save-article" className={`flex flex-1 items-center justify-center gap-2 rounded-sm border px-3 py-3 font-meta text-[10px] uppercase tracking-[0.1em] transition-colors ${saved ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:border-primary hover:text-primary'}`}>{saved ? <Check size={14} /> : <Bookmark size={14} />} {saved ? 'Сохранено' : 'Сохранить'}</button><button type="button" onClick={() => { setShared(true); window.setTimeout(() => setShared(false), 1800); }} data-testid="button-share-article" aria-label="Поделиться статьёй" className="flex h-[43px] w-[47px] items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"><Share2 size={15} /></button></div>{shared && <div data-testid="status-share-article" className="mt-2 text-center font-meta text-[9px] uppercase tracking-[0.1em] text-accent">Ссылка скопирована</div>}</aside>
      </div>
      {related.length > 0 && <section className="mt-20 border-t border-border pt-10"><div className="flex items-center justify-between"><div><SectionKicker>Продолжить чтение</SectionKicker><h2 className="mt-3 font-display text-3xl font-semibold">Рядом на полке</h2></div><Link href="/catalog" data-testid="link-related-catalog" className="font-meta text-[10px] uppercase tracking-[0.13em] text-muted-foreground hover:text-primary">Весь каталог →</Link></div><div className="mt-7 grid gap-4 md:grid-cols-2">{related.map((item) => <ArticleCard key={item.slug} article={item} />)}</div></section>}
    </article>
  );
}

function ArticleMissing() {
  return <div className="mx-auto flex min-h-[62vh] max-w-[700px] flex-col items-center justify-center px-5 text-center"><div className="font-meta text-[11px] uppercase tracking-[0.16em] text-primary">404 · нет записи</div><h1 className="mt-5 font-display text-5xl font-semibold tracking-tight">Эта карточка ещё не на полке</h1><p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">Проверьте адрес или вернитесь к каталогу, где собраны опубликованные материалы.</p><Link href="/catalog" data-testid="link-missing-catalog" className="mt-8 inline-flex items-center gap-2 bg-primary px-5 py-3 font-meta text-[10px] uppercase tracking-[0.14em] text-primary-foreground hover:bg-accent">Открыть каталог <ArrowLeft size={14} className="rotate-180" /></Link></div>;
}