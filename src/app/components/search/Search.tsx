import { CitySearchType, getCities } from "@/api/APICalls";
import { useEffect, useState } from "react";
import SearchResult from "./SearchResult";
type SearchProps = {
  latitude: number;
  longitude: number;
  onClickResultHandler: (item: CitySearchType) => void;
};

export default function Search({
  latitude = 10,
  longitude = 10,
  onClickResultHandler,
}: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CitySearchType[]>([]);
  const [selectedResult, setSelectedResult] = useState<CitySearchType>(
    {} as CitySearchType
  );
  useEffect(() => {
    if (searchValue.length >= 3) {
      const getSearchData = async () => {
        const result = await getCities(searchValue);
        setSearchResult(result);
      };
      getSearchData();
    } else {
      setSearchResult([]);
    }
  }, [searchValue]);

  return (
    <div className="flex flex-col justify-center mb-10 mt-6 gap-2 mx-10 md:flex-row">
      <div className="flex flex-col">
        <label className="text-xs text-foregroundColor font-bold mb-1">
          Search City
        </label>
        <input
          className="rounded-md outline-none p-2 text-sm placeholder:text-xs"
          placeholder="Input City - Min 3 Characters"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div>
          <SearchResult
            searchResult={searchResult}
            onClickResultHandler={(item: CitySearchType) => {
              setSearchResult([]);
              setSelectedResult(item);
              onClickResultHandler(item);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-foregroundColor font-bold mb-1">
          Latitude
        </label>
        <input
          className="rounded-md outline-none p-2 text-sm"
          defaultValue={`${
            Object.keys(selectedResult).length > 0
              ? selectedResult.latitude
              : latitude
          }`}
          disabled
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-foregroundColor font-bold mb-1">
          Longitude
        </label>
        <input
          className="rounded-md outline-none p-2 text-sm"
          defaultValue={`${
            Object.keys(selectedResult).length > 0
              ? selectedResult.longitude
              : longitude
          }`}
          disabled
        />
      </div>
    </div>
  );
}
