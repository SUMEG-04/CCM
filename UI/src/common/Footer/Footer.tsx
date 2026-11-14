import NavItem from '../NavItem/NavItem'
import './Footer.css'

export interface FooterLink {
    label: string
    to: string
}

interface FooterProps {
    copyright?: string
    links?: FooterLink[]
}

const defaultLinks: FooterLink[] = [
    { label: 'Login', to: '/login' },
    { label: 'Register', to: '/register' },
]

const Footer = ({
    copyright = `© ${new Date().getFullYear()} Health Checker`,
    links = defaultLinks,
}: FooterProps) => {
    return (
        <footer className="app-footer">
            <p className="app-footer-copy">{copyright}</p>
            <nav className="app-footer-nav">
                {links.map((link) => (
                    <NavItem key={link.to} label={link.label} to={link.to} />
                ))}
            </nav>
        </footer>
    )
}

export default Footer
