import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import type { PageSection } from "@/config/types";
import { routePath } from "@/lib/urls";
import { DataTable } from "./data-table";

export function PageSections({ sections, firstContentAd }: { sections: PageSection[]; firstContentAd?: ReactNode }) {
  return (
    <div className="space-y-16">
      {sections.map((section, sectionIndex) => (
        <section id={section.id} key={section.id} className="scroll-mt-24">
          {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
          <h2>{section.heading}</h2>
          {section.intro ? <p className="section-lead">{section.intro}</p> : null}
          {sectionIndex === 0 && section.intro ? firstContentAd : null}
          {section.paragraphs?.map((paragraph, paragraphIndex) => (
            <Fragment key={paragraph}>
              <p>{paragraph}</p>
              {sectionIndex === 0 && !section.intro && paragraphIndex === 0 ? firstContentAd : null}
            </Fragment>
          ))}

          {section.subsections?.length ? (
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {section.subsections.map((subsection) => (
                <article key={subsection.heading} className="content-card">
                  <h3>{subsection.heading}</h3>
                  {subsection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {subsection.bullets?.length ? (
                    <ul className="mt-4 space-y-2">
                      {subsection.bullets.map((bullet) => <li key={bullet} className="flex gap-2"><CheckCircle2 className="mt-1 shrink-0 text-primary" size={17} /><span>{bullet}</span></li>)}
                    </ul>
                  ) : null}
                  {subsection.table ? <DataTable table={subsection.table} /> : null}
                </article>
              ))}
            </div>
          ) : null}

          {section.steps?.length ? (
            <ol className="mt-7 grid gap-5 md:grid-cols-3">
              {section.steps.map((step, index) => (
                <Fragment key={step.heading}>
                  <li className="content-card">
                    <span className="mb-4 inline-grid h-9 w-9 place-items-center rounded-full bg-primary font-black text-primary-foreground">{index + 1}</span>
                    <h3>{step.heading}</h3>
                    <p>{step.description}</p>
                  </li>
                  {sectionIndex === 0 && !section.intro && !section.paragraphs?.length && index === 0 && firstContentAd ? (
                    <li className="ad-step-item" role="none">{firstContentAd}</li>
                  ) : null}
                </Fragment>
              ))}
            </ol>
          ) : null}

          {section.table ? <DataTable table={section.table} /> : null}

          {section.links?.length ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {section.links.map((link) => (
                <Link key={`${link.slug}-${link.label}`} href={routePath(link.slug)} className="group content-card flex items-start justify-between gap-5 hover:border-primary/60">
                  <span><strong className="block text-foreground">{link.label}</strong>{link.description ? <span className="mt-1 block text-sm">{link.description}</span> : null}</span>
                  <ArrowRight className="mt-1 shrink-0 text-primary transition group-hover:translate-x-1" size={18} />
                </Link>
              ))}
            </div>
          ) : null}
          {sectionIndex === 0 && !section.intro && !section.paragraphs?.length && !section.steps?.length ? firstContentAd : null}
        </section>
      ))}
    </div>
  );
}
