import React, { useState } from 'react';
import { Country } from '../interface/Country';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Listing.module.css'
import Image from 'next/image';

interface ListingCountriesProps {
  setCountries: React.Dispatch<React.SetStateAction<Country[] | []>>;
  countries: Country[];
  toggle: boolean;
  setSelected: React.Dispatch<React.SetStateAction<Country | null>>;
}

export default function ListingCountries({ setCountries, countries, toggle, setSelected }: ListingCountriesProps) {
  const [showFilter, setShowFilter] = useState<boolean>(false)

  /**
   * Select the region then call the API that will only return the
   * selected region.
   * 
   * @param region -> string of the region
   */
  const filterByRegion = async (region: string) => {
    const response = await fetch("/api/countries", {
      method: 'POST',
      body: JSON.stringify({ url: `/v3.1/region/${region}` })
    })
    const data = await response.json();
    setCountries(data)
  }

  /**
   * Call the API on every change of search bar.
   * If blank then all countries will be shown.
   * 
   * @param e : onchange of search input
   */
  const searching = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let response = null;
    if (e.target.value === "") {
      response = await fetch("/api/countries", {
        method: 'POST',
        body: JSON.stringify({ url: `/v3.1/all` })
      })
    } else {
      response = await fetch("/api/countries", {
        method: 'POST',
        body: JSON.stringify({ url: `/v3.1/name/${e.target.value}` })
      })
    }
    const data = await response.json();
    setCountries(data)
  }

  return (
    <>
      {/* 
          Filter header
        */}
      <div className={styles.filterBox}>
        <div className={styles.searchbar} style={{ backgroundColor: `${toggle ? '#2B3844' : '#FFFFFF'}` }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} fixedWidth />
          <input type="text" placeholder='Search for a country...' style={{ color: `${toggle ? '#FFFFFF' : '#111517'}` }} onChange={(e) => searching(e)} />
        </div>
        <div className={styles.dropdown}>
          <div className={styles.filter} onClick={() => setShowFilter(!showFilter)} style={{ backgroundColor: `${toggle ? '#2B3844' : '#FFFFFF'}` }}>
            <p>Filter by Region</p>
            <FontAwesomeIcon icon={faChevronDown} fixedWidth />
          </div>
          {
            showFilter ?
              <div className={styles.dropdownContent} style={{ backgroundColor: `${toggle ? '#2B3844' : '#FFFFFF'}` }}>
                <span onClick={() => filterByRegion('Africa')}>Africa</span>
                <span onClick={() => filterByRegion('Americas')}>Americas</span>
                <span onClick={() => filterByRegion('Asia')}>Asia</span>
                <span onClick={() => filterByRegion('Europe')}>Europe</span>
                <span onClick={() => filterByRegion('Oceania')}>Oceania</span>
              </div> : null
          }
        </div>
      </div>

      {/* 
          Cards
        */}
      <div className={styles.cardContainer}>
        {
          countries.length > 0 ?
            countries.map((item: Country, index: number) => {
              return <div className={styles.card} key={index} style={{ backgroundColor: `${toggle ? '#2B3844' : '#FFFFFF'}` }} onClick={() => setSelected(item)}>
                <Image src={item.flags.png} alt="flag" width={1000} height={1000} priority />
                <div className={styles.text}>
                  <h3>{item.name.common}</h3>
                  <p><span>Population:</span> {item.population.toLocaleString('en-us')}</p>
                  <p><span>Region:</span> {item.region}</p>
                  <p><span>Capital:</span> {item.capital}</p>
                </div>
              </div>
            }) : <div>hello</div>
        }
      </div>
    </>
  )
}