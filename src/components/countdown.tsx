"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import "./flip-clock.css"

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

function FlipCard({ value, label }: { value: number; label: string }) {
  const displayVal = ("0" + value).slice(-2)
  const prevRef = useRef(displayVal)
  const [flip, setFlip] = useState(false)
  const [current, setCurrent] = useState(displayVal)
  const [previous, setPrevious] = useState(displayVal)

  useEffect(() => {
    if (displayVal !== prevRef.current) {
      setFlip(false)
      setPrevious(prevRef.current)
      setCurrent(displayVal)
      // Force reflow then trigger flip
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlip(true)
        })
      })
      prevRef.current = displayVal
    }
  }, [displayVal])

  return (
    <div className="flip-clock__piece">
      <div className={`flip-clock__card card${flip ? " flip" : ""}`}>
        {/* Top half – shows current value */}
        <span className="card__top">{current}</span>

        {/* Bottom half – shows previous value */}
        <span className="card__bottom" data-value={previous} />

        {/* Back – animated panels */}
        <span className="card__back" data-value={previous}>
          <span className="card__bottom" data-value={current} />
        </span>
      </div>
      <span className="flip-clock__slot">{label}</span>
    </div>
  )
}

export default function ShiftingCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft())

  const tick = useCallback(() => {
    setTimeLeft(getTimeLeft())
  }, [])

  useEffect(() => {
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [tick])

  return (
    <div className="flip-clock">
      <FlipCard value={timeLeft.days} label="Days" />
      <FlipCard value={timeLeft.hours} label="Hours" />
      <FlipCard value={timeLeft.minutes} label="Minutes" />
      <FlipCard value={timeLeft.seconds} label="Seconds" />
    </div>
  )
}
