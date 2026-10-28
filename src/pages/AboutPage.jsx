import { Shield, Users, Award, TrendingUp, MapPin, Mail } from 'lucide-react';

export default function AboutPage() {
  const team = [
    { name: 'Alex Rivera', role: 'Founder & CEO', initials: 'AR' },
    { name: 'Sarah Chen', role: 'Head of Operations', initials: 'SC' },
    { name: 'Marcus Johnson', role: 'Lead Engineer', initials: 'MJ' },
    { name: 'Emily Watson', role: 'Head of Design', initials: 'EW' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      desc: 'Every vehicle listing is verified. Every dealer is vetted. We believe in complete transparency in every transaction.',
    },
    {
      icon: Users,
      title: 'Community First',
      desc: 'Our marketplace is built on community trust. Buyer reviews, seller ratings, and open communication drive everything we do.',
    },
    {
      icon: Award,
      title: 'Quality Standards',
      desc: 'We maintain the highest quality standards in the industry. Only premium vehicles from verified sources make it to our platform.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      desc: 'AI-powered pricing, smart matching algorithms, and cutting-edge technology to give you the best car buying experience.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-3">About Us</p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white mb-6">
            Reimagining the Way You
            <span className="gradient-text"> Buy & Sell Cars</span>
          </h1>
          <p className="text-lg text-surface-200/50 leading-relaxed">
            AutoVault was founded with a simple mission: make buying and selling premium vehicles effortless, transparent, and enjoyable. We connect passionate car enthusiasts with verified dealers and private sellers nationwide.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {values.map((value, i) => (
            <div
              key={value.title}
              className="glass rounded-2xl p-8 card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-5">
                <value.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-sm text-surface-200/50 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-2">Our Team</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            The People Behind AutoVault
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {team.map((member, i) => (
            <div
              key={member.name}
              className="glass-light rounded-2xl p-6 text-center card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4 text-white font-display font-bold text-xl">
                {member.initials}
              </div>
              <h3 className="font-display font-bold text-white mb-1">{member.name}</h3>
              <p className="text-xs text-surface-200/40">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="glass rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">Get in Touch</h2>
          <p className="text-surface-200/50 mb-8 max-w-lg mx-auto">
            Have questions or want to learn more? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3 text-sm text-surface-200/60">
              <div className="w-10 h-10 rounded-xl bg-primary-600/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary-400" />
              </div>
              hello@autovault.com
            </div>
            <div className="flex items-center gap-3 text-sm text-surface-200/60">
              <div className="w-10 h-10 rounded-xl bg-primary-600/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-400" />
              </div>
              San Francisco, CA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
