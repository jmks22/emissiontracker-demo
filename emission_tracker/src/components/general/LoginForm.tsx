import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonLabel
} from '@ionic/react';
import Input from './Input';
import ForgotPasswordForm from './ForgotPasswordForm';
import '../../theme/general.scss';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState('');

  const mapUserTypeToRoute = (userType: string) => {
    const t = userType?.toLowerCase?.();
    if (!t) return '/home';
    if (t.includes('admin')) return '/admin/dashboard';
    if (t.includes('manager')) return '/manager/dashboard';
    if (t.includes('driver')) return '/driver/dashboard';
    if (t.includes('customer')) return '/customer/dashboard';
    return '/home';
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        
        const route = mapUserTypeToRoute(data.user.user_type);
        window.location.href = route;
      } else {
        setError('Incorrect email or password. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Login</IonCardTitle>
        </IonCardHeader>

        <IonCardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <IonLabel>Email</IonLabel>
            <Input
              type="text"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.detail.value!)}
            />
          </div>

          <div>
            <IonLabel>Password</IonLabel>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.detail.value!)}
            />
            <p style={{ textAlign: 'right', marginTop: '4px' }}>
              <a
                style={{ fontSize: '14px', color: '#6e6e6e', cursor: 'pointer' }}
                onClick={() => setShowForgotPassword(true)}
              >
                Forgotten Password?
              </a>
            </p>
          </div>

          <IonButton expand="block" onClick={handleLogin}>
            Login
          </IonButton>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <div style={{ textAlign: 'center' }}>
            Don't have an account?{' '}
            <a href="/signup" style={{ color: '#6e6e6e' }}>
              Sign Up
            </a>
          </div>
        </IonCardContent>
      </IonCard>

      <ForgotPasswordForm
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
};

export default LoginForm;
