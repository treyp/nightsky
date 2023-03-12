import { useEffect, useState } from "react";

const timeUnits = {
  y: 24 * 60 * 60 * 1000 * 365,
  mo: (24 * 60 * 60 * 1000 * 365) / 12,
  d: 24 * 60 * 60 * 1000,
  h: 60 * 60 * 1000,
  m: 60 * 1000,
  s: 1000,
};

function relativeTimeSince(sinceDate) {
  const now = new Date();
  const elapsedTime = sinceDate - now;
  for (var unit in timeUnits) {
    if (Math.abs(elapsedTime) > timeUnits[unit] || unit == "second") {
      return `${Math.round(Math.abs(elapsedTime / timeUnits[unit]))}${unit}`;
    }
  }
}

export default function Timestamp({ date, updateInterval = 5000 }) {
  const [timeAgo, setTimeAgo] = useState(relativeTimeSince(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(relativeTimeSince(date));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <span className="text-primary-content" title={date.toLocaleString()}>
      {timeAgo}
    </span>
  );
}
