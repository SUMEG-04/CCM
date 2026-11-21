import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavItem from '../NavItem/NavItem'
import { useAuth } from '../../context/AuthContext'
import './Header.css'

export interface HeaderLink {
    label: string
    to: string
}

interface HeaderProps {
    title?: string
    links?: HeaderLink[]
}

const defaultLinks: HeaderLink[] = [
    { label: 'Login', to: '/login' },
    { label: 'Register', to: '/register' },
]

const Header = ({ title = 'Health Checker', links = defaultLinks }: HeaderProps) => {
    const { user, isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const [timeZone, setTimeZone] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const profileRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
            setTimeZone(tz)
        } catch {
            setTimeZone('UTC')
        }
    }, [])

    // Close popup on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMenuOpen])

    const handleLogout = () => {
        setIsMenuOpen(false)
        logout()
        navigate('/login')
    }

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev)
    }

    // Name and initial calculation
    const initial = (user?.username?.[0] || 'U').toUpperCase()
    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.username || 'User'

    return (
        <header className="app-header">
            <div className="app-header-left">
                <Link to="/" className="app-header-title">{title}</Link>
            </div>

            <nav className="app-header-nav">
                {isAuthenticated && user ? (
                    <div className="profile-section-wrapper" ref={profileRef}>
                        <button
                            type="button"
                            className="profile-trigger-btn"
                            onClick={toggleMenu}
                            aria-expanded={isMenuOpen}
                            aria-haspopup="true"
                        >
                            <span className="profile-avatar-circle">{initial}</span>
                            <span className="profile-full-name">{fullName}</span>
                            <span className="profile-dropdown-arrow">{isMenuOpen ? '▲' : '▼'}</span>
                        </button>

                        {isMenuOpen && (
                            <div className="profile-popup-menu">
                                <div className="profile-popup-header">
                                    <div className="profile-popup-avatar">{initial}</div>
                                    <div className="profile-popup-userinfo">
                                        <div className="profile-popup-name">{fullName}</div>
                                        <div className="profile-popup-username">@{user.username}</div>
                                    </div>
                                </div>

                                <div className="profile-popup-divider" />

                                <div className="profile-popup-details">
                                    <div className="profile-popup-row">
                                        <span className="profile-row-label">Username</span>
                                        <span className="profile-row-value">{user.username}</span>
                                    </div>
                                    {(user.firstName || user.lastName) && (
                                        <div className="profile-popup-row">
                                            <span className="profile-row-label">Full Name</span>
                                            <span className="profile-row-value">{fullName}</span>
                                        </div>
                                    )}
                                    {user.email && (
                                        <div className="profile-popup-row">
                                            <span className="profile-row-label">Email</span>
                                            <span className="profile-row-value">{user.email}</span>
                                        </div>
                                    )}
                                    <div className="profile-popup-row">
                                        <span className="profile-row-label">Timezone</span>
                                        <span className="profile-row-value">🌐 {timeZone || 'UTC'}</span>
                                    </div>
                                </div>

                                <div className="profile-popup-divider" />

                                <div className="profile-popup-actions">
                                    <button
                                        type="button"
                                        className="btn-popup-logout"
                                        onClick={handleLogout}
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    links.map((link) => (
                        <NavItem key={link.to} label={link.label} to={link.to} />
                    ))
                )}
            </nav>
        </header>
    )
}

export default Header
