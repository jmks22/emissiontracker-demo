import React from 'react';
import { IonInput, IonLabel } from '@ionic/react';
import '../../theme/general.scss';
import './Input.css';

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date';

interface InputProps {
  label?: string;
  linkText?: string;
  placeholder?: string;
  type?: InputType;
  onClick?: () => void;
  value?: string | number | null;
  onChange?: (e: any) => void;
  readonly?: boolean;
  disabled?: boolean;
  minValue?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  linkText,
  placeholder = '',
  type = 'text',
  onClick,
  value,
  onChange,
  readonly,
  disabled,
  minValue,
}) => {
  return (
    <div>
      {label && (
        <div className="wrapper">
          <IonLabel>{label}</IonLabel>
          {linkText && (
            <span
              onClick={onClick}
              className="link"
            >
              {linkText}
            </span>
          )}
        </div>
      )}

      <IonInput
        fill="outline"
        type={type}
        placeholder={placeholder}
        className="input"
        value={value}
        onIonChange={onChange}
        readonly={readonly}
        disabled={disabled}
        min={minValue}
      />
    </div>
  );
};

export default Input;
