import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Sparkles } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/GitScope-icon.png";

const links = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Docs", href: "https://docs.github.com/en/rest" },
];

const socials = [
  {
    icon: FaGithub,
    href: "https://github.com/aashuky",
    label: "GitHub",
    brand: "gh",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/aashish-kumar-yadav-363700372/",
    label: "LinkedIn",
    brand: "li",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com/aashishy22",
    label: "Twitter",
    brand: "tw",
  },
];

const Footer = () => {
  return (
    <footer className="footer mt-8 rounded-[28px] border border-white/10 bg-white/5 px-4 py-6 text-slate-300 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:px-6">
      <div className="footer-orb footer-orb-1" />
      <div className="footer-orb footer-orb-2" />
      <Sparkles size={26} className="footer-sparkle" />

      <div className="footer-inner">
        <div className="footer-grid grid gap-8 md:grid-cols-[1.2fr_0.7fr_0.7fr]">
          <div className="footer-brand">
            <div className="footer-brand-row flex items-center gap-3">
              <span className="logo-icon footer-logo-icon">
                <img src={logo} alt="GitScope logo" />
              </span>
              <span className="footer-logo-text text-lg font-semibold text-white">GitScope</span>
            </div>
            <p className="footer-desc mt-3 max-w-xl text-sm leading-7 text-slate-400">
              A high-performance diagnostic dashboard for exploring, auditing, and
              visualizing GitHub profile metrics and repository data.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
              Quick links
            </h4>
            <ul className="footer-links-list space-y-2 text-sm text-slate-400">
              {links.map((l) => (
                <li key={l.label}>
                  {l.href === "/" ? (
                    <Link to="/" className="transition hover:text-white">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="transition hover:text-white">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
              Connect
            </h4>
            <div className="footer-socials flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, href, label, brand }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`footer-social ${brand} flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/20`}
                  aria-label={label}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom mt-8 flex flex-col gap-2 border-t border-white/10 pt-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p className="footer-copy">© 2026 GitScope. All rights reserved.</p>
          <p className="footer-madeby">
            Made with care by <span className="footer-madeby-name font-semibold text-white">Aashu</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;