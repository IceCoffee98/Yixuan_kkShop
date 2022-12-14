import { FormInputLabel, Input, Group } from './form-input.styles';

const FormInput = ({ label, ...otherInfos }) => {
  return (
    <Group>
      <Input {...otherInfos} />
      {label && (
        <FormInputLabel shrink={otherInfos.value.length}>
          {/* <label className={`form-input-label`}> */}
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
