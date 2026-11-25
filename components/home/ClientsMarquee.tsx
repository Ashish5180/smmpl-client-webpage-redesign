import React from "react";
import Image from "next/image";
import type { ClientItem } from "@/lib/clients";

interface ClientsMarqueeProps {
  rowOne: ClientItem[];
  rowTwo: ClientItem[];
}

function ClientLogoBadge({ client }: { client: ClientItem }) {
  return (
    <div className="h-10 shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-[opacity,filter] duration-200 flex items-center">
      {client.logo ? (
        <Image
          src={client.logo.url}
          alt={client.logo.alt}
          width={client.logo.width}
          height={40}
          className="h-10 w-auto object-contain"
        />
      ) : (
        <span className="inline-flex items-center justify-center h-10 px-6 rounded-full border border-line bg-paper text-sm font-medium text-neutral-500 whitespace-nowrap select-none">
          {client.name}
        </span>
      )}
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  label,
}: {
  items: ClientItem[];
  direction: "left" | "right";
  label: string;
}) {
  const trackClass =
    direction === "left" ? "marquee-track-left" : "marquee-track-right";

  return (
    <div
      className="marquee-row marquee-mask relative w-full overflow-hidden py-1"
      aria-label={label}
    >
      <div className={`flex w-max ${trackClass}`}>
        {/* Primary track (remains visible as wrapped static grid under reduced motion) */}
        <div className="flex items-center gap-4 pr-4 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:w-full motion-reduce:pr-0">
          {items.map((client) => (
            <ClientLogoBadge key={client._id} client={client} />
          ))}
        </div>

        {/* Duplicated track for seamless CSS infinite scroll */}
        <div
          className="flex items-center gap-4 pr-4 motion-reduce:hidden"
          aria-hidden="true"
        >
          {items.map((client) => (
            <ClientLogoBadge
              key={`${client._id}-dup`}
              client={client}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClientsMarquee({ rowOne, rowTwo }: ClientsMarqueeProps) {
  return (
    <div className="mt-14 md:mt-16 space-y-4">
      <MarqueeRow
        items={rowOne}
        direction="left"
        label="Client partners row 1"
      />
      <MarqueeRow
        items={rowTwo}
        direction="right"
        label="Client partners row 2"
      />
    </div>
  );
}
