import { ChangeEvent } from "react";
import { optionType } from "../types";

type Props = {
    term: string
    options: []
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onOptionSelect : (option : optionType) => void
    onSubmit: () => void
}

const Search = (
  {term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit
}: Props ): JSX.Element => {
  return (
  <div className="relative flex flex-row items-center mt-10 md:mt-4 w-full max-w-xl mx-auto px-4">
  <input
    type="text"
    value={term}
    onChange={onInputChange}
    className="flex-grow px-4 py-2 rounded-l-md border-2 border-white text-base"
  />

  <button
    className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-100 hover:text-zinc-900 text-zinc-100 px-4 py-2 cursor-pointer bg-transparent"
    onClick={onSubmit}
  >
    Search
  </button>

  <ul className="absolute top-full left-0 w-full bg-white z-10 rounded-b-md shadow-md mt-1">
    {options.map((option: optionType, index: number) => (
      <li key={`${option.name}-${index}`}>
        <button
          className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-4 py-2 cursor-pointer"
          onClick={() => onOptionSelect(option)}
        >
          {option.name}, {option.country}
        </button>
      </li>
    ))}
  </ul>
</div>

  );
};

export default Search;
