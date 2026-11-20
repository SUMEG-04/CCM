import Header, { type HeaderLink } from '../Header/Header'
import Footer, { type FooterLink } from '../Footer/Footer'
import CCMStoreProvider from '../../store/CCMStoreProvider'
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
        <CCMStoreProvider>
            <div className="app-layout">
                <Header title={title} links={headerLinks} />
                <main className="app-layout-main">{children}</main>
                <Footer copyright={copyright} links={footerLinks} />
            </div>
        </CCMStoreProvider>
    )
}

export default Layout
