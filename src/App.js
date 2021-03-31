import './App.css'
import React, { useEffect, useState } from 'react'
import CurrencyMenu from './CurrencyMenu'

// Fetch list of currencies
const BASE_URL =
  'https://v6.exchangerate-api.com/v6/a707d1172e88c17d8379cd71/latest/'

// Fetch extra details like, flag image, country name and currency name
const ENRICHED_URL =
  'https://v6.exchangerate-api.com/v6/a707d1172e88c17d8379cd71/enriched/'

export default function App() {
  const [currencyList, setCurrencyList] = useState([])
  const [sourceCurrencyName, setSourceCurrencyName] = useState('United States Dollar')
  const [targetCurrencyName, setTargetCurrencyName] = useState('Indian Rupee')
  const [sourceCountryFlag, setSourceCountryFlag] = useState('US.gif')
  const [targetCountryFlag, setTargetCountryFlag] = useState('IN.gif')
  const [sourceCountryName, setSourceCountryName] = useState('United States')
  const [targetCountryName, setTargetCountryName] = useState('India')
  const [sourceCurrencyCode, setSourceCurrencyCode] = useState('USD')
  const [targetCurrencyCode, setTargetCurrencyCode] = useState('INR')
  const [sourceCurrencyValue, setSourceCurrencyValue] = useState(1)
  const [targetCurrencyValue, setTargetCurrencyValue] = useState(1)
  const [conversionRate, setConversionRate] = useState(73.1717)
  const [trackChange, setTrackChange] = useState(true)

  // This fucntion gets data from BASE_URL API and makes list (Array) of Currencies
  useEffect(() => {
    fetch(BASE_URL + sourceCurrencyCode)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyList(Object.keys(data.conversion_rates))
      })
  }, [])

  // This function gets data from second ENRICHED_URL API and populates details in the source currency section

  useEffect(() => {
    fetch(ENRICHED_URL + sourceCurrencyCode + '/' + sourceCurrencyCode)
      .then((res) => res.json())
      .then((data) => {
        setSourceCurrencyName(data.target_data.currency_name)
        setSourceCountryFlag(data.target_data.flag_url)
        setSourceCountryName(data.target_data.locale)
        setSourceCurrencyCode(data.target_code)
        if (trackChange) {
          setTargetCurrencyValue(
            (sourceCurrencyValue * conversionRate).toFixed(4)
          )
        } else {
          setSourceCurrencyValue(
            (targetCurrencyValue / conversionRate).toFixed(4)
          )
        }
      })
  }, [
    sourceCurrencyCode,
    targetCurrencyCode,
    conversionRate,
    sourceCurrencyValue,
    targetCurrencyValue,
  ])

  // This function gets data from second ENRICHED_URL API and populates details in the target currency section

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

    <h3>Currency Converter</h3>

      <CurrencyMenu
        flagUrl={sourceCountryFlag}
        currencyName={sourceCurrencyName}
        currencyCode={sourceCurrencyCode}
        currencyList={currencyList}
        changeCurrency={changeCurrency}
        countryName={sourceCountryName}
        value={sourceCurrencyValue}
        changeValue={changeSourceCurrencyValue}
        currencyClass={'source-currency currency-menu'}
        countryClass={'input-group-text country-name source-country'}
        selectClass={'form-select currency-select source-currency-select'}
        inputClass={'form-control currency-input source-input'}
      />

      <div className='updown-arrow'>
        <img src='updown-arrow.svg' />
      </div>

      <CurrencyMenu
        flagUrl={targetCountryFlag}
        currencyName={targetCurrencyName}
        currencyCode={targetCurrencyCode}
        currencyList={currencyList}
        changeCurrency={changeTargetCurrency}
        countryName={targetCountryName}
        value={targetCurrencyValue}
        changeValue={changeTargetCurrencyValue}
        currencyClass={'target-currency currency-menu'}
        countryClass={'input-group-text country-name target-country'}
        selectClass={'form-select currency-select target-currency-select'}
        inputClass={'form-control currency-input target-input'}
      />
    </div>
  )
}
