import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react'
const Context = createContext({
    busy: false,
    register: (): (() => void) => () => {},
})
export function PopupActivityProvider({ children }: { children: ReactNode }) {
    const [count, setCount] = useState(0)
    const register = useCallback(() => {
        setCount((value) => value + 1)
        return () => setCount((value) => Math.max(0, value - 1))
    }, [])
    const value = useMemo(
        () => ({ busy: count > 0, register }),
        [count, register],
    )
    return <Context.Provider value={value}>{children}</Context.Provider>
}
export function usePopupBlocker(active: boolean) {
    const { register } = useContext(Context)
    useEffect(() => (active ? register() : undefined), [active, register])
}
export function usePopupBusy() {
    return useContext(Context).busy
}
