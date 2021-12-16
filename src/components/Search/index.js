import React from 'react';
import './styles.scss';

function Search() {
  const displayRegion = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="search">
      <input
        type="text"
        onChange={displayRegion}
      />
    </div>
  );
}

export default Search;
