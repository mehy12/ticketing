"use client"

import { useEffect, useState } from "react"
import DigitReel from "./digit-reel"

const TARGET_DATE = new Date("2026-03-27T08:30:00+05:30")

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const now = new Date()
  const distance = TARGET_DATE.getTime() - now.getTime()

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  }
}

export default function ShiftingCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const days = timeLeft.days.toString().padStart(2, "0")
  const hours = timeLeft.hours.toString().padStart(2, "0")
  const minutes = timeLeft.minutes.toString().padStart(2, "0")
  const seconds = timeLeft.seconds.toString().padStart(2, "0")

  return (
    <div className="mt-12 flex justify-center">
      <div className="mt-8 sm:mt-12 flex justify-center scale-[0.8] sm:scale-100 origin-center">



        <TimeBlock label="Days" first={days[0]} second={days[1]} />
        <Colon />

        <TimeBlock label="Hours" first={hours[0]} second={hours[1]} />
        <Colon />

        <TimeBlock label="Minutes" first={minutes[0]} second={minutes[1]} />
        <Colon />

        <TimeBlock label="Seconds" first={seconds[0]} second={seconds[1]} />

      </div>
    </div>
  )
}

/* ---------- Components ---------- */

function TimeBlock({
  label,
  first,
  second,
}: {
  label: string
  first: string
  second: string
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <div className="-mr-1">
          <DigitReel value={first} />
        </div>
        <div className="-ml-1">
          <DigitReel value={second} />
        </div>
      </div>
      <span className="mt-3 text-xs tracking-widest uppercase text-yellow-400/80">
        {label}
      </span>
    </div>
  )
}

function Colon() {
  return (
    <div className="text-3xl sm:text-5xl text-white/30 font-light">
      :
    </div>
  )
}
