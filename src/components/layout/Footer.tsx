import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';
import data from '@/data.json';

const Footer = () => {
  const { site, footer, navigation } = data;
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'github':
        return <Github size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-navy text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-strong-blue to-soft-blue flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="font-bold text-xl">{site.name}</span>
            </Link>
            <p className="text-white/70 max-w-md mb-6">
              {footer.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {footer.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-strong-blue transition-colors"
                  aria-label={link.platform}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {navigation.slice(0, 5).map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>{site.email}</li>
              <li>{site.phone}</li>
              <li>{site.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footer.legalLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white/50 hover:text-white transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
