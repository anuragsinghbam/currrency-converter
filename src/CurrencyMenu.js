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
    changeValue,
    currencyClass,
    countryClass,
    selectClass,
    inputClass,
  } = props

  return (
    <div className={currencyClass}>
      <div className='currency-details'>
        <div className='country'>
          <img src={flagUrl} alt={countryName + ' Flag'} />
          <p>{countryName}</p>
        </div>
      </div>

      <div className='value-input'>
        <select
          className={selectClass}
          value={currencyCode}
          onChange={changeCurrency}
        >
          {currencyList.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <div className='input-group flex-nowrap'>
          <input
            type='number'
            className={inputClass}
            placeholder='Username'
            aria-label='Username'
            aria-describedby='addon-wrapping'
            value={value}
            onChange={changeValue}
          />
        </div>
      </div>

      <span className={countryClass}>{currencyName}</span>
    </div>
  )
}
