import { NavLink } from 'react-router-dom'
import './NavItem.css'

interface NavItemProps {
    label: string
    to: string
    sx?: {
        color?: string
        fontSize?: string
        fontWeight?: string
    }
}

const NavItem = ({ label, to, sx }: NavItemProps) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `nav-item${isActive ? ' nav-item-active' : ''}`}
            style={sx}
        >
            {label}
        </NavLink>
    )
}

export default NavItem
