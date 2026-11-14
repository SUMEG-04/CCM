import { Link } from 'react-router-dom'
import NavItem from '../NavItem/NavItem'
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
    return (
        <header className="app-header">
            <Link to="/" className="app-header-title">{title}</Link>
            <nav className="app-header-nav">
                {links.map((link) => (
                    <NavItem key={link.to} label={link.label} to={link.to} />
                ))}
            </nav>
        </header>
    )
}

export default Header
