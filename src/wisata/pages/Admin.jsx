import dataJson from "../data/destinations.json";
import DestinationTable from "../components/DestinationTable";
import SearchFilter from "../components/SearchFilter";
import { useState } from "react";

export default function Admin() {
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

      <DestinationTable data={filtered} />
    </div>
  );
}