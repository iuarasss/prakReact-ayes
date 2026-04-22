import dataJson from "../data/destinations.json";
import DestinationCard from "../components/DestinationCard";
import SearchFilter from "../components/SearchFilter";
import { useState } from "react";

export default function Guest() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const filtered = dataJson.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || item.category === category) &&
    (location === "" || item.location === location)
  );

  return (
    <div className="p-4 mt-4">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        location={location}
        setLocation={setLocation}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <DestinationCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}