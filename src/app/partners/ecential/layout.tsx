import './ecential.css';
import { PasswordGate } from './PasswordGate';

export default function EcentialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ecential-landing">
      <PasswordGate>{children}</PasswordGate>
    </div>
  );
}
