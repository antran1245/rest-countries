import React from 'react';
import { Country } from './interface/Country';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Detail.module.css'

interface DetailPageProps {
  setSelected: React.Dispatch<React.SetStateAction<Country | null>>
  selected: Country;
  toggle: boolean;
}

export default function DetailPage({ setSelected, selected, toggle }: DetailPageProps) {
  return (
    <>
      <div className={styles.back} onClick={() => setSelected(null)}>
        <FontAwesomeIcon icon={faArrowLeftLong} fixedWidth />
        <p>Back</p>
      </div>
      <div className={styles.flagContainer}>
        <img src={selected.flags.png} alt={selected.name.common} />
        <div className={styles.content}>
          <h2>{selected.name.common}</h2>
          <div className={styles.info}>
            <div>
              <p><b>Native Name:</b> {Object.values(selected.name.nativeName)[0].official}</p>
              <p><b>Population:</b> {selected.population.toLocaleString('en-us')}</p>
              <p><b>Region:</b> {selected.region}</p>
              <p><b>Sub Region:</b> {selected.subregion}</p>
              <p><b>Capital:</b> {selected.capital}</p>
            </div>
            <div>
              <p><b>Top Level Domain:</b> {selected.tld[0]}</p>
              <p><b>Currencies:</b> {Object.keys(selected.currencies)[0]}</p>
              <p><b>Languages:</b> {Object.values(selected.languages).join(',')}</p>
            </div>
          </div>
          <div className={styles.border}>
            <b>Border Countries:</b>
            {
              selected.borders.map((item: string, index: number) => {
                return <div key={index} className={styles.borderBox}>{item}</div>
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}