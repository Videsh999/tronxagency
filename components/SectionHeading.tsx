import type { ReactNode } from "react";

export default function SectionHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p className="section-copy">{description}</p>}
      </div>
      {action}
    </div>
  );
}
