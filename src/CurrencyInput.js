import React from 'react'

export default function CurrencyInput(props) {
  const {
    currencyList,
    currentCurrency,
    changeCurrency,
    amount,
    onChangeValue,
  } = props

  return (
    <div>
      <input type='number' value={amount} onChange={onChangeValue} />
      <select value={currentCurrency} onChange={changeCurrency}>
        {currencyList.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  )
}
 
