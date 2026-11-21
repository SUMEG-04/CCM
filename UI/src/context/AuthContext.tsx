import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface User {
    username: string
    firstName?: string
    lastName?: string
    email: string
    role?: string
}

export interface AuthContextType {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const syncAuth = () => {
        try {
            const storedToken = localStorage.getItem('ccm_token')
            const storedUser = localStorage.getItem('ccm_user')

            if (storedToken && storedUser) {
                setToken(storedToken)
                setUser(JSON.parse(storedUser))
            } else {
                setToken(null)
                setUser(null)
            }
        } catch {
            setToken(null)
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        syncAuth()

        // Sync when storage changes (login/logout from any component or tab)
        const onStorage = () => syncAuth()
        window.addEventListener('storage', onStorage)
        window.addEventListener('ccm_auth_change', onStorage)

        return () => {
            window.removeEventListener('storage', onStorage)
            window.removeEventListener('ccm_auth_change', onStorage)
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('ccm_token')
        localStorage.removeItem('ccm_user')
        setToken(null)
        setUser(null)
        window.dispatchEvent(new Event('ccm_auth_change'))
    }

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: Boolean(token && user), isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
export default AuthContext
