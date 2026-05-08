import { useState } from "react";
const currencies = [
  "USD",
  "INR",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
];

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState(null);

  const convertCurrency = async () => {
    try {
      const res = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await res.json();
      const rate = data.rates[toCurrency];
      setResult((amount * rate).toFixed(2));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[350px]">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Currency Converter
        </h1>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg"
          >
            {currencies.map((currency) => (
              <option key={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg"
          >
            {currencies.map((currency) => (
              <option key={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <button
          onClick={convertCurrency}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Convert
        </button>
        {result && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-gray-700">
              {amount} {fromCurrency} =
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {result} {toCurrency}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}