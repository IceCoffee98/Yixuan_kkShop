import './form-input.styles.scss';

const FormInput = ({ label, ...otherInfos }) => {
  return (
    <div className='group'>
      <input className='form-input' {...otherInfos} />
      {label && (
        <label className={`${otherInfos.value.length ? 'shrink' : ''} form-input-label`}>
          {/* <label className={`form-input-label`}> */}
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
