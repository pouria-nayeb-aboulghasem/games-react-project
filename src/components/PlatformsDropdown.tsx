import type { Platform } from "@/types";
import { RiWindowsLine } from "@remixicon/react";

type PlatformsDropdownProps = {
  onPlatformChange: (value: string) => void;
  selectedPlatform: string;
  platforms: Platform[];
};

function PlatformsDropdown({
  onPlatformChange,
  selectedPlatform,
  platforms,
}: PlatformsDropdownProps) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
        <RiWindowsLine aria-hidden="true" className="size-4 text-violet-300" />
        Platform
      </span>
      <select
        className="h-11 w-full appearance-none rounded-lg border border-white/10 bg-[#1d2029] px-3 text-sm text-slate-200 outline-none transition focus:border-violet-400/70"
        onChange={(event) => onPlatformChange(event.target.value)}
        value={selectedPlatform}
      >
        <option value="">All platforms</option>
        {platforms.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default PlatformsDropdown;
