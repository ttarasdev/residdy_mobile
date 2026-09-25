import { useEffect, useState } from 'react'
import { AccessibilityInfo, Platform } from 'react-native'

export default function useAccessibilityPreferences() {
    const [reduceMotion, setReduceMotion] = useState(true)
    const [reduceTransparency, setReduceTransparency] = useState(false)
    useEffect(() => {
        let active = true
        let motionChanged = false
        let transparencyChanged = false
        void AccessibilityInfo.isReduceMotionEnabled().then((value) => {
            if (active && !motionChanged) setReduceMotion(value)
        }).catch(() => {})
        const motion = AccessibilityInfo.addEventListener('reduceMotionChanged', (value) => {
            motionChanged = true
            setReduceMotion(value)
        })
        const transparency = Platform.OS === 'ios'
            ? AccessibilityInfo.addEventListener('reduceTransparencyChanged', (value) => {
                transparencyChanged = true
                setReduceTransparency(value)
            }) : undefined
        if (Platform.OS === 'ios') {
            void AccessibilityInfo.isReduceTransparencyEnabled().then((value) => {
                if (active && !transparencyChanged) setReduceTransparency(value)
            }).catch(() => {})
        }
        return () => { active = false; motion.remove(); transparency?.remove() }
    }, [])
    return { reduceMotion, reduceTransparency }
}
