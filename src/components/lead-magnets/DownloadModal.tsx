'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, DownloadSimple } from '@phosphor-icons/react';
import { submitLeadMagnetDownload } from '@/app/api/lead-magnets/download/actions';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  guideSlug: string;
  guideTitle: string;
  guideDescription: string;
}

export function DownloadModal({ isOpen, onClose, guideSlug, guideTitle, guideDescription }: DownloadModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) { setError('Please agree to receive the guide.'); return; }
    setError(null);
    setSubmitting(true);

    const result = await submitLeadMagnetDownload({
      firstName,
      lastName,
      company,
      email,
      phone: phone || undefined,
      guideSlug,
      sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    });

    setSubmitting(false);
    if (result.success) {
      setSuccess(true);
      setDownloadUrl(result.downloadUrl || null);
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after close animation
    setTimeout(() => {
      setSuccess(false);
      setDownloadUrl(null);
      setError(null);
      setFirstName('');
      setLastName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setConsent(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button onClick={handleClose} className="absolute top-4 right-4 p-1 text-[#94a3b8] hover:text-[#1e293b] transition-colors">
              <X weight="bold" className="w-5 h-5" />
            </button>

            <div className="p-6 lg:p-8">
              {success ? (
                /* Success state */
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-[#E6F5EC] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle weight="fill" className="w-8 h-8 text-[#008838]" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#1e293b] mb-2">Check your email!</h3>
                  <p className="text-sm text-[#64748b] mb-6">
                    We&apos;ve sent <strong>{guideTitle}</strong> to <strong>{email}</strong>. It may take a minute.
                  </p>
                  {downloadUrl && (
                    <a
                      href={downloadUrl}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#008838] text-white font-semibold rounded-xl hover:bg-[#005C28] transition-colors"
                    >
                      <DownloadSimple weight="bold" className="w-5 h-5" />
                      Download Now
                    </a>
                  )}
                  <p className="text-xs text-[#94a3b8] mt-4">Or download from the link in your email within 7 days.</p>
                </div>
              ) : (
                /* Form */
                <>
                  <h3 className="font-display font-bold text-xl text-[#1e293b] mb-1">{guideTitle}</h3>
                  <p className="text-sm text-[#64748b] mb-6">{guideDescription}</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1e293b] mb-1">First Name *</label>
                        <input
                          type="text" required value={firstName} onChange={e => setFirstName(e.target.value)}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-[#008838] focus:outline-none"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1e293b] mb-1">Last Name *</label>
                        <input
                          type="text" required value={lastName} onChange={e => setLastName(e.target.value)}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-[#008838] focus:outline-none"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1e293b] mb-1">Company *</label>
                      <input
                        type="text" required value={company} onChange={e => setCompany(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-[#008838] focus:outline-none"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1e293b] mb-1">Email *</label>
                      <input
                        type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-[#008838] focus:outline-none"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1e293b] mb-1">Phone <span className="text-[#94a3b8] font-normal">(optional)</span></label>
                      <input
                        type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-[#008838] focus:outline-none"
                        placeholder="(123) 456-7890"
                      />
                    </div>

                    <label className="flex items-start gap-3 p-3 bg-[#f8fafb] rounded-xl cursor-pointer">
                      <input
                        type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)}
                        className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#008838] focus:ring-[#008838] cursor-pointer"
                      />
                      <span className="text-xs text-[#64748b] leading-relaxed">
                        I agree to receive this guide and occasional related emails from Insero. Unsubscribe anytime.
                      </span>
                    </label>

                    {error && (
                      <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#008838] text-white font-semibold rounded-xl hover:bg-[#005C28] transition-colors disabled:opacity-50"
                    >
                      {submitting ? 'Sending...' : (
                        <>
                          <span>Get the Playbook</span>
                          <ArrowRight weight="bold" className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
