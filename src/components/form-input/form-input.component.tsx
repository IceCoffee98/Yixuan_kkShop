import { InputHTMLAttributes, FC } from 'react';
import { FormInputLabel, Input, Group } from './form-input.styles';

type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherInfos }) => {
  return (
    <Group>
      <Input {...otherInfos} />
      {label && (
        <FormInputLabel
          shrink={Boolean(
            otherInfos.value && typeof otherInfos.value === 'string' && otherInfos.value.length
          )}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
