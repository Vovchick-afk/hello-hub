import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { Link } from 'wouter';
import { SectionKicker } from '@/components/site-shell';
import { getArticle, timeline } from '@/data/articles';

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-20 pt-14 lg:px-8 lg:pt-20">
      <section className="fade-up grid gap-8 border-b border-border pb-12 md:grid-cols-[1fr_.7fr] md:items-end">
        <div>
          <SectionKicker>Хронологическая полка</SectionKicker>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(3.2rem,8vw,6.5rem)] font-semibold leading-[.94] tracking-[-0.06em]">Время<br /><span className="text-primary">собирает связи.</span></h1>
        </div>
        <p className="max-w-md text-base leading-7 text-muted-foreground">Опорные события в истории огнестрельного оружия — от ранних ручных систем до музейной работы с коллекциями. Каждая запись ведёт к материалам, где можно прочитать подробнее.</p>
      </section>

      <section className="mt-12 grid gap-10 lg:grid-cols-[180px_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rule-label text-primary">Ориентир</div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">Даты обозначают период развития идеи или появления образца, а не единственную точку изобретения.</p>
          <Link href="/catalog" className="mt-6 inline-flex font-meta text-[10px] uppercase tracking-[0.13em] text-muted-foreground hover:text-primary">Все статьи →</Link>
        </div>
        <div className="relative border-l border-primary/35 pl-7 md:pl-10">
          <div className="absolute bottom-0 left-[-4px] top-0 w-[7px] bg-background" />
          <div className="relative space-y-8">
            {timeline.map((event, index) => (
              <article id={`event-${event.id}`} key={event.id} className="group relative scroll-mt-28">
                <div className="absolute -left-[34px] top-5 h-2 w-2 rounded-full bg-primary ring-4 ring-background md:-left-[47px]" />
                <div className="paper-panel rounded-sm p-6 transition-colors group-target:border-primary/60 md:p-8">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-meta text-[10px] uppercase tracking-[0.13em] text-primary"><span className="flex items-center gap-2"><CalendarDays size={14} /> {event.year}</span><span className="text-muted-foreground">{event.period}</span><span className="text-muted-foreground/60">0{index + 1}</span></div>
                  <h2 className="mt-5 max-w-2xl font-display text-2xl font-semibold tracking-tight md:text-3xl">{event.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{event.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">{event.articleSlugs.map((slug) => <TimelineArticleLink key={slug} slug={slug} />)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TimelineArticleLink({ slug }: { slug: string }) {
  const article = getArticle(slug);
  if (!article) return null;
  return <Link href={`/article/${slug}`} className="inline-flex items-center gap-2 font-meta text-[10px] uppercase tracking-[0.1em] text-primary hover:underline">{article.title} <ArrowUpRight size={13} /></Link>;
}