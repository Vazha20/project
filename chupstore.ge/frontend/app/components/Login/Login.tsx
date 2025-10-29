'use client';

import { useState, useCallback } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css'; // შექმენი შესაბამისი CSS

interface Props { onClose: () => void; }

export default function Login({ onClose }: Props) {
  const router = useRouter();
  const { login, register } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isRegister) {
        await register(username, email, password, confirmPassword);
        setSuccess('რეგისტრაცია წარმატებით დასრულდა!');
        setIsRegister(false);
      } else {
        await login(email, password);
        setSuccess('შესვლა წარმატებით შესრულდა!');
        onClose();
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'მოხდა შეცდომა, სცადე თავიდან.');
    }
  }, [isRegister, username, email, password, confirmPassword]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{isRegister ? 'რეგისტრაცია' : 'შესვლა'}</h2>
          <CloseOutlined onClick={onClose} className={styles.closeIcon} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {isRegister && (
            <input
              type="text"
              placeholder="მომხმარებლის სახელი"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          )}
          <input
            type="email"
            placeholder="ელ. ფოსტა"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="პაროლი"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          {isRegister && (
            <input
              type="password"
              placeholder="გაიმეორეთ პაროლი"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
            />
          )}

          <button type="submit">{isRegister ? 'რეგისტრაცია' : 'შესვლა'}</button>

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <p className={styles.switchText}>
            {isRegister ? 'უკვე გაქვს ანგარიში?' : 'არ გაქვს ანგარიში?'}{' '}
            <span onClick={() => setIsRegister(!isRegister)} style={{ cursor: 'pointer' }}>
              {isRegister ? 'შესვლა' : 'დარეგისტრირდი'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
