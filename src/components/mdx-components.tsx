import Image from "next/image";
import { buttonVariants } from "@components/ui/button";
import { ExternalLink } from "lucide-react";

export function HeaderImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mb-16 aspect-video w-full">
      <Image
        priority
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNMUQQAAO8Ah7R22bwAAAAASUVORK5CYII="
        fill
        className="rounded-xl object-cover"
        src={src}
        alt={alt}
      />
    </div>
  );
}

export function LinkButton({ title, href }: { title: string; href: string }) {
  return (
    <a
      className={`no-underline ${buttonVariants({ variant: "outline" })}`}
      href={href}
      target="_blank"
    >
      {title}
      <ExternalLink className="ml-1 h-4 w-4" />
    </a>
  );
}
