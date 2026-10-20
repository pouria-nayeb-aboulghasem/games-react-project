import { RiGamepadLine } from "@remixicon/react";

function Header() {
  return (
    <header className="border-b border-white/7 bg-[#11131a]">
      <div className="mx-auto flex h-18 max-w-360 items-center justify-between px-5 sm:px-8">
        <a
          className="flex items-center gap-2.5"
          href="/"
          aria-label="Gamegrid home"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-violet-500 text-white shadow-lg shadow-violet-950/40">
            <RiGamepadLine aria-hidden="true" className="size-5" />
          </span>
          <span className="text-lg font-black tracking-tight text-white">
            game<span className="text-violet-400">grid</span>
          </span>
        </a>
        <div className="hidden items-center gap-2 text-xs font-medium text-slate-500 sm:flex">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          YOUR NEXT ADVENTURE STARTS HERE
        </div>
      </div>
    </header>
  );
}

export default Header;
