import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import { Country } from '../interface/Country';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.css'
import ListingCountries from '../components/listingCountries';
import DetailPage from '../components/detailPage';

export default function Home() {
  const [countries, setCountries] = useState<Country[] | []>([])
  const [toggle, setToggle] = useState<boolean>(false)
  const [selected, setSelected] = useState<Country | null>(null)

  // Getting all the data from the REST Countries API
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/countries", {
        method: 'POST',
        body: JSON.stringify({ url: `/v3.1/all` })
      })
      const data = await response.json();
      setCountries(data)
    };
    fetchTodos().catch(console.error)
  }, [])

  /**
   * Turn on and off the dark mode of the page.
   */
  const mode = () => {
    let preferMode = window.matchMedia("(prefers-color-scheme: dark)")
    setToggle(!toggle)
    if (preferMode.matches) {
      document.body.classList.toggle("light")
    } else {
      document.body.classList.toggle("dark")
    }
  }

  return (
    <div>
      <Head>
        <title>REST Countries API</title>
      </Head>

      {/* 
        Header to change the light/dark mode.
      */}
      <header>
        <h1>Where in the world?</h1>
        <div className={styles.darkMode} onClick={() => mode()}>
          {
            toggle ?
              <FontAwesomeIcon icon={faSun} fixedWidth /> :
              <FontAwesomeIcon icon={faMoon} fixedWidth />
          }
          <p>{toggle ? 'Light Mode' : 'Dark Mode'}</p>
        </div>
      </header>

      {/* 
        Display the countries
      */}
      <main className={styles.container}>
        {
          selected ?
            <DetailPage setSelected={setSelected} selected={selected} toggle={toggle} /> :
            <ListingCountries setCountries={setCountries} countries={countries} toggle={toggle} setSelected={setSelected} />
        }

      </main>
    </div>
  )
}
