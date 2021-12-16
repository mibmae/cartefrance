import React, { useState, useEffect } from 'react';
import './styles.scss';
import ReactDOM from 'react-dom';
import France from '@svg-maps/france.departments';
// import France from '@svg-maps/france.regions';
import { SVGMap, RadioSVGMap, CheckboxSVGMap } from 'react-svg-map';
import Search from 'src/components/Search';
// import { CheckboxSVGMap } from "react-svg-map";
import 'react-svg-map/lib/index.css';

function Map() {
  const [departements, setDepartements] = useState([]);
  const [results, setResults] = useState([]);
  const [nameDepartements, setNameDepartements] = useState([]);

  const handleOnClick = (e) => {
    console.log(e);
    const dep = France.locations.find((el) => el.id === e.target.id);
    // const dep = e.map((t) => France.locations.find((el) => el.id === t.id));
    const list = departements.find((element) => element.id === e.target.id);
    // const list = departements.find((element) => element.id === e.target.id);
    console.log(list);
    if (list) {
      console.log('deja', e.target.id);
    }
    else {
      const test = document.getElementById(e.target.id);
      const att = test.getAttribute('aria-checked');
      if (att === 'false') {
        test.setAttribute('aria-checked', 'true');
      }
      else {
        test.setAttribute('aria-checked', 'false');
      }
      document.getElementById('locations').style.display = 'block';
      setDepartements([...departements, dep]);
    }
  };

  const handleOnChange = (e) => {
    const dep = e.map((t) => France.locations.find((el) => el.id === t.id));
    document.getElementById('locations').style.display = 'block';
    setDepartements(dep);
  };

  const displayDep = (e) => {
    const dep = France.locations.find((el) => el.id === e.target.id);
    const tooltipSpan = document.getElementById('tooltip');
    document.getElementById('tooltip').style.display = 'block';
    document.getElementById('tooltip').style.left = `${e.clientX}px`;
    window.onmousemove = function (f) {
      const x = f.clientX;
      const y = f.clientY;
      tooltipSpan.style.top = `${y + 10}px`;
      tooltipSpan.style.left = `${x + 10}px`;
    };
    setNameDepartements(dep.name);
  };
  function strUcFirst(a) {
    return (`${a}`).charAt(0).toUpperCase() + a.substr(1);
  }

  const hideDep = () => {
    const tooltipSpan = document.getElementById('tooltip');
    tooltipSpan.style.display = 'none';
    setNameDepartements('');
  };
  const displayRegion = (e) => {
    if (e.target.value.length >= 1) {
      const str = e.target.value;
      const region = strUcFirst(str);
      const dep = France.locations.filter((el) => el.name.startsWith(region));
      console.log(dep);
      setResults(dep);
    }
    else {
      setResults('');
    }
  };

  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   const div = document.getElementById('locations');
  //   //   div.style.display = 'none';
  //   // }, -10);
  // }, [departements]);
  return (

    <div className="map-container">
      <CheckboxSVGMap
        map={France}
        // onLocationClick={(e) => console.log(`vous avez cliqué sur ${e}`)}
        // onLocationMouseOver={location}
        onChange={handleOnChange}
        // locationAriaLabel={(e) => console.log(e.name)}
        onLocationMouseOver={displayDep}
        onLocationMouseOut={hideDep}
        // onLocationFocus={(e) => console.log(e)}
        // onLocationBlur={this.handleLocationBlur}
        // onChange={location}
      // onLocationMouseOver={location}
        CheckboxSVGMap

      />
      {/* <div className="search">
        <input
          type="text"
          onChange={displayRegion}
        />
      </div>
      <div className="result">
        <ul onClick={handleOnClick}> {results.length >= 1 ? (results.map((e) => <li id={e.id} key={e.id}>{e.name}</li>)) : ('Aucune région trouvée')} </ul>
      </div> */}
      <div className="locations" id="locations"> {departements.map((e) => <li className="items" key={e.id}>{e.name} ({e.id})</li>)}

      </div>
      <div id="tooltip" className="tooltip">{nameDepartements}</div>
    </div>
  );
}

export default Map;
