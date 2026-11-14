import './Button.css'

interface ButtonProps {
    label: string
    onClick: () => void
    type?: 'button' | 'submit' | 'reset'
    notification?: number
    sx?: {
        width?: string
        height?: string
        color?: string
        fontWeight?: string
        fontSize?: string
        backgroundColor?: string
        cursor?: string
        boxShadow?: string
        borderRadius?: string
    }
}

const Button = ({ label, onClick, type = "submit", notification, sx } : ButtonProps) => {
    
    // Define default styles, falling back to sx values if provided
    const buttonStyle = {
        width: sx?.width ?? 'fit-content', // 👈 Changed from '5rem' to '100%'
        height: sx?.height ?? '2.5rem',
        fontSize: sx?.fontSize ?? '1rem',
        fontWeight: sx?.fontWeight ?? '500',
        backgroundColor: sx?.backgroundColor ?? '#2563eb',
        color: sx?.color ?? '#ffffff',
        cursor: sx?.cursor ?? 'pointer',
        boxShadow: sx?.boxShadow ?? '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: sx?.borderRadius ?? '6px',
    };

    return (
        <div className="btn-container">
            <div className="btn-wrapper">
                <div className="btn-content">
                    <button 
                        className="btn"
                        type={type} 
                        onClick={onClick}
                        style={buttonStyle} // 👈 Applied inline style with defaults & overrides
                    >
                        {label}
                    </button>
                </div>
                {notification != undefined ? (
                    <div className="btn-info">
                        <p>{notification}</p>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Button