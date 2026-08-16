import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Building2, User, ShieldCheck } from 'lucide-react';

interface ModalJobTalentProps {
  isOpen: boolean;
  type: 'talent' | 'job' | 'veteran';
  onClose: () => void;
}

export const ModalJobTalent: React.FC<ModalJobTalentProps> = ({
  isOpen,
  type,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roleOrRequirement: '',
    location: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // auto close or reset
    }, 2000);
  };

  const titles = {
    talent: {
      title: 'Find Top U.S. Talent',
      subtitle: 'Tell us about your organizational staffing requirements.',
      icon: Building2,
      badge: 'EMPLOYER INQUIRY',
    },
    job: {
      title: 'Find Your Next Career Opportunity',
      subtitle: 'Connect your skills with top American employers.',
      icon: User,
      badge: 'CANDIDATE APPLICATION',
    },
    veteran: {
      title: 'Veteran Workforce Integration',
      subtitle: 'Transition your military leadership into high-impact civilian roles.',
      icon: ShieldCheck,
      badge: 'VETERAN OPPORTUNITIES',
    },
  };

  const current = titles[type];
  const Icon = current.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-lg w-full p-6 sm:p-8 border border-gray-200 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Request Received
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Our staffing specialists will reach out to you within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-gray-900 text-white text-xs font-semibold px-6 py-3 hover:bg-black"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold tracking-widest text-[#b91c1c] uppercase mb-2">
              <Icon className="w-4 h-4" />
              <span>{current.badge}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
              {current.title}
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {current.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  {type === 'talent'
                    ? 'Target Roles / Positions'
                    : 'Desired Industry or Skillset'}
                </label>
                <input
                  type="text"
                  value={formData.roleOrRequirement}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      roleOrRequirement: e.target.value,
                    })
                  }
                  placeholder={
                    type === 'talent'
                      ? 'e.g. Software Engineers, Project Managers...'
                      : 'e.g. Healthcare, IT, Logistics...'
                  }
                  className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-gray-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white text-sm font-semibold py-3.5 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <span>Submit Quick Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
