import React from 'react';
import { motion } from 'motion/react';
import { Flame, Users, Leaf, Briefcase } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-bk-red text-bk-cream py-24 px-4 md:px-8 text-center">
        <h1 className="font-display text-7xl md:text-9xl uppercase mb-6">Our Story</h1>
        <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80">
          Flame-grilled since 1954. A legacy of flavor, quality, and having it your way.
        </p>
      </div>

      {/* Timeline */}
      <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="space-y-24">
          {[
            { year: '1954', title: 'The Beginning', desc: 'James McLamore and David Edgerton open the first Burger King in Miami, Florida.', icon: Flame },
            { year: '1957', title: 'The Whopper is Born', desc: 'The iconic Whopper sandwich is introduced, becoming an instant classic.', icon: Crown },
            { year: 'Today', title: 'Global Presence', desc: 'With over 18,000 locations worldwide, we continue to serve flame-grilled goodness.', icon: Globe },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2">
                <div className="aspect-video bg-bk-cream rounded-[2rem] overflow-hidden shadow-lg border border-bk-charcoal/5">
                  <img 
                    src={`https://picsum.photos/seed/bk-history-${i}/800/600`} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <span className="font-display text-4xl text-bk-red">{item.year}</span>
                <h3 className="font-display text-3xl uppercase">{item.title}</h3>
                <p className="text-bk-charcoal/60 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-bk-cream py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-bk-red text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users size={32} />
            </div>
            <h4 className="font-display text-2xl uppercase">Real People</h4>
            <p className="text-sm text-bk-charcoal/60">We celebrate our diverse team and the communities we serve every day.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-bk-gold text-bk-charcoal rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Leaf size={32} />
            </div>
            <h4 className="font-display text-2xl uppercase">Sustainability</h4>
            <p className="text-sm text-bk-charcoal/60">Committed to responsible sourcing and reducing our environmental footprint.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-bk-charcoal text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Briefcase size={32} />
            </div>
            <h4 className="font-display text-2xl uppercase">Careers</h4>
            <p className="text-sm text-bk-charcoal/60">Join the flame-grilled family and grow your career with us.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const Crown = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
    <path d="M5 20h14" />
  </svg>
);

const Globe = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default About;
