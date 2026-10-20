type SortingDropdownProps = {
  onOrderingChange: (value: string) => void;
  ordering: string;
  sortOptions: {
    label: string;
    value: string;
  }[];
};

function SortingDropdown({
  onOrderingChange,
  ordering,
  sortOptions,
}: SortingDropdownProps) {
  return (
    <select
      aria-label="Sort games"
      className="h-full min-w-0 flex-1 appearance-none bg-transparent text-xs font-semibold text-slate-200 outline-none"
      onChange={(event) => onOrderingChange(event.target.value)}
      value={ordering}
    >
      {sortOptions.map((option) => (
        <option
          className="bg-[#151820]"
          key={option.label}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortingDropdown;
