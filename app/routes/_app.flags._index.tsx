import type { MetaFunction } from "@remix-run/node";
import countries from '../data/countries.json';
import { useCallback, useEffect, useState } from "react";

type TCountry = {
  name: string;
  code: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Fun with Flags" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Flags() {
  const countryFiles = countries;
  const [selectedCountry, setSelectedCountry] = useState<TCountry | null>(null);

  const changeCountry = useCallback(() => {
    const length = countryFiles.length;
    const newCountryIndex = Math.floor(Math.random() * length);

    setSelectedCountry(countryFiles[newCountryIndex]);
  }, [countryFiles]);
  
  useEffect(() => {
    if (!selectedCountry) {
      changeCountry();
    }
  }, [changeCountry, selectedCountry]);

  if (!selectedCountry) {
    return null;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        onClick={() => changeCountry()}
        role="presentation"
      >
        <img src={`/flags/${selectedCountry.code.toLowerCase()}-flag.jpg`} alt={selectedCountry.name} />
        <span>{selectedCountry.name}</span>
      </div>
    </div>
  );
}
