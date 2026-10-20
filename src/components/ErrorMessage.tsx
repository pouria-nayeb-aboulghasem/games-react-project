import { RiRefreshLine } from "@remixicon/react";

type ErrorMessageProps = {
  error: string | null;
  onRetry: () => void;
};

function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="rounded-2xl border border-red-400/20 bg-red-400/6 px-6 py-12 text-center">
      <p className="font-semibold text-white">We couldn’t load the games</p>
      <p className="mt-2 text-sm text-slate-400">{error}</p>
      <button
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400"
        onClick={onRetry}
        type="button"
      >
        <RiRefreshLine aria-hidden="true" className="size-4" />
        Try again
      </button>
    </div>
  );
}

export default ErrorMessage;
