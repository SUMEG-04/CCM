import Header, { type HeaderLink } from '../Header/Header'
import Footer, { type FooterLink } from '../Footer/Footer'
import './Layout.css'

interface LayoutProps {
    children: React.ReactNode
    title?: string
    headerLinks?: HeaderLink[]
    footerLinks?: FooterLink[]
    copyright?: string
}

const Layout = ({ children, title, headerLinks, footerLinks, copyright }: LayoutProps) => {
    return (
        <div className="app-layout">
            <Header title={title} links={headerLinks} />
            <main className="app-layout-main">{children}</main>
            <Footer copyright={copyright} links={footerLinks} />
        </div>
    )
}

export default Layout
