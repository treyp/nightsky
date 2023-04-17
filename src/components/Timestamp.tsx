import classNames from "classnames";
import { useEffect, useState, ComponentPropsWithoutRef } from "react";

const timeUnits = {
  y: 24 * 60 * 60 * 1000 * 365,
  mo: (24 * 60 * 60 * 1000 * 365) / 12,
  d: 24 * 60 * 60 * 1000,
  h: 60 * 60 * 1000,
  m: 60 * 1000,
  s: 1000,
};

function relativeTimeSince(sinceDate: Date) {
  const now = new Date();
  const elapsedTime = sinceDate.getTime() - now.getTime();
  const largestTimeUnit = Object.entries(timeUnits).find(([, msSize]) => {
    if (Math.abs(elapsedTime) > msSize) {
      return true;
    }
  });
  if (largestTimeUnit) {
    const [unit, msSize] = largestTimeUnit;
    return `${Math.round(Math.abs(elapsedTime / msSize))}${unit}`;
  }
  return "0s";
}

interface TimestampProps extends ComponentPropsWithoutRef<"span"> {
  date: Date;
  updateInterval?: number;
  className?: string;
}

export default function Timestamp({
  date,
  updateInterval = 5000,
  className,
  ...props
}: TimestampProps) {
  const [timeAgo, setTimeAgo] = useState(relativeTimeSince(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(relativeTimeSince(date));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <span
      className={classNames(className)}
      title={date.toLocaleString()}
      {...props}
    >
      {timeAgo}
    </span>
  );
}
