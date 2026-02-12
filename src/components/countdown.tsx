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
    <div className="bg-transparent p-2 rounded-[48px]">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-center gap-2 sm:gap-4 text-white">
        {/* Days */}
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <div className="-mr-1 sm:-mr-2">
              <DigitReel value={days[0]} />
            </div>
            <div className="-ml-1 sm:-ml-2">
              <DigitReel value={days[1]} />
            </div>
          </div>
          <span className="text-xs sm:text-sm text-yellow-400/80 mt-1">days</span>
        </div>

        <div className="text-4xl sm:text-6xl text-white/40 font-light -mt-5 sm:-mt-6">:</div>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <div className="-mr-1 sm:-mr-2">
              <DigitReel value={hours[0]} />
            </div>
            <div className="-ml-1 sm:-ml-2">
              <DigitReel value={hours[1]} />
            </div>
          </div>
          <span className="text-xs sm:text-sm text-yellow-400/80 mt-1">hours</span>
        </div>

        <div className="text-4xl sm:text-6xl text-white/40 font-light -mt-5 sm:-mt-6">:</div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <div className="-mr-1 sm:-mr-2">
              <DigitReel value={minutes[0]} />
            </div>
            <div className="-ml-1 sm:-ml-2">
              <DigitReel value={minutes[1]} />
            </div>
          </div>
          <span className="text-xs sm:text-sm text-yellow-400/80 mt-1">mins</span>
        </div>

        <div className="text-4xl sm:text-6xl text-white/40 font-light -mt-5 sm:-mt-6">:</div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <div className="-mr-1 sm:-mr-2">
              <DigitReel value={seconds[0]} />
            </div>
            <div className="-ml-1 sm:-ml-2">
              <DigitReel value={seconds[1]} />
            </div>
          </div>
          <span className="text-xs sm:text-sm text-yellow-400/80 mt-1">secs</span>
        </div>
      </div>
    </div>
  )
}
