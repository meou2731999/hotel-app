"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import HotelComponent from "@/components/HotelComponent";
import type { Hotel, SupportedCurrency } from "@/types";
import { fetchHotelData } from "@/lib/api";

const Home: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [currency, setCurrency] = useState<SupportedCurrency>(() => {
    // Check if localStorage is available (client-side)
    if (typeof window !== "undefined") {
      const storedCurrency = localStorage.getItem("selectedCurrency");
      return (storedCurrency as SupportedCurrency) || "USD";
    }
    return "USD";
  });

  useEffect(() => {
    const loadHotels = async () => {
      const hotelData = await fetchHotelData(currency);
      setHotels(hotelData);
    };

    loadHotels();
  }, [currency]);

  const handleCurrencyChange = (newCurrency: SupportedCurrency) => {
    setCurrency(newCurrency);
    // Save the selected currency to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCurrency", newCurrency);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <Head>
        <title>Hotel Search Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-semibold mb-4">Hotel Search Results</h1>

      <div className="flex items-center mb-4">
        <label htmlFor="currency" className="block font-semibold mr-2">
          Select Currency:
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) =>
            handleCurrencyChange(e.target.value as SupportedCurrency)
          }
          className="p-1 border rounded"
        >
          <option value="USD">USD</option>
          <option value="SGD">SGD</option>
          <option value="CNY">CNY</option>
          <option value="KRW">KRW</option>
          <option value="JPY">JPY</option>
          <option value="IDR">IDR</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <HotelComponent key={hotel.id} hotel={hotel} currency={currency} />
          ))
        ) : (
          <p>No hotels available for the selected currency.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
