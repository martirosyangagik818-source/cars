import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, HelpCircle } from 'lucide-react';

function CustomSelect({ value, onChange, placeholder, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative" id="contact-subject">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm transition-all duration-300 border ${
          isOpen
            ? 'bg-white/[0.07] border-primary-500/50 shadow-lg shadow-primary-500/10'
            : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
        }`}
      >
        <span className={selected ? 'text-white' : 'text-surface-200/30'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-surface-200/40 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-primary-400' : ''
          }`}
        />
      </button>

      <div
        className={`absolute z-50 left-0 right-0 mt-2 rounded-xl border border-white/10 overflow-hidden transition-all duration-300 origin-top ${
          isOpen
            ? 'opacity-100 scale-y-100 translate-y-0'
            : 'opacity-0 scale-y-95 -translate-y-1 pointer-events-none'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(30,30,45,0.98) 0%, rgba(20,20,35,0.98) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.08)',
        }}
      >
        <div className="py-1.5 max-h-64 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 flex items-center gap-3 group ${
                value === option.value
                  ? 'text-white bg-primary-500/15'
                  : 'text-surface-200/60 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                  value === option.value
                    ? 'bg-gradient-to-r from-primary-400 to-accent-400 scale-100 shadow-lg shadow-primary-500/40'
                    : 'bg-white/10 scale-75 group-hover:scale-100 group-hover:bg-white/30'
                }`}
              />
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email Us',
      value: 'hello@autovault.com',
      desc: 'We reply within 24 hours',
    },
    {
      icon: Phone,
      label: 'Call Us',
      value: '+1 (555) 123-4567',
      desc: 'Mon–Fri, 9am–6pm PST',
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value: '123 Market Street',
      desc: 'San Francisco, CA 94105',
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon – Fri: 9am – 6pm',
      desc: 'Sat: 10am – 4pm PST',
    },
  ];

  const faqs = [
    {
      question: 'How do I list my vehicle for sale?',
      answer:
        'Navigate to the "Sell Your Car" page, fill out the vehicle details form with accurate information, upload high-quality photos, and submit your listing. Our team will review and approve it within 24 hours.',
    },
    {
      question: 'Is there a fee for using AutoVault?',
      answer:
        'Browsing and searching vehicles is completely free. Sellers may choose optional premium listing upgrades for increased visibility. There are no hidden fees or commissions on transactions.',
    },
    {
      question: 'How are vehicles verified?',
      answer:
        'Every listing goes through our multi-step verification process including VIN checks, ownership verification, and photo authentication. Certified dealers undergo additional vetting.',
    },
    {
      question: 'Can I save vehicles to view later?',
      answer:
        'Yes! Use the heart icon on any listing to add it to your Wishlist. Your saved vehicles are stored locally and accessible anytime from the Wishlist page in the navigation bar.',
    },
    {
      question: 'What if I have issues with a transaction?',
      answer:
        'Contact our support team immediately. We offer buyer protection and mediation services to resolve disputes. You can reach us through this contact form, email, or phone.',
    },
  ];

  const inputClasses =
    'w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-surface-200/30 text-sm focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all duration-300';

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-3">Get in Touch</p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white mb-6">
            Contact
            <span className="gradient-text"> Us</span>
          </h1>
          <p className="text-lg text-surface-200/50 leading-relaxed">
            Have a question, feedback, or need help? We'd love to hear from you. Our team is ready to assist with anything you need.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, i) => (
            <div
              key={info.label}
              className="glass-light rounded-2xl p-6 text-center card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-bold text-white mb-1">{info.label}</h3>
              <p className="text-sm text-primary-400 font-medium mb-1">{info.value}</p>
              <p className="text-xs text-surface-200/40">{info.desc}</p>
            </div>
          ))}
        </div>

        {/* Form + Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-20">
          {/* Contact Form */}
          <div className="lg:col-span-3 glass rounded-2xl p-8 sm:p-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h2 className="font-display text-2xl font-bold text-white mb-2">Send Us a Message</h2>
            <p className="text-sm text-surface-200/40 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

            {isSubmitted ? (
              <div className="text-center py-16 animate-fade-in-up">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-surface-200/50 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-white glass-light hover:bg-white/10 transition-all duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-surface-200/60 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-surface-200/60 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className={inputClasses}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-surface-200/60 mb-2">
                    Subject
                  </label>
                  <CustomSelect
                    value={formData.subject}
                    onChange={(val) => setFormData((prev) => ({ ...prev, subject: val }))}
                    placeholder="Select a subject"
                    options={[
                      { value: 'general', label: 'General Inquiry' },
                      { value: 'buying', label: 'Buying a Vehicle' },
                      { value: 'selling', label: 'Selling a Vehicle' },
                      { value: 'account', label: 'Account Support' },
                      { value: 'technical', label: 'Technical Issue' },
                      { value: 'partnership', label: 'Partnership Opportunity' },
                      { value: 'other', label: 'Other' },
                    ]}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-surface-200/60 mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    required
                    className={`${inputClasses} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white price-gradient hover:opacity-90 transition-all duration-300 glow-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <div className="glass rounded-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="relative h-64 bg-gradient-to-br from-surface-800 to-surface-900 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }} />
                </div>
                <div className="text-center relative z-10">
                  <MapPin className="w-8 h-8 text-primary-400 mx-auto mb-2 animate-bounce" />
                  <p className="text-sm font-medium text-white">123 Market Street</p>
                  <p className="text-xs text-surface-200/50">San Francisco, CA 94105</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-white text-sm mb-1">AutoVault Headquarters</h3>
                <p className="text-xs text-surface-200/40">
                  Located in the heart of San Francisco's Financial District. Walk-ins welcome during business hours.
                </p>
              </div>
            </div>

            {/* Response Time */}
            <div className="glass-light rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-white">We're Online</span>
              </div>
              <p className="text-xs text-surface-200/40 leading-relaxed">
                Our average response time is under 4 hours during business hours. For urgent matters, please call us directly.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6 text-primary-400" />
            </div>
            <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-2">FAQ</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 card-hover animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <h3 className="font-display font-bold text-white mb-3 text-sm">{faq.question}</h3>
                <p className="text-xs text-surface-200/50 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
