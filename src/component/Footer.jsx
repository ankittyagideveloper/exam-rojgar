import { MessageCircle, Send, Phone } from "lucide-react";
import { Link } from "react-router";
const Footer = () => {
  const footerLinks = [
    "About Us",
    "Rating Us",
    "Terms & Condition",
    "Privacy Policy",
    "Refund Policy",
    "Disclaimer",
    "Free Online exam",
  ];

  const channelRoute =
    "https://www.whatsapp.com/channel/0029VbAqJ1MHLHQV47i0lI3u"; // Your WhatsApp number
  const email = "crackgovernmentjobs@gmail.com";
  const phone = "+91 97487 41664";

  return (
    <footer className="relative bottom-15 lg:bottom-0 left-0 right-0 bg-[#008080] text-white py-8 mt-auto hidden md:block">
      <div className="container mx-auto px-4">
        {/* Logo and Brand */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="examrojgar-logo" className="relative" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">ExamRojgar</h2>
              <p className="text-sm opacity-90">TEST SERIES</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4 mb-6">
            <Link
              to={channelRoute}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Send className="w-5 h-5" />
            </Link>
            <Link
              to={`mailto:${email}`}
              target="_blank"
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </Link>
            <Link
              to={`tel:${phone}`}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {footerLinks.map((link, index) => (
            <div key={index} className="text-center">
              <button className="text-white hover:text-[#FFD700] transition-colors text-sm font-medium">
                {link}
              </button>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-white/20">
          <p className="text-sm opacity-90">
            © 2025 ExamRojgar Test Series. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
