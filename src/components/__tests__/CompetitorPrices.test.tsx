import React from "react";
import { render } from "@testing-library/react";
import type { Competitors, SupportedCurrency } from "@/types";
import CompetitorPrices from "../CompetitorPrices";

describe("CompetitorPrices", () => {
  it("renders rounded competitor prices in KRW correctly", () => {
    const competitors: Competitors = {
      Expedia: 300123.22,
      HotelsCom: 250500.75,
    };
    const currency: SupportedCurrency = "KRW";
    const { getByText } = render(
      <CompetitorPrices competitors={competitors} currency={currency} />
    );

    expect(getByText("Competitor Prices:")).toBeInTheDocument();
    expect(getByText("Expedia:")).toBeInTheDocument();
    expect(getByText("300,100 KRW")).toBeInTheDocument();
    expect(getByText("HotelsCom:")).toBeInTheDocument();
    expect(getByText("250,500 KRW")).toBeInTheDocument();
  });

  it("renders rounded competitor prices in USD correctly", () => {
    const competitors: Competitors = {
      Booking: 101.21,
      Agoda: 99.99,
    };
    const currency: SupportedCurrency = "USD";
    const { getByText } = render(
      <CompetitorPrices competitors={competitors} currency={currency} />
    );

    expect(getByText("Competitor Prices:")).toBeInTheDocument();
    expect(getByText("Booking:")).toBeInTheDocument();
    expect(getByText("USD 101")).toBeInTheDocument();
    expect(getByText("Agoda:")).toBeInTheDocument();
    expect(getByText("USD 100")).toBeInTheDocument();
  });

  it("renders correctly when no competitors are provided", () => {
    const currency: SupportedCurrency = "USD";
    const { container } = render(
      <CompetitorPrices competitors={undefined} currency={currency} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders rounded competitor prices in SGD correctly", () => {
    const competitors: Competitors = {
      Rakuten: 7895.67,
      Jalan: 6750.33,
    };
    const currency: SupportedCurrency = "SGD";
    const { getByText } = render(
      <CompetitorPrices competitors={competitors} currency={currency} />
    );

    expect(getByText("Competitor Prices:")).toBeInTheDocument();
    expect(getByText("Rakuten:")).toBeInTheDocument();
    expect(getByText("SGD 7896")).toBeInTheDocument();
    expect(getByText("Jalan:")).toBeInTheDocument();
    expect(getByText("SGD 6750")).toBeInTheDocument();
  });
});
