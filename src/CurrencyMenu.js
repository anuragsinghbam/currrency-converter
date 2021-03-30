import React from 'react'

export default function CurrencyMenu(props) {
  const {
    flagUrl,
    currencyName,
    currencyCode,
    currencyList,
    changeCurrency,
    countryName,
    value,
    changeValue
  } = props

  return (
    <div className='currency-menu'>
      <div className='currency-details'>
        <div className='country'>
          <img src={flagUrl} />
          <p>{countryName}</p>
        </div>
      </div>

      <select value={currencyCode} onChange={changeCurrency}>
        {currencyList.map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>

      <div className='value-input'>
        <div className='text-details'>
          <p>{currencyCode}</p>
          <p>{currencyName}</p>
        </div>
        <input type='number' value={value} onChange={changeValue} />
      </div>
    </div>
  )
}
