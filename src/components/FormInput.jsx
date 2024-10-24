const FormInput = ({
  label,
  name,
  type,
  defaultValue,
  size,
  placeholder,
  extendClass,
}) => {
  return (
    <div className='form-control'>
      {label && (
        <label htmlFor={name} className='label'>
          <span className='label-text capitalize'>{label}</span>
        </label>
      )}
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`input input-bordered ${extendClass} ${size}`}
      />
    </div>
  )
}
export default FormInput
