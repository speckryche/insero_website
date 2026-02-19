'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const CORRECT_PASSWORD = 'Ecential2026';
const STORAGE_KEY = 'ec-access';

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(STORAGE_KEY) === 'granted') {
      setAuthorized(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'granted');
      setAuthorized(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // Prevent flash of content before hydration
  if (!mounted) {
    return null;
  }

  if (authorized) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--ec-off-white)] px-4">
      <div className="w-full max-w-sm text-center">
        <Image
          src="/ecential_logo.jpg"
          alt="Ecential"
          width={180}
          height={40}
          className="h-12 w-auto mx-auto mb-8"
        />
        <h1 className="text-2xl font-bold text-[var(--ec-navy)] mb-2">
          This page is password protected
        </h1>
        <p className="text-[var(--ec-gray-400)] mb-8">
          Enter the password to view this page.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Enter password"
            className={`ec-input text-center ${error ? 'error' : ''}`}
            autoFocus
          />
          {error && (
            <p className="text-sm text-[var(--ec-error)]">Incorrect password. Please try again.</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-[var(--ec-blue)] text-white font-semibold text-base rounded-xl hover:bg-[var(--ec-blue-dark)] transition-colors"
          >
            Access Page
          </button>
        </form>
      </div>
    </div>
  );
}
