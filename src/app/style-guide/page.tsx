'use client';

import React, { useState } from 'react';

// Section wrapper component
function Section({
  id,
  title,
  description,
  children
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {description && <p className="text-gray-500 mt-1">{description}</p>}
      </div>
      {children}
    </section>
  );
}

// Color swatch with copy functionality
function ColorSwatch({
  name,
  variable,
  value,
  textColor = 'white'
}: {
  name: string;
  variable: string;
  value: string;
  textColor?: 'white' | 'dark';
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`var(${variable})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="group cursor-pointer"
      onClick={handleCopy}
    >
      <div
        className="h-20 rounded-lg shadow-md flex items-end p-3 transition-transform group-hover:scale-105"
        style={{ backgroundColor: value }}
      >
        <span className={`text-xs font-mono ${textColor === 'white' ? 'text-white/80' : 'text-gray-700'}`}>
          {copied ? 'Copied!' : value}
        </span>
      </div>
      <p className="font-medium text-gray-900 mt-2 text-sm">{name}</p>
      <p className="text-xs font-mono text-gray-500">{variable}</p>
    </div>
  );
}

// Typography sample
function TypeSample({
  name,
  variable,
  size,
  sample
}: {
  name: string;
  variable: string;
  size: string;
  sample?: string;
}) {
  return (
    <div className="flex items-baseline gap-6 py-4 border-b border-gray-100">
      <div className="w-24 flex-shrink-0">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs font-mono text-gray-500">{size}</p>
      </div>
      <p style={{ fontSize: size }} className="text-gray-800">
        {sample || 'The quick brown fox jumps over the lazy dog'}
      </p>
    </div>
  );
}

// Spacing sample
function SpacingSample({ name, size }: { name: string; size: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 text-right">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs font-mono text-gray-500">{size}</p>
      </div>
      <div
        className="bg-[var(--color-primary)] rounded"
        style={{ width: size, height: '24px' }}
      />
    </div>
  );
}

// Shadow sample
function ShadowSample({ name, variable, value }: { name: string; variable: string; value: string }) {
  return (
    <div className="text-center">
      <div
        className="w-24 h-24 bg-white rounded-lg mx-auto"
        style={{ boxShadow: value }}
      />
      <p className="font-medium text-gray-900 mt-3 text-sm">{name}</p>
      <p className="text-xs font-mono text-gray-500">{variable}</p>
    </div>
  );
}

// Radius sample
function RadiusSample({ name, variable, value }: { name: string; variable: string; value: string }) {
  return (
    <div className="text-center">
      <div
        className="w-20 h-20 bg-[var(--color-primary)] mx-auto"
        style={{ borderRadius: value }}
      />
      <p className="font-medium text-gray-900 mt-3 text-sm">{name}</p>
      <p className="text-xs font-mono text-gray-500">{value}</p>
    </div>
  );
}

// Navigation sidebar
function NavSidebar({ activeSection }: { activeSection: string }) {
  const sections = [
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'shadows', label: 'Shadows & Effects' },
    { id: 'radius', label: 'Border Radius' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'cards', label: 'Cards' },
    { id: 'forms', label: 'Form Elements' },
    { id: 'utilities', label: 'Utility Classes' },
  ];

  return (
    <nav className="space-y-1">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
            activeSection === section.id
              ? 'bg-[var(--color-primary)] text-white font-medium'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}

export default function StyleGuidePage() {
  const [activeSection, setActiveSection] = useState('colors');

  // Update active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['colors', 'typography', 'spacing', 'shadows', 'radius', 'buttons', 'cards', 'forms', 'utilities'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                Insero Style Guide
              </h1>
              <p className="text-sm text-gray-500">
                Design system documentation &amp; component reference
              </p>
            </div>
            <a
              href="/"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-48 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24">
              <NavSidebar activeSection={activeSection} />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-16">
            {/* Colors */}
            <Section id="colors" title="Colors" description="The color palette defines the visual identity of Insero">
              {/* Primary */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Primary</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  <ColorSwatch name="Primary" variable="--color-primary" value="#3498db" />
                  <ColorSwatch name="Primary Dark" variable="--color-primary-dark" value="#2980b9" />
                  <ColorSwatch name="Primary Light" variable="--color-primary-light" value="#5dade2" />
                  <ColorSwatch name="Primary 50" variable="--color-primary-50" value="#ebf5fb" textColor="dark" />
                  <ColorSwatch name="Primary 100" variable="--color-primary-100" value="#d6eaf8" textColor="dark" />
                  <ColorSwatch name="Primary 900" variable="--color-primary-900" value="#1a4971" />
                </div>
              </div>

              {/* Secondary */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Secondary</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <ColorSwatch name="Secondary" variable="--color-secondary" value="#2c3e50" />
                  <ColorSwatch name="Secondary Light" variable="--color-secondary-light" value="#34495e" />
                  <ColorSwatch name="Secondary Dark" variable="--color-secondary-dark" value="#1a252f" />
                </div>
              </div>

              {/* Accent */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Accent</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <ColorSwatch name="Accent (decorative only)" variable="--color-accent" value="#F97316" />
                  <ColorSwatch name="Accent Light" variable="--color-accent-light" value="#FFB02C" />
                  <ColorSwatch name="Accent CTA" variable="--color-accent-cta" value="#C95000" />
                  <ColorSwatch name="Accent CTA Hover" variable="--color-accent-cta-hover" value="#9A3412" />
                </div>
              </div>

              {/* Neutrals */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Neutrals</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  <ColorSwatch name="White" variable="--color-white" value="#ffffff" textColor="dark" />
                  <ColorSwatch name="Off White" variable="--color-off-white" value="#fafcfc" textColor="dark" />
                  <ColorSwatch name="Gray 50" variable="--color-gray-50" value="#f7f9fa" textColor="dark" />
                  <ColorSwatch name="Gray 100" variable="--color-gray-100" value="#eef2f4" textColor="dark" />
                  <ColorSwatch name="Gray 200" variable="--color-gray-200" value="#dde4e8" textColor="dark" />
                  <ColorSwatch name="Gray 300" variable="--color-gray-300" value="#b8c4cc" textColor="dark" />
                  <ColorSwatch name="Gray 400" variable="--color-gray-400" value="#8a9aa6" />
                  <ColorSwatch name="Gray 500" variable="--color-gray-500" value="#5f7282" />
                  <ColorSwatch name="Gray 600" variable="--color-gray-600" value="#455563" />
                  <ColorSwatch name="Gray 700" variable="--color-gray-700" value="#2d3b47" />
                  <ColorSwatch name="Gray 800" variable="--color-gray-800" value="#1a252e" />
                  <ColorSwatch name="Gray 900" variable="--color-gray-900" value="#0d1419" />
                </div>
              </div>

              {/* Service Colors */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Colors</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <ColorSwatch name="Voice" variable="--color-voice" value="#3b82f6" />
                  <ColorSwatch name="Internet" variable="--color-internet" value="#10b981" />
                  <ColorSwatch name="SD-WAN" variable="--color-sdwan" value="#8b5cf6" />
                  <ColorSwatch name="Security" variable="--color-security" value="#ef4444" />
                </div>
              </div>
            </Section>

            {/* Typography */}
            <Section id="typography" title="Typography" description="Font families, sizes, and text styles">
              {/* Font Families */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Font Families</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <p className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      Plus Jakarta Sans
                    </p>
                    <p className="text-sm text-gray-500 mb-4 font-mono">var(--font-display)</p>
                    <p className="text-gray-600" style={{ fontFamily: 'var(--font-display)' }}>
                      Used for headlines, navigation, and UI elements. Geometric and modern.
                    </p>
                    <div className="mt-4 flex gap-4 text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                      <span className="font-medium">Medium 500</span>
                      <span className="font-semibold">Semibold 600</span>
                      <span className="font-bold">Bold 700</span>
                      <span className="font-extrabold">ExtraBold 800</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <p className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                      Open Sans
                    </p>
                    <p className="text-sm text-gray-500 mb-4 font-mono">var(--font-body)</p>
                    <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                      Used for body text, paragraphs, and long-form content. Readable and professional.
                    </p>
                    <div className="mt-4 flex gap-4 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                      <span className="font-normal">Regular 400</span>
                      <span className="font-medium">Medium 500</span>
                      <span className="font-semibold">Semibold 600</span>
                      <span className="font-bold">Bold 700</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Type Scale */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Type Scale</h3>
                <div className="bg-white rounded-xl p-6 border border-gray-200 overflow-x-auto">
                  <TypeSample name="text-xs" variable="--text-xs" size="0.75rem" sample="Extra small text" />
                  <TypeSample name="text-sm" variable="--text-sm" size="0.875rem" sample="Small text for labels" />
                  <TypeSample name="text-base" variable="--text-base" size="1rem" sample="Base text size for body copy" />
                  <TypeSample name="text-lg" variable="--text-lg" size="1.125rem" sample="Large text for emphasis" />
                  <TypeSample name="text-xl" variable="--text-xl" size="1.25rem" sample="Extra large text" />
                  <TypeSample name="text-2xl" variable="--text-2xl" size="1.5rem" sample="Subheadings" />
                  <TypeSample name="text-3xl" variable="--text-3xl" size="1.875rem" sample="Section titles" />
                  <TypeSample name="text-4xl" variable="--text-4xl" size="2.25rem" sample="Page titles" />
                  <TypeSample name="text-5xl" variable="--text-5xl" size="3rem" sample="Hero text" />
                  <TypeSample name="text-6xl" variable="--text-6xl" size="3.75rem" sample="Display" />
                </div>
              </div>
            </Section>

            {/* Spacing */}
            <Section id="spacing" title="Spacing" description="Consistent spacing creates visual rhythm">
              <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
                <SpacingSample name="4px" size="0.25rem" />
                <SpacingSample name="8px" size="0.5rem" />
                <SpacingSample name="12px" size="0.75rem" />
                <SpacingSample name="16px" size="1rem" />
                <SpacingSample name="24px" size="1.5rem" />
                <SpacingSample name="32px" size="2rem" />
                <SpacingSample name="48px" size="3rem" />
                <SpacingSample name="64px" size="4rem" />
                <SpacingSample name="96px" size="6rem" />
                <SpacingSample name="128px" size="8rem" />
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Layout Variables</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">--container-max: 1280px</code>
                    <p className="text-blue-700 mt-1">Maximum content width</p>
                  </div>
                  <div>
                    <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">--container-padding: 1.5rem</code>
                    <p className="text-blue-700 mt-1">Horizontal container padding</p>
                  </div>
                  <div>
                    <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">--section-padding: 6rem</code>
                    <p className="text-blue-700 mt-1">Vertical section spacing</p>
                  </div>
                  <div>
                    <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">--section-padding-lg: 8rem</code>
                    <p className="text-blue-700 mt-1">Large section spacing</p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Shadows & Effects */}
            <Section id="shadows" title="Shadows & Effects" description="Elevation and glow effects">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Box Shadows</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 bg-gray-100 rounded-xl p-8">
                  <ShadowSample name="Small" variable="--shadow-sm" value="0 1px 2px rgba(15, 45, 61, 0.04)" />
                  <ShadowSample name="Medium" variable="--shadow-md" value="0 4px 12px rgba(15, 45, 61, 0.08)" />
                  <ShadowSample name="Large" variable="--shadow-lg" value="0 8px 24px rgba(15, 45, 61, 0.12)" />
                  <ShadowSample name="Extra Large" variable="--shadow-xl" value="0 16px 48px rgba(15, 45, 61, 0.16)" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Glow Effects</h3>
                <div className="grid grid-cols-2 gap-8 bg-[var(--color-secondary)] rounded-xl p-8">
                  <div className="text-center">
                    <div
                      className="w-24 h-24 bg-[var(--color-primary)] rounded-lg mx-auto"
                      style={{ boxShadow: '0 0 40px rgba(52, 152, 219, 0.3)' }}
                    />
                    <p className="font-medium text-white mt-3 text-sm">Primary Glow</p>
                    <p className="text-xs font-mono text-gray-400">--shadow-glow</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-24 h-24 bg-[var(--color-accent)] rounded-lg mx-auto"
                      style={{ boxShadow: '0 0 40px rgba(26, 188, 156, 0.3)' }}
                    />
                    <p className="font-medium text-white mt-3 text-sm">Accent Glow</p>
                    <p className="text-xs font-mono text-gray-400">--shadow-glow-accent</p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Border Radius */}
            <Section id="radius" title="Border Radius" description="Rounded corners for UI elements">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 bg-white rounded-xl p-8 border border-gray-200">
                <RadiusSample name="Small" variable="--radius-sm" value="0.375rem" />
                <RadiusSample name="Medium" variable="--radius-md" value="0.5rem" />
                <RadiusSample name="Large" variable="--radius-lg" value="0.75rem" />
                <RadiusSample name="XL" variable="--radius-xl" value="1rem" />
                <RadiusSample name="2XL" variable="--radius-2xl" value="1.5rem" />
                <RadiusSample name="Full" variable="--radius-full" value="9999px" />
              </div>
            </Section>

            {/* Buttons */}
            <Section id="buttons" title="Buttons" description="Interactive button styles">
              <div className="space-y-8">
                {/* Primary Buttons */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Primary Buttons</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <button className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold rounded-lg transition-colors">
                      Primary Button
                    </button>
                    <button className="px-5 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold rounded-lg transition-colors text-sm">
                      Medium
                    </button>
                    <button className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold rounded-lg transition-colors text-xs">
                      Small
                    </button>
                  </div>
                </div>

                {/* Accent Buttons */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Accent Buttons (CTAs)</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <button className="px-6 py-3 bg-[var(--color-accent-cta)] hover:bg-[var(--color-accent-cta-hover)] text-white font-semibold rounded-lg transition-colors">
                      Get Started
                    </button>
                    <button className="px-6 py-3 bg-[var(--color-accent-cta)] hover:bg-[var(--color-accent-cta-hover)] text-white font-semibold rounded-full transition-colors">
                      Rounded CTA
                    </button>
                  </div>
                </div>

                {/* Secondary Buttons */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Secondary Buttons</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <button className="px-6 py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-light)] text-white font-semibold rounded-lg transition-colors">
                      Secondary
                    </button>
                    <button className="px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-semibold rounded-lg transition-colors">
                      Outline Primary
                    </button>
                    <button className="px-6 py-3 border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white font-semibold rounded-lg transition-colors">
                      Outline Secondary
                    </button>
                  </div>
                </div>

                {/* Ghost & Link Buttons */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Ghost & Link Buttons</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <button className="px-6 py-3 text-[var(--color-primary)] hover:bg-[var(--color-primary-50)] font-semibold rounded-lg transition-colors">
                      Ghost Button
                    </button>
                    <button className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold inline-flex items-center gap-2 transition-colors">
                      Link Button
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Button States */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Button States</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <button className="px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg">
                      Default
                    </button>
                    <button className="px-6 py-3 bg-[var(--color-primary-dark)] text-white font-semibold rounded-lg">
                      Hover
                    </button>
                    <button className="px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg ring-4 ring-[var(--color-primary-100)]">
                      Focus
                    </button>
                    <button className="px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed" disabled>
                      Disabled
                    </button>
                  </div>
                </div>
              </div>
            </Section>

            {/* Cards */}
            <Section id="cards" title="Cards" description="Container components for content">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Basic Card */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h4 className="font-bold text-lg text-[var(--color-secondary)] mb-2">Basic Card</h4>
                  <p className="text-gray-600 text-sm">
                    A simple card with padding, shadow, and rounded corners.
                  </p>
                </div>

                {/* Card with Icon */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-[var(--color-primary-50)] rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg text-[var(--color-secondary)] mb-2">Feature Card</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Card with an icon for feature highlights.
                  </p>
                  <a href="#" className="text-[var(--color-accent-cta)] font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Learn more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                {/* Hover Lift Card */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                  <h4 className="font-bold text-lg text-[var(--color-secondary)] mb-2">Hover Lift</h4>
                  <p className="text-gray-600 text-sm">
                    Card with hover elevation effect. Uses the <code className="bg-gray-100 px-1 rounded text-xs">.hover-lift</code> class.
                  </p>
                </div>

                {/* Gradient Border Card */}
                <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] p-[2px] rounded-xl">
                  <div className="bg-white rounded-[10px] p-6 h-full">
                    <h4 className="font-bold text-lg text-[var(--color-secondary)] mb-2">Gradient Border</h4>
                    <p className="text-gray-600 text-sm">
                      Card with a gradient border effect using nested divs.
                    </p>
                  </div>
                </div>

                {/* Dark Card */}
                <div className="bg-[var(--color-secondary)] rounded-xl p-6">
                  <h4 className="font-bold text-lg text-white mb-2">Dark Card</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Card with dark background for contrast sections.
                  </p>
                  <button className="px-4 py-2 bg-[var(--color-accent-cta)] text-white font-semibold rounded-lg text-sm">
                    Action
                  </button>
                </div>

                {/* Stat Card */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
                  <p className="text-4xl font-bold text-[var(--color-primary)] mb-1">99.99%</p>
                  <p className="text-gray-600 text-sm">Uptime Guarantee</p>
                </div>
              </div>
            </Section>

            {/* Form Elements */}
            <Section id="forms" title="Form Elements" description="Input fields and form controls">
              <div className="bg-white rounded-xl p-8 border border-gray-200 space-y-6 max-w-xl">
                {/* Text Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Input
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Input
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all"
                  />
                </div>

                {/* Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all bg-white">
                    <option>Choose an option</option>
                    <option>Voice Services</option>
                    <option>Internet</option>
                    <option>SD-WAN</option>
                    <option>Security</option>
                  </select>
                </div>

                {/* Textarea */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Textarea
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter your message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all resize-none"
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="checkbox"
                    className="w-5 h-5 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)]"
                  />
                  <label htmlFor="checkbox" className="text-sm text-gray-700">
                    I agree to the terms and conditions
                  </label>
                </div>

                {/* Submit Button */}
                <button className="w-full px-6 py-3 bg-[var(--color-accent-cta)] hover:bg-[var(--color-accent-cta-hover)] text-white font-semibold rounded-lg transition-colors">
                  Submit Form
                </button>
              </div>
            </Section>

            {/* Utility Classes */}
            <Section id="utilities" title="Utility Classes" description="Custom CSS classes defined in globals.css">
              <div className="space-y-6">
                {/* Text Gradient */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Text Gradients</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-3xl font-bold text-gradient">Primary Gradient Text</p>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">.text-gradient</code>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gradient-warm">Accent Gradient Text</p>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">.text-gradient-warm</code>
                    </div>
                  </div>
                </div>

                {/* Background Classes */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Background Classes</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="bg-mesh h-32 rounded-lg border border-gray-200 flex items-center justify-center">
                        <span className="text-sm text-gray-600">Mesh Background</span>
                      </div>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 mt-2 inline-block">.bg-mesh</code>
                    </div>
                    <div>
                      <div className="hero-gradient h-32 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white">Hero Gradient</span>
                      </div>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 mt-2 inline-block">.hero-gradient</code>
                    </div>
                  </div>
                </div>

                {/* Animations */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Animations</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[var(--color-primary)] rounded-lg mx-auto animate-float" />
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 mt-3 inline-block">.animate-float</code>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[var(--color-primary)] rounded-lg mx-auto animate-pulse-glow" />
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 mt-3 inline-block">.animate-pulse-glow</code>
                    </div>
                  </div>
                </div>

                {/* Hover Effects */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Hover Effects</h3>
                  <div className="flex flex-wrap gap-6">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-white rounded-lg shadow-md hover-lift cursor-pointer flex items-center justify-center">
                        <span className="text-xs text-gray-500">Hover me</span>
                      </div>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 mt-3 inline-block">.hover-lift</code>
                    </div>
                    <div className="text-center">
                      <a href="#" className="animated-underline text-[var(--color-primary)] font-semibold">
                        Animated Underline
                      </a>
                      <br />
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 mt-3 inline-block">.animated-underline</code>
                    </div>
                  </div>
                </div>

                {/* Container */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Layout</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <code className="bg-gray-100 px-2 py-1 rounded text-gray-600">.container-custom</code>
                      <span className="text-gray-600">Max-width container with responsive padding</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <code className="bg-gray-100 px-2 py-1 rounded text-gray-600">.section-divider</code>
                      <span className="text-gray-600">Gradient horizontal divider line</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <code className="bg-gray-100 px-2 py-1 rounded text-gray-600">.text-balance</code>
                      <span className="text-gray-600">Balanced text wrapping for headlines</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <code className="bg-gray-100 px-2 py-1 rounded text-gray-600">.glow-primary</code>
                      <span className="text-gray-600">Primary color glow box-shadow</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <code className="bg-gray-100 px-2 py-1 rounded text-gray-600">.glow-accent</code>
                      <span className="text-gray-600">Accent color glow box-shadow</span>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[var(--color-secondary-dark)] text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            Insero Design System &bull; Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
