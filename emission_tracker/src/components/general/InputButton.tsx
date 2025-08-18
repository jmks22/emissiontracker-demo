import React from 'react';
import { IonInput, IonLabel, IonButton } from '@ionic/react';
import '../../theme/general.scss';

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel';

interface InputProps {
  label: string;
  linkText?: string;
  placeholder?: string;
  type?: InputType;
  onClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  linkText,
  placeholder = '',
  type = 'text',
  onClick,
}) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px',
        }}
      >
        <IonLabel>{label}</IonLabel>
        {linkText && (
          <span
            onClick={onClick}
            style={{
              fontSize: '14px',
              color: '#6e6e6e',
              textDecoration: 'underline',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            {linkText}
          </span>
        )}
      </div>

      <IonButton expand="block" fill="outline" color="medium">
        Change Password
      </IonButton>
    </div>
  );
};

export default Input;
