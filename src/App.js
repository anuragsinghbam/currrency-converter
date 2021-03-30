import './App.css'
import React, { useEffect, useState } from 'react'
import CurrencyMenu from './CurrencyMenu'

const BASE_URL =
  'https://v6.exchangerate-api.com/v6/a707d1172e88c17d8379cd71/latest/'

const ENRICHED_URL =
  'https://v6.exchangerate-api.com/v6/a707d1172e88c17d8379cd71/enriched/'

export default function App() {
  const [currencyList, setCurrencyList] = useState([])
  const [sourceCurrencyName, setSourceCurrencyName] = useState('')
  const [targetCurrencyName, setTargetCurrencyName] = useState('')
  const [sourceCountryFlag, setSourceCountryFlag] = useState('')
  const [targetCountryFlag, setTargetCountryFlag] = useState('')
  const [sourceCountryName, setSourceCountryName] = useState('')
  const [targetCountryName, setTargetCountryName] = useState('')
  const [sourceCurrencyCode, setSourceCurrencyCode] = useState('USD')
  const [targetCurrencyCode, setTargetCurrencyCode] = useState('INR')
  const [sourceCurrencyValue, setSourceCurrencyValue] = useState(1)
  const [targetCurrencyValue, setTargetCurrencyValue] = useState(1)
  const [conversionRate, setConversionRate] = useState(73.1717)
  const [trackChange, setTrackChange] = useState(true)
  

  useEffect(() => {
    fetch(BASE_URL + 'USD')
      .then((res) => res.json())
      .then((data) => {
        setCurrencyList(Object.keys(data.conversion_rates))
      })
  }, [])

  useEffect(() => {
    fetch(ENRICHED_URL + sourceCurrencyCode + '/' + sourceCurrencyCode)
      .then((res) => res.json())
      .then((data) => {
        setSourceCurrencyName(data.target_data.currency_name)
        setSourceCountryFlag(data.target_data.flag_url)
        setSourceCountryName(data.target_data.locale)
        setSourceCurrencyCode(data.target_code)
        if (trackChange) {
          setTargetCurrencyValue(sourceCurrencyValue * conversionRate)
        } else {
          setSourceCurrencyValue(targetCurrencyValue / conversionRate)
        }
      })
  }, [
    sourceCurrencyCode,
    targetCurrencyCode,
    conversionRate,
    sourceCurrencyValue,
    targetCurrencyValue,
  ])

  useEffect(() => {
    fetch(ENRICHED_URL + sourceCurrencyCode + '/' + targetCurrencyCode)
      .then((res) => res.json())
      .then((data) => {
        setTargetCurrencyName(data.target_data.currency_name)
        setTargetCountryFlag(data.target_data.flag_url)
        setTargetCountryName(data.target_data.locale)
        setTargetCurrencyCode(data.target_code)
        setConversionRate(data.conversion_rate)
      })
  }, [
    sourceCurrencyCode,
    targetCurrencyCode,
    conversionRate,
    sourceCurrencyValue,
    targetCurrencyValue,
  ])

  function changeCurrency(e) {
    setSourceCurrencyCode(e.target.value)
  }

  function changeTargetCurrency(e) {
    setTargetCurrencyCode(e.target.value)
  }

  function changeSourceCurrencyValue(e) {
    setSourceCurrencyValue(e.target.value)
    setTrackChange(true)
  }

  function changeTargetCurrencyValue(e) {
    setTargetCurrencyValue(e.target.value)
    setTrackChange(false)
  }

  return (
    <div className='App'>
      <CurrencyMenu
        flagUrl={sourceCountryFlag}
        currencyName={sourceCurrencyName}
        currencyCode={sourceCurrencyCode}
        currencyList={currencyList}
        changeCurrency={changeCurrency}
        countryName={sourceCountryName}
        value={sourceCurrencyValue}
        changeValue={changeSourceCurrencyValue}
      />
      <CurrencyMenu
        flagUrl={targetCountryFlag}
        currencyName={targetCurrencyName}
        currencyCode={targetCurrencyCode}
        currencyList={currencyList}
        changeCurrency={changeTargetCurrency}
        countryName={targetCountryName}
        value={targetCurrencyValue}
        changeValue={changeTargetCurrencyValue}
      />
    </div>
  )
}
