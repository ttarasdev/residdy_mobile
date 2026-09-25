import { createContext, useContext, useState, type ReactNode } from 'react'

// Ephemeral flow context. No password/code in URL, storage, or navigation state.
interface AuthFlow { email: string; setEmail: (email: string) => void; notice: 'confirmed' | 'reset' | null; setNotice: (notice: 'confirmed' | 'reset' | null) => void }
const Context = createContext<AuthFlow | null>(null)
export default function AuthFlowProvider({ children }: { children: ReactNode }) {
    const [email, setEmail] = useState('')
    const [notice, setNotice] = useState<AuthFlow['notice']>(null)
    return <Context.Provider value={{ email, setEmail, notice, setNotice }}>{children}</Context.Provider>
}
export function useAuthFlow() {
    const value = useContext(Context)
    if (!value) throw new Error('useAuthFlow requires AuthFlowProvider')
    return value
}
