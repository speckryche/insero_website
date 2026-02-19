import './ecential.css';

export default function EcentialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="ecential-landing">{children}</div>;
}
