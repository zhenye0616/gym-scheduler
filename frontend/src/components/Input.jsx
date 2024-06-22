const Input = ({ label, ...props }) => {
  return (
    <div className="input-container">
      <span>{label}</span>
      <input {...props} />
    </div>
  );
};

export default Input;
