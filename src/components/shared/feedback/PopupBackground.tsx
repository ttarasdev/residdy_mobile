import { PopupActivityProvider } from './PopupActivity'
import { createContext, useRef, type ReactNode, type RefObject } from 'react'
import { View } from 'react-native'
import { BlurTargetView } from 'expo-blur'

export const PopupBlurTarget = createContext<
    RefObject<View | null> | undefined
>(undefined)
export default function PopupBackground({ children }: { children: ReactNode }) {
    const target = useRef<View>(null)
    return (
        <PopupActivityProvider>
            <PopupBlurTarget.Provider value={target}>
                <BlurTargetView ref={target} style={{ flex: 1 }}>
                    {children}
                </BlurTargetView>
            </PopupBlurTarget.Provider>
        </PopupActivityProvider>
    )
}
