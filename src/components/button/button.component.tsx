import { ButtonHTMLAttributes, FC } from 'react';
import { BaseButton, GoogleSignInButton, InvertedButton, ButtonSpinner } from './button.styles';

/*
default

inverted

google sign in
=> create a variables to diffierenciate them
*/

export enum BUTTON_TYPE_CLASSES {
  base = 'base',
  google = 'sign-in-with-google',
  inverted = 'inverted',
}

const getSelectedButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
  const SelectedButton = getSelectedButton(buttonType);
  return (
    <SelectedButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </SelectedButton>
  );
};

export default Button;
