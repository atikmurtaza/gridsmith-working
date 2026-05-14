import React, { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Overlay() {
  const containerRef = useRef();
  const portCarouselRef = useRef();
  const testCarouselRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-section').forEach(section => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 50%",
              scrub: 1
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Carousel logic
  const scrollCarousel = (ref, dir) => {
    if (!ref.current) return;
    const carousel = ref.current;
    const itemWidth = carousel.firstElementChild?.offsetWidth || 300;
    if (dir === 'next') {
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: itemWidth + 30, behavior: 'smooth' });
      }
    } else {
      if (carousel.scrollLeft <= 0) {
        carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: -(itemWidth + 30), behavior: 'smooth' });
      }
    }
  };

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('contact.gridsmith@gmail.com').then(() => {
      const el = document.getElementById('emailCopyText');
      if(el) {
        const orig = el.innerText;
        el.innerText = 'Copied!';
        el.style.color = 'var(--color-gold)';
        setTimeout(() => {
          el.innerText = orig;
          el.style.color = '';
        }, 2000);
      }
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const orig = btn.innerText;
    btn.innerText = 'Sending...';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerText = 'Message Sent!';
      btn.style.background = '#f5f5f5';
      btn.style.color = '#0a0a0a';
      btn.style.opacity = '1';
      setTimeout(() => {
        e.target.reset();
        btn.innerText = orig;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  };

  return (
    <div id="main-scroll-container" ref={containerRef} className="relative w-full text-text-main z-10">
      {/* Navigation */}
      <nav className="fixed w-full flex justify-between items-center px-8 py-4 z-50 backdrop-blur-md bg-black/30 border-b border-glass-border">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <img src="/assets/logo.png" alt="Logo" className="h-8" />
          <span className="font-bold text-xl tracking-wider uppercase text-gradient">Gridsmith Ltd</span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a href="#services" className="text-text-muted hover:text-gold transition-colors font-medium">Services</a>
          <a href="#portfolio" className="text-text-muted hover:text-gold transition-colors font-medium">Portfolio</a>
          <a href="#testimonials" className="text-text-muted hover:text-gold transition-colors font-medium">Testimonials</a>
          <a href="#contact" className="btn btn-primary px-6 py-2 text-sm !rounded-full">Start Project</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient uppercase tracking-tight max-w-4xl drop-shadow-lg">
          Architects of the <br /> Digital Frontier
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mb-10 drop-shadow-md">
          Premium web development, 3D modeling, and brand identity for forward-thinking businesses and creators.
        </p>
        <div className="flex gap-4">
          <a href="#portfolio" className="btn btn-primary">View Our Work</a>
          <a href="#services" className="btn btn-secondary">Our Services</a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="min-h-screen flex flex-col justify-center px-8 py-20 reveal-section">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Our Expertise</h2>
          <p className="text-text-muted mb-12 max-w-xl">We blend technical precision with creative vision across three core disciplines.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-gold text-4xl mb-6">01</div>
              <h3 className="text-2xl font-bold mb-4">Web Development</h3>
              <p className="text-text-muted mb-6">High-performance React, Next.js, and headless E-Commerce platforms built for conversion and speed.</p>
              <ul className="text-sm space-y-2 text-text-muted border-t border-glass-border pt-4">
                <li>• Corporate Websites</li>
                <li>• E-Commerce Solutions</li>
                <li>• Web Applications</li>
              </ul>
            </div>
            <div className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-gold text-4xl mb-6">02</div>
              <h3 className="text-2xl font-bold mb-4">3D & Architecture</h3>
              <p className="text-text-muted mb-6">Photorealistic architectural visualizations, product modeling, and immersive web experiences.</p>
              <ul className="text-sm space-y-2 text-text-muted border-t border-glass-border pt-4">
                <li>• Architectural Renders</li>
                <li>• Product Visualization</li>
                <li>• WebGL Experiences</li>
              </ul>
            </div>
            <div className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-gold text-4xl mb-6">03</div>
              <h3 className="text-2xl font-bold mb-4">Brand Identity</h3>
              <p className="text-text-muted mb-6">Complete visual ecosystems, specifically tailored for esports teams, streamers, and tech startups.</p>
              <ul className="text-sm space-y-2 text-text-muted border-t border-glass-border pt-4">
                <li>• Stream Overlays & Assets</li>
                <li>• Logo & Typography</li>
                <li>• Brand Guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-8 reveal-section">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Selected Works</h2>
            <p className="text-text-muted max-w-xl">A showcase of our most impactful projects across web, 3D, and branding.</p>
          </div>

          <div className="relative flex items-center w-full">
            <button onClick={() => scrollCarousel(portCarouselRef, 'prev')} className="absolute -left-6 z-20 w-12 h-12 rounded-full bg-black/50 border border-glass-border backdrop-blur flex items-center justify-center hover:bg-gold/20 hover:text-gold transition text-xl cursor-pointer" aria-label="Previous Project">&#10094;</button>
            
            <div ref={portCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory gap-8 py-5 w-full no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              
              {[
                {img: 'portfolio2.png', tag: 'Web Development', title: 'Corporate SaaS Platform', desc: 'Sleek dark-mode enterprise website.'},
                {img: 'portfolio3.png', tag: '3D Architecture', title: 'Modern Villa Concept', desc: 'Photorealistic exterior visualization at dusk.'},
                {img: 'portfolio4.png', tag: '3D Modeling', title: 'Tech Hardware Prototype', desc: 'High-tech digital product floating concept.'},
                {img: 'portfolio1.png', tag: 'Graphics Design', title: 'E-Sports Team Logo', desc: 'Aggressive and dynamic mascot logo design.'},
                {img: 'portfolio2.png', tag: 'Web Development', title: 'E-Commerce Storefront', desc: 'High-conversion fashion retailer platform.'},
              ].map((item, i) => (
                <div key={i} className="flex-none w-full md:w-[calc(33.333%-21px)] snap-start relative group overflow-hidden rounded-xl glass-card">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={`/assets/${item.img}`} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-gold font-bold text-xs uppercase tracking-wider mb-2">{item.tag}</span>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}

            </div>

            <button onClick={() => scrollCarousel(portCarouselRef, 'next')} className="absolute -right-6 z-20 w-12 h-12 rounded-full bg-black/50 border border-glass-border backdrop-blur flex items-center justify-center hover:bg-gold/20 hover:text-gold transition text-xl cursor-pointer" aria-label="Next Project">&#10095;</button>
          </div>
        </div>
      </section>

      {/* Explosion Scroll Area */}
      <section className="h-[150vh] flex items-center justify-center pointer-events-none relative">
        <p className="text-text-muted text-xl opacity-50 tracking-widest uppercase sticky top-1/2 -translate-y-1/2 drop-shadow-md">Keep Scrolling</p>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-8 reveal-section">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Client Feedback</h2>
            <p className="text-text-muted max-w-xl">Hear what our partners and clients have to say about working with Gridsmith Ltd.</p>
          </div>

          <div className="relative flex items-center w-full">
            <button onClick={() => scrollCarousel(testCarouselRef, 'prev')} className="absolute -left-6 z-20 w-12 h-12 rounded-full bg-black/50 border border-glass-border backdrop-blur flex items-center justify-center hover:bg-gold/20 hover:text-gold transition text-xl cursor-pointer" aria-label="Previous Testimonial">&#10094;</button>
            
            <div ref={testCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory gap-8 py-5 w-full no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              
              {[
                {quote: "Gridsmith absolutely transformed our brand identity and web presence. Their attention to detail and ability to blend sleek aesthetics with high performance is unmatched.", author: "James Davies", role: "CEO, TechNova", init: "JD", bg: "bg-bg-dark"},
                {quote: "The stream overlays and emotes they designed for my channel took my content to the next level. I've never felt more professional as a creator. Highly recommended!", author: "Sarah Lin", role: "Twitch Partner", init: "SL", bg: "bg-bronze"},
                {quote: "Their 3D architectural renders were breathtaking. They brought our conceptual blueprints to life with photorealistic lighting that helped us win a major client pitch.", author: "Michael Rowe", role: "Lead Architect, ARC Studio", init: "MR", bg: "bg-umber"},
                {quote: "The bespoke E-Commerce platform they built for us increased our conversion rate by 40%. Beautiful design meets flawless functionality.", author: "Elena Katz", role: "Founder, Vora Fashion", init: "EK", bg: "bg-sand"},
              ].map((item, i) => (
                <div key={i} className="flex-none w-full md:w-[calc(33.333%-21px)] snap-start glass-card p-8 flex flex-col relative">
                  <div className="text-6xl text-glass-border absolute top-2 right-6 font-serif leading-none">"</div>
                  <div className="text-gold tracking-widest mb-4">★★★★★</div>
                  <p className="text-lg italic mb-8 flex-grow">"{item.quote}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-glass-border">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${item.bg === 'bg-bg-dark' ? 'bg-black border border-glass-border' : item.bg}`}>{item.init}</div>
                    <div>
                      <h4 className="text-gold-light font-bold">{item.author}</h4>
                      <span className="text-sm text-text-muted">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            <button onClick={() => scrollCarousel(testCarouselRef, 'next')} className="absolute -right-6 z-20 w-12 h-12 rounded-full bg-black/50 border border-glass-border backdrop-blur flex items-center justify-center hover:bg-gold/20 hover:text-gold transition text-xl cursor-pointer" aria-label="Next Testimonial">&#10095;</button>
          </div>
        </div>
      </section>

      {/* Contact & FAQ */}
      <section id="contact" className="py-20 px-8 bg-bg-charcoal/50 backdrop-blur-md reveal-section mt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Start a Project</h2>
            <p className="text-text-muted max-w-xl">Ready to forge something exceptional? Get in touch and let's discuss your vision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="glass-card p-8">
              <form className="flex flex-col gap-5" onSubmit={handleForm}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-text-muted">Name</label>
                  <input type="text" className="bg-black/30 border border-glass-border p-3 rounded-lg text-white focus:outline-none focus:border-gold transition" placeholder="Your name" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-text-muted">Email</label>
                  <input type="email" className="bg-black/30 border border-glass-border p-3 rounded-lg text-white focus:outline-none focus:border-gold transition" placeholder="hello@example.com" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-text-muted">Project Type</label>
                  <select className="bg-black/30 border border-glass-border p-3 rounded-lg text-white focus:outline-none focus:border-gold transition appearance-none" required>
                    <option value="" disabled selected>Select a category...</option>
                    <option value="graphics">Graphics Design (Gaming/Streaming/Branding)</option>
                    <option value="web-business">Web Development</option>
                    <option value="arch-3d">Architectural / 3D Modeling</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-text-muted">Message</label>
                  <textarea className="bg-black/30 border border-glass-border p-3 rounded-lg text-white focus:outline-none focus:border-gold transition min-h-[120px]" placeholder="Tell us about your project..." required></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Submit Inquiry</button>
              </form>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4 self-start w-full">
              <h3 className="text-2xl font-bold text-gold mb-4">Frequently Asked Questions</h3>
              
              <details className="group bg-black/30 border border-glass-border rounded-lg p-4 transition duration-300 open:border-gold">
                <summary className="flex justify-between items-center font-semibold text-gold-light cursor-pointer list-none">
                  What is your typical turnaround time?
                  <span className="text-gold text-2xl group-open:hidden">+</span>
                  <span className="text-gold text-2xl hidden group-open:block">-</span>
                </summary>
                <p className="text-text-muted mt-4 pt-4 border-t border-glass-border">Depending on the scope, stream overlays take 1-2 weeks, while web development and 3D projects usually range from 3-6 weeks.</p>
              </details>

              <details className="group bg-black/30 border border-glass-border rounded-lg p-4 transition duration-300 open:border-gold">
                <summary className="flex justify-between items-center font-semibold text-gold-light cursor-pointer list-none">
                  Do you offer revisions?
                  <span className="text-gold text-2xl group-open:hidden">+</span>
                  <span className="text-gold text-2xl hidden group-open:block">-</span>
                </summary>
                <p className="text-text-muted mt-4 pt-4 border-t border-glass-border">Yes, all our packages include 2 rounds of revisions to ensure you are completely satisfied with the final result.</p>
              </details>

              <details className="group bg-black/30 border border-glass-border rounded-lg p-4 transition duration-300 open:border-gold">
                <summary className="flex justify-between items-center font-semibold text-gold-light cursor-pointer list-none">
                  What platforms do you build websites on?
                  <span className="text-gold text-2xl group-open:hidden">+</span>
                  <span className="text-gold text-2xl hidden group-open:block">-</span>
                </summary>
                <p className="text-text-muted mt-4 pt-4 border-t border-glass-border">We specialize in custom coded sites, Next.js, Webflow, and Shopify for E-Commerce solutions.</p>
              </details>

              <details className="group bg-black/30 border border-glass-border rounded-lg p-4 transition duration-300 open:border-gold">
                <summary className="flex justify-between items-center font-semibold text-gold-light cursor-pointer list-none">
                  Do you work with international clients?
                  <span className="text-gold text-2xl group-open:hidden">+</span>
                  <span className="text-gold text-2xl hidden group-open:block">-</span>
                </summary>
                <p className="text-text-muted mt-4 pt-4 border-t border-glass-border">Absolutely! We work with businesses, streamers, and creators globally.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Social Contact Section */}
      <section className="py-20 px-8 reveal-section">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-4xl font-bold mb-2">Connect With Us</h2>
          <p className="text-text-muted mb-12">Reach out to us directly or follow our journey across all platforms.</p>
          
          <div className="flex flex-wrap justify-center gap-5">
            {[
              {name: 'Gmail', icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, link: "https://mail.google.com/mail/?view=cm&fs=1&to=contact.gridsmith@gmail.com"},
              {name: 'Facebook', icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>, link: "https://www.facebook.com/gridsmith"},
              {name: 'Instagram', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>, link: "https://www.instagram.com/gridsmith_ltd"},
              {name: 'X', icon: <><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></>, link: "https://x.com/gridsmithltd"},
              {name: 'Freelancer', icon: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>, link: "https://www.freelancer.com/u/GridsmithLTD"},
              {name: 'LinkedIn', icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>, link: "https://www.linkedin.com/company/gridsmith"},
              {name: 'TikTok', icon: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>, link: "https://www.tiktok.com/@gridsmithltd"},
              {name: 'YouTube', icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></>, link: "https://www.youtube.com/@Gridsmithltd"},
              {name: 'Reddit', icon: <><circle cx="12" cy="12" r="10"/><path d="M12 8l-3 4h6z"/><path d="M12 16c2 0 3-1 3-1"/></>, link: "https://www.reddit.com/u/Gridsmithltd/s/CsBkRtMNP8"},
            ].map((social, i) => (
              <a key={i} href={social.link} target="_blank" rel="noreferrer" className="flex-[0_0_calc(20%-16px)] min-w-[120px] flex flex-col items-center justify-center gap-3 p-6 glass-card hover:-translate-y-2 hover:bg-gold/10 hover:border-gold transition duration-300 group cursor-pointer text-text-main hover:text-gold no-underline">
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-gold group-hover:scale-110 transition-transform">
                  {social.icon}
                </svg>
                <span className="text-sm font-medium">{social.name}</span>
              </a>
            ))}
            
            {/* Email Copy Card */}
            <a onClick={copyEmail} className="flex-[0_0_calc(20%-16px)] min-w-[120px] flex flex-col items-center justify-center gap-3 p-6 glass-card hover:-translate-y-2 hover:bg-gold/10 hover:border-gold transition duration-300 group cursor-pointer text-text-main hover:text-gold no-underline">
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-gold group-hover:scale-110 transition-transform">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              <span id="emailCopyText" className="text-sm font-medium">Email Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-8 bg-bg-dark border-t border-glass-border text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/assets/logo.png" alt="Logo" className="h-6" />
            <span className="font-bold tracking-wider text-lg">Gridsmith Ltd</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#services" className="text-text-muted hover:text-gold transition">Services</a>
            <a href="#portfolio" className="text-text-muted hover:text-gold transition">Portfolio</a>
            <a href="#testimonials" className="text-text-muted hover:text-gold transition">Testimonials</a>
            <a href="#contact" className="text-text-muted hover:text-gold transition">Contact</a>
          </div>
          <div className="text-sm text-text-muted">
            &copy; 2026 Gridsmith Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
