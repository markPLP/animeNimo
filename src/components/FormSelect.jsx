const formatLabel = (item) => {
  return item.replace(/_/g, ' '); // Replace underscores with spaces
};

const FormSelect = ({ label, name, list, defaultValue, size, optionLabel }) => {
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={name} className="label">
          <span className="label-text capitalize">{label}</span>
        </label>
      )}
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size}`}
        defaultValue={defaultValue}
      >
        <option value="">{optionLabel ? `${optionLabel} - All` : ''}</option>
        {list &&
          list.map((item) => {
            return (
              <option key={item} value={item}>
                {formatLabel(item)}
              </option>
            );
          })}
      </select>
    </div>
  );
};
export default FormSelect;
