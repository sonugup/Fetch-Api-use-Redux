import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.getAll("sortBy") || "");
  const [category, setCategory] = useState(searchParams.get("genre") || []);
  const hendFilter = (e) => {
    const option = e.target.value;
    let newCategory = [...category];

    if (newCategory.includes(option)) {
      newCategory.splice(newCategory.indexOf(option), 1);
    } else {
      newCategory.push(option);
    }
    setCategory(newCategory);
  };

  const heandleSortBy = (e) => {
    setSortBy(e.target.value);
  };
  console.log(setSortBy);

  useEffect(() => {
    const params = {};
    category && (params.genre = category);
    sortBy && (params.sortBy = sortBy);
    setSearchParams(params);
  }, [category, setSearchParams, sortBy]);
  return (
    <div>
      <h2>Filter</h2>
      <div>
        <input
          type="checkbox"
          value="K-Pop"
          defaultChecked={category.includes("K-Pop")}
          onChange={hendFilter}
          placeholder="K-pop"
        />
        <label>K-POP</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="Country"
          defaultChecked={category.includes("Country")}
          onChange={hendFilter}
          placeholder="K-pop"
        />
        <label>Country</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="Pop"
          defaultChecked={category.includes("Pop")}
          onChange={hendFilter}
          placeholder="K-pop"
        />
        <label>Pop</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="Heavy Metal"
          defaultChecked={category.includes("Heavy Metal")}
          onChange={hendFilter}
          placeholder="K-pop"
        />
        <label>Heavy Metal</label>
      </div>
      <h2>Sort</h2>
      <div onChange={heandleSortBy}>
        <div>
          <input
            type="radio"
            value="asc"
            defaultChecked={sortBy === "asc"}
            name="sortBy"
          />
          <label>Ascnding</label>
        </div>
        <div>
          <input
            type="radio"
            value="desc"
            defaultChecked={sortBy === "desc"}
            name="sortBy"
          />
          <label>Descnding</label>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
