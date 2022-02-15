import React, { FC, useEffect, useState } from 'react';

type TimerProps = {
  endDate: string;
}

const Timer:FC<TimerProps> = ({ endDate }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date(endDate);

    const intervalId = setInterval(() => {
      if (endDate === '') {
        return;
      }

      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="timer-wrapper">
      <div className="timer-inner">
        {days}
        d:
        {hours}
        h:
        {minutes}
        m:
        {seconds}
        s
      </div>
    </div>
  );
};

export default Timer;
