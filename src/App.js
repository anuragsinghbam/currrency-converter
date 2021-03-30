import './App.css'
import React, { useEffect, useState } from 'react'
import CurrencyInput from './CurrencyInput'

const BASE_URL = 'https://api.exchangeratesapi.io/latest?base='

export default function App() {
  const [currencyList, setCurrencyList] = useState([])
  const [sourceCurrency, setSourceCurrency] = useState()
  const [targetCurrency, setTargetCurrency] = useState()
  const [value, setValue] = useState(1)
  const [targetValue, setTargetValue] = useState(true)
  const [exchangeRate, setExchangeRate] = useState()

  let sourceAmount, targetAmount

  if (targetValue) {
    sourceAmount = value
    targetAmount = value * exchangeRate
  } else {
    targetAmount = value
    sourceAmount = value / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL + 'USD')
      .then((res) => res.json())
      .then((data) => {
        setCurrencyList(Object.keys(data.rates))
        setSourceCurrency(data.base)
        setTargetCurrency(Object.keys(data.rates)[11])
      })
  }, [])

  useEffect(() => {
    if (sourceCurrency != null && targetCurrency != null) {
      fetch(BASE_URL + sourceCurrency)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[targetCurrency]))
    }
  }, [targetCurrency, sourceCurrency])

  function handleSourceChange(e) {
    setValue(e.target.value)
    setTargetValue(true)
  }

  function handleTargetChange(e) {
    setValue(e.target.value)
    setTargetValue(false)
  }

  return (
    <div className='App'>
      <h1>Convert</h1>
      <CurrencyInput
        currencyList={currencyList}
        currentCurrency={sourceCurrency}
        changeCurrency={(e) => setSourceCurrency(e.target.value)}
        amount={sourceAmount}
        onChangeValue={handleSourceChange}
      />
      <div>=</div>
      <CurrencyInput
        currencyList={currencyList}
        currentCurrency={targetCurrency}
        changeCurrency={(e) => setTargetCurrency(e.target.value)}
        amount={targetAmount}
        onChangeValue={handleTargetChange}
      />
    </div>
  )
}

