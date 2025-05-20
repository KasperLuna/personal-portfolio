import { useState, useEffect } from "react"

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    const [isExpired, setIsExpired] = useState(false)

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = targetDate.getTime() - new Date().getTime()

            if (difference <= 0) {
                setIsExpired(true)
                return { days: 0, hours: 0, minutes: 0, seconds: 0 }
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        }

        setTimeLeft(calculateTimeLeft())

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    const timeBlocks = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ]

    if (isExpired) {
        return (
            <div className="text-center py-2">
                <p className="text-lg font-medium text-purple-600 dark:text-purple-400">The party is happening now! 🎉</p>
            </div>
        )
    }

    return (
        <div className="w-full">
            <h3 className="text-center font-medium mb-3 text-slate-800 dark:text-slate-200">Countdown to Party Time!</h3>
            <div className="grid grid-cols-4 gap-2">
                {timeBlocks.map((block) => (
                    <div key={block.label} className="flex flex-col items-center">
                        <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-lg w-full py-2 px-1 flex items-center justify-center">
                            <span className="text-xl md:text-2xl font-bold">{block.value.toString().padStart(2, "0")}</span>
                        </div>
                        <span className="text-xs mt-1 text-slate-600 dark:text-slate-400">{block.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}