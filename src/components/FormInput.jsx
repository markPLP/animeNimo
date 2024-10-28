const FormInput = ({
  label,
  name,
  type,
  defaultValue,
  size,
  placeholder,
  extendClass,
  onChange,
}) => {
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={name} className="label">
          <span className="label-text capitalize">{label}</span>
        </label>
      )}
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`input input-bordered ${extendClass} ${size}`}
        onChange={onChange} // Pass onChange to input
      />
    </div>
  );
};
export default FormInput;
