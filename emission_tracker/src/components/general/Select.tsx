import React from 'react';
import { IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import '../../theme/general.scss';
import './Input.css';

interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  options: string[];
  disabled?: boolean;
  header?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
  options,
  disabled,
  header,
}) => {
  return (
    <div>
      {label && (
        <div className="wrapper">
          <IonLabel>{label}</IonLabel>
        </div>
      )}

      <IonSelect
        fill="outline"
        placeholder={placeholder}
        className="input"
        value={value}
        onIonChange={onChange}
        disabled={disabled}
        interface="popover"
        interfaceOptions={{
          header: header || label
        }}
      >
        {options.map((option) => (
          <IonSelectOption key={option} value={option}>
            {option}
          </IonSelectOption>
        ))}
      </IonSelect>
    </div>
  );
};

export default Select;