import React from 'react';
import Hero from '../components/Hero';

export default function Glow() {
  return (
    <div className="bg-church-warm">
      <Hero 
        title="GLOW" 
        subtitle="Growing Leaders, Opening Worlds"
        imageUrl="https://picsum.photos/seed/glow/1920/1080"
      />
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-serif text-church-blue mb-8">Coming Soon</h2>
        <p className="text-lg text-church-dark/70 leading-relaxed">
          We are currently updating our GLOW page to better serve our community. Please check back soon for more information about this ministry.
        </p>
      </section>
    </div>
  );
}
