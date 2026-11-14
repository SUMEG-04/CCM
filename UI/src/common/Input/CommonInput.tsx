import './CommonInput.css';

interface InputProps {
    label : string
    value : string
    type? : string
    name : string
    placeholder? : string
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void
    sx? : {
        width? : string
        height? : string
        fontSize? : string
        fontWeight? : string
        backgroundColor? : string
        color? : string
        cursor? : string
        boxShadow? : string
        borderRadius? : string
    }
}

const CommonInput = ({label, value, onChange, type, placeholder, name, sx} : InputProps) => {
    const inputStyle = {
        width: sx?.width ?? '15rem',
        height: sx?.height ?? '2.5rem',
        fontSize: sx?.fontSize ?? '1rem',
        fontWeight: sx?.fontWeight ?? '500',
        backgroundColor: sx?.backgroundColor ?? '#ffffff',
        color: sx?.color ?? '#000000',
        cursor: sx?.cursor ?? 'pointer',
        boxShadow: sx?.boxShadow ?? '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: sx?.borderRadius ?? '6px',
    }
    return (
        <div className="input-container">
            <div className="input-wrapper">
                <div className="label-section">
                    <label htmlFor="input-label" className="input-label">{label}</label>
                </div>
                <div className="input-section">
                    <input
                        className='input'
                        type={type}
                        value={value}
                        onChange={onChange}
                        style={inputStyle}
                        placeholder={placeholder}
                        name={name}
                    />
                </div>
            </div>
        </div>
    )
}

export default CommonInput;