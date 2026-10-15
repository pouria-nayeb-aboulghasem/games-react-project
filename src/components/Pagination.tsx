import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "@remixicon/react";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => {
      const start = Math.max(1, Math.min(page - 2, totalPages - 4));
      return start + index;
    },
  );

  return (
    <nav aria-label="Game list pages" className="mt-10 flex items-center justify-center gap-2">
      <button
        aria-label="Previous page"
        className="grid size-10 place-items-center rounded-xl border border-white/10 text-slate-300 transition hover:border-violet-400/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        type="button"
      >
        <RiArrowLeftSLine aria-hidden="true" className="size-5" />
      </button>
      {pages.map((pageNumber) => (
        <button
          aria-current={pageNumber === page ? "page" : undefined}
          className={`grid size-10 place-items-center rounded-xl border text-sm font-medium transition ${
            pageNumber === page
              ? "border-violet-400 bg-violet-500 text-white shadow-lg shadow-violet-950/30"
              : "border-white/10 text-slate-300 hover:border-violet-400/50 hover:text-white"
          }`}
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          type="button"
        >
          {pageNumber}
        </button>
      ))}
      <button
        aria-label="Next page"
        className="grid size-10 place-items-center rounded-xl border border-white/10 text-slate-300 transition hover:border-violet-400/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        type="button"
      >
        <RiArrowRightSLine aria-hidden="true" className="size-5" />
      </button>
    </nav>
  );
}

export default Pagination;
