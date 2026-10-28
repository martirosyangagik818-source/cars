import { Shield, Eye, Lock, Database, Cookie, Users, Bell, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal information you provide when creating an account (name, email address, phone number).',
        'Vehicle listing details including photos, descriptions, and pricing information.',
        'Transaction history and communication records between buyers and sellers.',
        'Device information, IP addresses, and browser data collected automatically when you visit our platform.',
        'Location data when you enable location services to find nearby vehicles.',
      ],
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'To facilitate vehicle transactions and connect buyers with sellers.',
        'To personalize your browsing experience and provide relevant vehicle recommendations.',
        'To communicate important updates about your account, listings, and transactions.',
        'To improve our platform, develop new features, and enhance user experience.',
        'To detect and prevent fraud, unauthorized access, and other security threats.',
      ],
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'We employ industry-standard encryption (SSL/TLS) for all data transmissions.',
        'Personal data is stored in secure, access-controlled environments with regular security audits.',
        'We implement multi-factor authentication and role-based access controls for internal systems.',
        'Regular penetration testing and vulnerability assessments are conducted by third-party security firms.',
        'In the event of a data breach, affected users will be notified within 72 hours as required by law.',
      ],
    },
    {
      icon: Cookie,
      title: 'Cookies & Tracking',
      content: [
        'Essential cookies are used to maintain your session and ensure core functionality.',
        'Analytics cookies help us understand how visitors interact with our platform.',
        'Marketing cookies may be used to deliver relevant advertisements across the web.',
        'You can manage cookie preferences through your browser settings at any time.',
        'We use local storage to save your wishlist and browsing preferences.',
      ],
    },
    {
      icon: Users,
      title: 'Third-Party Sharing',
      content: [
        'We do not sell your personal information to third parties.',
        'Data may be shared with payment processors to facilitate secure transactions.',
        'We may share anonymized, aggregated data with analytics partners to improve our services.',
        'Law enforcement requests will be honored when legally required and properly documented.',
        'Service providers who assist in platform operations are bound by strict confidentiality agreements.',
      ],
    },
    {
      icon: Bell,
      title: 'Your Rights & Choices',
      content: [
        'You have the right to access, correct, or delete your personal data at any time.',
        'You can opt out of marketing communications through your account settings.',
        'You may request a copy of all personal data we hold about you (data portability).',
        'You can withdraw consent for data processing where consent is the legal basis.',
        'California residents have additional rights under CCPA, including the right to know and the right to opt-out.',
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-3">Legal</p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white mb-6">
            Privacy
            <span className="gradient-text"> Policy</span>
          </h1>
          <p className="text-lg text-surface-200/50 leading-relaxed">
            Your privacy matters to us. This policy explains how AutoVault collects, uses, and protects your personal information when you use our platform.
          </p>
          <p className="text-sm text-surface-200/30 mt-4">
            Last updated: October 27, 2026
          </p>
        </div>

        {/* Overview Card */}
        <div className="glass rounded-2xl p-8 sm:p-10 mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <FileText className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white mb-3">Overview</h2>
              <p className="text-sm text-surface-200/50 leading-relaxed">
                AutoVault ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website and use our vehicle marketplace services. By using AutoVault, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6 mb-16">
          {sections.map((section, i) => (
            <div
              key={section.title}
              className="glass rounded-2xl p-8 sm:p-10 card-hover animate-fade-in-up"
              style={{ animationDelay: `${(i + 2) * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-white">{section.title}</h2>
                </div>
              </div>
              <ul className="space-y-3 ml-1">
                {section.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                    <span className="text-sm text-surface-200/50 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Children's Privacy */}
        <div className="glass rounded-2xl p-8 sm:p-10 mb-6 animate-fade-in-up">
          <h2 className="font-display text-xl font-bold text-white mb-4">Children's Privacy</h2>
          <p className="text-sm text-surface-200/50 leading-relaxed">
            AutoVault is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected personal data from a child under 18, we will take steps to delete that information as quickly as possible. If you believe a child has provided us with personal information, please contact us immediately.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="glass rounded-2xl p-8 sm:p-10 mb-12 animate-fade-in-up">
          <h2 className="font-display text-xl font-bold text-white mb-4">Changes to This Policy</h2>
          <p className="text-sm text-surface-200/50 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our platform and updating the "Last Updated" date. We encourage you to review this page periodically to stay informed about how we protect your information.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="glass rounded-2xl p-8 sm:p-12 text-center animate-fade-in-up">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">Questions About Your Privacy?</h2>
          <p className="text-surface-200/50 mb-6 max-w-lg mx-auto">
            If you have questions or concerns about this Privacy Policy or our data practices, don't hesitate to reach out.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white price-gradient hover:opacity-90 transition-all duration-300 glow-primary"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
