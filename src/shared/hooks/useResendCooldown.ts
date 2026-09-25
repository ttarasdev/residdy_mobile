import { useEffect, useState } from 'react'

export default function useResendCooldown() {
    const [until, setUntil] = useState(0)
    const [seconds, setSeconds] = useState(0)
    useEffect(() => {
        if (!until) return
        const update = () => setSeconds(Math.max(0, Math.ceil((until - Date.now()) / 1000)))
        update()
        const timer = setInterval(update, 1000)
        return () => clearInterval(timer)
    }, [until])
    return { seconds, start: () => { setSeconds(60); setUntil(Date.now() + 60000) } }
}
