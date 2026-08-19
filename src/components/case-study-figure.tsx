import { ProjectImage } from "@/components/project-image";

/**
 * `ProjectImage` plus a caption, as a real `<figure>`/`<figcaption>` pair.
 * The frame, mat, outline and click-to-expand behaviour all come from
 * `ProjectImage` — this component used to rebuild that wrapper by hand, which
 * meant every change to the image treatment had to be made in two places.
 *
 * `alt` falls back to the caption, since a visible caption that already
 * describes the image makes a separate alt string redundant.
 */
export function CaseStudyFigure({
  src,
  alt,
  caption,
  aspect,
  aspectClassName,
  captionClassName = "text-white/70",
  gapClassName = "gap-2",
  priority = false,
}: {
  src: string;
  alt?: string;
  caption: string;
  aspect?: string;
  aspectClassName?: string;
  captionClassName?: string;
  gapClassName?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`flex w-full flex-col items-start ${gapClassName}`}>
      <ProjectImage
        src={src}
        alt={alt ?? caption}
        aspect={aspect}
        aspectClassName={aspectClassName}
        priority={priority}
      />
      <figcaption className={`w-full text-center font-mono text-body-h3 ${captionClassName}`}>
        {caption}
      </figcaption>
    </figure>
  );
}
