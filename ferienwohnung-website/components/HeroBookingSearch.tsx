"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type BookingSearchCopy = {
  ariaLabel: string;
  arrival: string;
  departure: string;
  guests: string;
  guestSingular: string;
  guestPlural: string;
  accommodation: string;
  all: string;
  tiny: string;
  langenholtensen: string;
  submit: string;
  missingArrival: string;
  missingDeparture: string;
  invalidRange: string;
  minStayHint: string;
  loading: string;
};

const bookingUrl = "https://booking.smoobu.com/9A1852331";

function formatSmoobuDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function nextDay(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

function localToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function HeroBookingSearch({ copy }: { copy: BookingSearchCopy }) {
  const arrivalInput = useRef<HTMLInputElement>(null);
  const departureInput = useRef<HTMLInputElement>(null);
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState("2");
  const [apartmentId, setApartmentId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const today = localToday();
    if (arrivalInput.current) arrivalInput.current.min = today;
    if (departureInput.current) departureInput.current.min = arrival ? nextDay(arrival) : today;
  }, [arrival]);

  function handleArrival(value: string) {
    setArrival(value);
    if (departure && departure <= value) setDeparture("");
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!arrival) return setError(copy.missingArrival);
    if (!departure) return setError(copy.missingDeparture);
    if (departure <= arrival) return setError(copy.invalidRange);

    const url = new URL(bookingUrl);
    url.searchParams.set("arrivalDate", formatSmoobuDate(arrival));
    url.searchParams.set("departureDate", formatSmoobuDate(departure));
    url.searchParams.set("adults", guests);
    url.searchParams.set("children", "0");
    if (apartmentId) url.searchParams.set("apartmentId", apartmentId);

    setError("");
    setLoading(true);
    window.location.assign(url.toString());
  }

  return (
    <form id="booking-search" className="hero-booking-search" aria-label={copy.ariaLabel} onSubmit={handleSubmit}>
      <label>
        <span>{copy.arrival}</span>
        <input
          type="date"
          name="arrival"
          ref={arrivalInput}
          value={arrival}
          onChange={(event) => handleArrival(event.target.value)}
          required
        />
      </label>
      <label>
        <span>{copy.departure}</span>
        <input
          type="date"
          name="departure"
          ref={departureInput}
          value={departure}
          onChange={(event) => {
            setDeparture(event.target.value);
            setError("");
          }}
          required
        />
      </label>
      <label>
        <span>{copy.guests}</span>
        <select name="guests" value={guests} onChange={(event) => setGuests(event.target.value)}>
          {[1, 2, 3, 4, 5].map((count) => (
            <option value={count} key={count}>
              {count} {count === 1 ? copy.guestSingular : copy.guestPlural}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>{copy.accommodation}</span>
        <select
          name="apartmentId"
          value={apartmentId}
          onChange={(event) => setApartmentId(event.target.value)}
        >
          <option value="">{copy.all}</option>
          <option value="3464021">{copy.tiny}</option>
          <option value="3526331">{copy.langenholtensen}</option>
        </select>
      </label>
      <button type="submit" disabled={loading}>
        <span>{loading ? copy.loading : copy.submit}</span>
        <span aria-hidden="true">↗</span>
      </button>
      <div className="booking-search-status" aria-live="polite">
        {error || copy.minStayHint}
      </div>
    </form>
  );
}
