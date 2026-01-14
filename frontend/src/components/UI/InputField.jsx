function InputField({ name, placeholder, value, onChange, className }) {

    return (
        <input name={name} placeholder={placeholder} value={value} onChange={onChange} className={className} />
    )
}

export default InputField