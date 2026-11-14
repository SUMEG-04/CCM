import './Container.css';

interface ContainerProps {
    children: React.ReactNode
    sx?: {
        width?: string
        height?: string
        maxWidth?: string
        padding?: string
        fontSize?: string
        fontWeight?: string
        backgroundColor?: string
        color?: string
        cursor?: string
        boxShadow?: string
        borderRadius?: string
    }
}

const Container = ({ children, sx }: ContainerProps) => {
    const containerStyle = {
        width: sx?.width ?? '100%',
        height: sx?.height ?? 'auto',
        maxWidth: sx?.maxWidth ?? '420px', // Perfect card width limit for forms
        padding: sx?.padding ?? '2rem',   // Ensures children have breathing room inside
        fontSize: sx?.fontSize ?? '1rem',
        fontWeight: sx?.fontWeight ?? '400',
        backgroundColor: sx?.backgroundColor ?? '#ffffff',
        color: sx?.color ?? '#1f2937',
        cursor: sx?.cursor ?? 'default',
        boxShadow: sx?.boxShadow ?? '0 8px 24px rgba(0, 0, 0, 0.08)',
        borderRadius: sx?.borderRadius ?? '12px',
    }

    return (
        <div className="common-container" style={containerStyle}>
            {children}
        </div>
    )
}

export default Container;