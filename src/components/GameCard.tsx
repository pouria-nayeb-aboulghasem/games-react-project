import { RiCalendarLine, RiStarFill } from "@remixicon/react";
import type { Game } from "@/types";

type GameCardProps = {
  game: Game;
};

function GameCard({ game }: GameCardProps) {
  const releaseYear = game.released
    ? new Date(`${game.released}T00:00:00`).getFullYear()
    : null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/8 bg-[#151820] transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-xl hover:shadow-violet-950/20">
      <div className="relative aspect-16/10 overflow-hidden bg-linear-to-br from-violet-900/70 via-[#242035] to-slate-900">
        {game.background_image && (
          <img
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            src={game.background_image}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/10" />
        <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {game.metacritic ? `METASCORE ${game.metacritic}` : "FEATURED"}
        </div>
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur">
          <RiStarFill aria-hidden="true" className="size-3.5" />
          {game.rating ? game.rating.toFixed(1) : "N/A"}
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-base font-semibold tracking-tight text-white">
          {game.name}
        </h3>
        <div className="mt-3 flex min-h-5 items-center justify-between gap-3 text-xs text-slate-400">
          {releaseYear ? (
            <span className="inline-flex items-center gap-1.5">
              <RiCalendarLine aria-hidden="true" className="size-3.5" />
              {releaseYear}
            </span>
          ) : (
            <span>Release date unavailable</span>
          )}
          <span className="truncate text-right">
            {game.platforms
              ?.slice(0, 2)
              .map(({ platform }) => platform.name)
              .join(" · ") || "Multiple platforms"}
            {game.platforms != null
              ? game.platforms?.length > 2
                ? " · ..."
                : ""
              : ""}
          </span>
        </div>
      </div>
    </article>
  );
}

export default GameCard;
