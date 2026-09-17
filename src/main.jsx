import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Leaf, Menu, MoveUpRight, Phone, X } from 'lucide-react';
import './styles.css';

const services = [
  { number: '01', title: 'Lawn mowing & edging', copy: 'A neat, even cut with the clean finish your yard deserves.' },
  { number: '02', title: 'Leaf raking', copy: 'Seasonal cleanup that keeps leaves from taking over.' },
  { number: '03', title: 'Yard waste bagging', copy: 'We gather and bag the mess so you do not have to.' },
  { number: '04', title: 'Plant trimming', copy: 'Simple shaping and cleanup to keep things tidy.' },
  { number: '05', title: 'Snow shoveling', copy: 'Reliable winter help for small, high-traffic areas.' },
  { number: '06', title: 'Small landscaping jobs', copy: 'Flexible help for the outdoor projects on your list.' },
];

const reasons = [
  { title: 'Local', copy: 'We are an Edmonton-based crew serving our own community.' },
  { title: 'Fair pricing', copy: 'A clear, flexible quote before any work begins.' },
  { title: 'Ready to work', copy: 'We bring the tools and show up prepared.' },
  { title: 'Reliable', copy: 'Good communication and proper work, every time.' },
  { title: 'Community driven', copy: 'Local teens building something through honest effort.' },
];

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

function SectionLabel({ children }) {
  return <p className="section-label"><span />{children}</p>;
}

function Button({ children, href, secondary = false, onClick }) {
  return <a className={`button ${secondary ? 'button-secondary' : ''}`} href={href} onClick={onClick}>{children}<ArrowUpRight size={16} strokeWidth={1.8} /></a>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [['Services', '#services'], ['About', '#about'], ['How it works', '#how-it-works'], ['Contact', '#contact']];
  return <header className="navbar">
    <a href="#top" className="brand" onClick={() => setOpen(false)}><span>Green Crew<span className="brand-sub">Landscaping</span></span></a>
    <a href="#top" className="nav-logo" aria-label="Green Crew Landscaping home"><img src="/images/logo.png" alt="Green Crew Landscaping logo" /></a>
    <nav className="desktop-nav">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<Button href="#contact">Get a quote</Button></nav>
    <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
      {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <Button href="#contact" onClick={() => setOpen(false)}>Get a quote</Button>
    </motion.nav>}</AnimatePresence>
  </header>;
}

function Hero() {
  return <section className="hero section-pad" id="top">
    <div className="hero-copy">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={reveal}><SectionLabel>Edmonton <i /> Local <i /> Reliable</SectionLabel></motion.div>
        <motion.h1 variants={reveal}>A better-kept yard, <em>without the hassle.</em></motion.h1>
        <motion.p className="hero-text" variants={reveal}>Affordable, reliable lawn care and small landscaping jobs from a motivated local crew. We bring the tools, do the work, and make it easy.</motion.p>
        <motion.div className="hero-actions" variants={reveal}><Button href="#contact">Get a free quote</Button><a className="text-link" href="tel:8254615233"><Phone size={15} />Text 825-461-5233</a></motion.div>
        <motion.p className="trust-note" variants={reveal}><Check size={16} /> Clear pricing before we start. No surprises.</motion.p>
      </motion.div>
    </div>
    <motion.div className="hero-image-wrap" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
      <img src="/images/past-work-4.png" alt="Finished landscaping with river rock, shrubs, and artificial turf" />
      <div className="image-caption"><span className="caption-dot" />Small jobs. Done properly.</div>
    </motion.div>
    <div className="hero-aside">EST. IN EDMONTON <span>///</span> 2024</div>
  </section>;
}

function Services() {
  return <section className="services section-pad" id="services"><div className="section-intro"><div><SectionLabel>What we do</SectionLabel><h2>The jobs that keep your yard <em>looking good.</em></h2></div><p>From regular lawn maintenance to seasonal cleanup, we handle the small jobs that make a big difference.</p></div>
    <motion.div className="service-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>{services.map(service => <motion.article className="service-item" variants={reveal} key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.copy}</p><MoveUpRight className="service-arrow" size={18} /></motion.article>)}</motion.div>
  </section>;
}

function WhyUs() {
  return <section className="why section-pad"><div className="why-visual"><div className="vertical-note">THE GREEN CREW STANDARD</div><img src="/images/past-work-3.png" alt="Neatly finished gravel garden bed with trimmed greenery" /></div><div className="why-copy"><SectionLabel>Why Green Crew</SectionLabel><h2>Small crew. <em>Serious about the work.</em></h2><p className="lead">We are young, local, and ready to work. That means straightforward communication, fair rates, and care for the place we are working in.</p><div className="reason-list">{reasons.map((reason, index) => <div className="reason" key={reason.title}><span>0{index + 1}</span><div><h3>{reason.title}</h3><p>{reason.copy}</p></div></div>)}</div></div></section>;
}

function WorkGallery() {
  const projects = [
    ['/images/past-work-1.jpeg', 'Snow-cleared residential driveway and walkway', 'Winter service'],
    ['/images/past-work-2.png', 'Fresh gravel garden bed with stepping stones', 'Garden refresh'],
    ['/images/past-work-3.png', 'Trimmed shrub and clean gravel border', 'Landscape detail'],
    ['/images/past-work-4.png', 'Finished rock garden beside artificial turf', 'Outdoor finish'],
  ];
  return <section className="work-gallery section-pad"><div className="section-intro"><div><SectionLabel>Recent work</SectionLabel><h2>Small jobs. <em>Visible difference.</em></h2></div><p>Real examples from the kind of outdoor cleanup and landscaping work Green Crew takes on around Edmonton.</p></div><div className="gallery-grid">{projects.map(([image, alt, label]) => <figure key={image}><img src={image} alt={alt} /><figcaption>{label}</figcaption></figure>)}</div></section>;
}

function Reviews() {
  const googleProfileUrl = 'https://www.google.com/maps/search/?api=1&query=Green%20Crew%20Landscaping%2C%20Edmonton%2C%20Alberta';
  return <section className="reviews section-pad"><div className="reviews-heading"><SectionLabel>From our customers</SectionLabel><h2>Good work is worth <em>talking about.</em></h2><p>See the latest feedback, photos, and updates from Green Crew Landscaping on our Google Business profile.</p><a className="button" href={googleProfileUrl} target="_blank" rel="noreferrer">Read our Google reviews <ArrowUpRight size={16} /></a></div><div className="review-proof"><article className="review-card"><div className="review-meta"><span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span><span>Tim Bangle</span><span>3 days ago · New</span></div><p>“Some awesome young men came and mowed my lawn and weeded my backyard they were so polite with the best manners and amazing work and quality”</p></article><article className="review-card"><div className="review-meta"><span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span><span>Jaden Mack</span><span>10 months ago</span></div><p>“Loved the service a lot. Raked leaves and maintained professionalism the entire time”</p></article><article className="review-card"><div className="review-meta"><span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span><span>Han Huculak</span><span>3 days ago · New</span></div><p>“Great price”</p></article><a className="text-link" href={googleProfileUrl} target="_blank" rel="noreferrer">Visit our Google profile <ArrowUpRight size={15} /></a></div></section>;
}

function HowItWorks() {
  const steps = [['01', 'Tell us what you need', 'Text or email us with the job and your location.'], ['02', 'Get a clear quote', 'We discuss the work and give you a straightforward quote before starting.'], ['03', 'We get to work', 'We bring our equipment, take care of the job, and leave your yard looking better.']];
  return <section className="process section-pad" id="how-it-works"><div className="section-intro process-intro"><div><SectionLabel>Simple from start to finish</SectionLabel><h2>Good work should feel <em>easy.</em></h2></div><p>No complicated booking systems or mystery pricing. Just a quick conversation with people who are ready to help.</p></div><motion.div className="steps" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>{steps.map(([number, title, copy]) => <motion.div className="step" variants={reveal} key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div></motion.div>)}</motion.div></section>;
}

function Options() {
  return <section className="options section-pad"><div className="options-heading"><SectionLabel>Flexible service</SectionLabel><h2>Need it once? <em>Need it all season?</em></h2><p>Whether your yard needs a one-time cleanup or regular maintenance, we will find a schedule that makes sense.</p></div><div className="option-grid"><article><span className="option-kicker">One-time jobs</span><h3>Clear the list, get on with your week.</h3><p>Perfect for seasonal cleanup, overgrown lawns, trimming, yard waste, or a quick outdoor refresh.</p><a href="#contact">Ask about a service <ArrowUpRight size={15} /></a></article><article><span className="option-kicker">Recurring maintenance</span><h3>Keep things under control all season.</h3><p>Regular lawn care and maintenance that keeps your outdoor space looking cared for.</p><a href="#contact">Ask about a service <ArrowUpRight size={15} /></a></article></div></section>;
}

function Pricing() {
  return <section className="pricing section-pad"><div><SectionLabel>Our approach</SectionLabel><h2>Fair pricing. <em>Clear expectations.</em></h2></div><div className="pricing-copy"><p>Every yard and job is different, so we keep our pricing flexible and fair. You will know the cost before we start.</p><ul><li><Check size={17} />Flexible rates</li><li><Check size={17} />Clear quotes</li><li><Check size={17} />No surprise charges</li><li><Check size={17} />One-time or recurring service</li></ul><Button href="#contact">Get your quote</Button></div></section>;
}

function About() {
  return <section className="about section-pad" id="about"><div className="about-copy"><SectionLabel>A little about us</SectionLabel><h2>Built by local teens. <em>Built on hard work.</em></h2><p>Green Crew Landscaping was started by a group of motivated local teens who wanted to build something of their own while helping people in their community.</p><p>We believe good service is pretty simple: show up, communicate clearly, do the work properly, and treat people’s homes with respect.</p><Button href="#contact" secondary>Meet us at your yard</Button></div><div className="about-image"><img className="crew-photo" src="/images/crew-photo.jpeg" alt="The Green Crew team together" /><div className="about-stamp">LOCAL<br /><span>×</span><br />EDMONTON</div></div></section>;
}

function ServiceArea() {
  return <section className="area section-pad"><div className="area-map"><iframe title="Map of Edmonton and surrounding service area" src="https://www.google.com/maps?q=Edmonton%2C%20Alberta&z=11&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="service-radius"><span />20 km service radius around Edmonton</div></div><div className="area-copy"><SectionLabel>Where we work</SectionLabel><h2>Proudly serving <em>Edmonton.</em></h2><p>Our service area is a 20 km radius around Edmonton. Explore the map, then tell us where your yard is so we can confirm we cover your address.</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Edmonton%2C%20Alberta" target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={15} /></a></div></section>;
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Quote request from ${data.get('name')}`;
    const body = [`Name: ${data.get('name')}`, `Phone or email: ${data.get('contact')}`, `Service: ${data.get('service') || 'Not specified'}`, `Preferred timing: ${data.get('timing') || 'Not specified'}`, `Message: ${data.get('message') || 'None'}`].join('\n');
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=greencrewlandscapping@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };
  return <section className="contact section-pad" id="contact"><div className="contact-heading"><SectionLabel>Let’s talk</SectionLabel><h2>Let’s get your yard <em>sorted.</em></h2><p>Tell us what you need and we’ll get back to you with a clear quote.</p><div className="contact-actions"><a className="contact-button" href="tel:8254615233"><span><Phone size={19} />Text us</span><strong>825-461-5233</strong><ArrowUpRight size={17} /></a><a className="contact-button" href="https://mail.google.com/mail/?view=cm&fs=1&to=greencrewlandscapping@gmail.com" target="_blank" rel="noreferrer"><span><Leaf size={19} />Email us</span><strong>Open Gmail</strong><ArrowUpRight size={17} /></a></div></div><form className="quote-form" onSubmit={handleSubmit}><label>Name<input required name="name" autoComplete="name" placeholder="Your name" /></label><label>Phone or email<input required name="contact" autoComplete="email" placeholder="How should we reach you?" /></label><label>What do you need help with?<select required name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Lawn care</option><option>Seasonal cleanup</option><option>Small landscaping job</option><option>Snow shoveling</option><option>Something else</option></select></label><label>Preferred timing<input name="timing" placeholder="e.g. This weekend" /></label><label className="full-field">Optional message<textarea name="message" rows="3" placeholder="A few details about the job" /></label><div className="form-footer"><button className="button" type="submit">{submitted ? 'Gmail draft opened' : 'Request a quote'}<ArrowUpRight size={16} /></button><p>Gmail will open with the details filled in. Nothing is stored on this website.</p></div></form></section>;
}

function Footer() {
  return <footer><div className="footer-main"><a href="#top" className="brand"><img className="brand-logo" src="/images/logo.png" alt="Green Crew Landscaping logo" /><span>Green Crew<span className="brand-sub">Landscaping</span></span></a><p>Local lawn care and small landscaping jobs<br />in Edmonton, Alberta.</p><div className="footer-links"><a href="#services">Services</a><a href="#about">About</a><a href="#how-it-works">How it works</a><a href="#contact">Contact</a></div><div className="footer-contact"><a href="tel:8254615233">825-461-5233</a><a href="mailto:greencrewlandscapping@gmail.com">greencrewlandscapping@gmail.com</a></div></div><div className="footer-bottom"><span>© 2024 Green Crew Landscaping</span><span>Edmonton, Alberta <span className="footer-leaf">✳</span></span></div></footer>;
}

function App() {
  return <><Navbar /><main><Hero /><Services /><WhyUs /><WorkGallery /><Reviews /><HowItWorks /><Options /><Pricing /><About /><ServiceArea /><Contact /></main><Footer /></>;
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
