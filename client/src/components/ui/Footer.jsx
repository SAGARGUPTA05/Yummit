import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

function Footer() {
  const { theme } = useThemeStore();

  const bgColor = theme === 'light' ? 'bg-[#FFEFD2]' : 'bg-[#1A1A1A]';
  const textColor = theme === 'light' ? 'text-black' : 'text-gray-400';

  return (
    <footer className={`w-full py-10 px-6 ${bgColor} ${textColor}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Logo and Description */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className='font-extrabold text-5xl'>Yummit</h3>
            <p className="text-sm">Because good food can’t wait</p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-center md:text-left">
            <div>
              <p className="font-semibold mb-2">Company</p>
              <ul className="space-y-1">
                <li>Blinkit</li>
                <li>District</li>
                <li>Hyperpure</li>
                <li>Feeding India</li>
                <li>Investor Relations</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">For Restaurants</p>
              <ul className="space-y-1">
                <li>Partner With Us</li>
                <li>Apps For You</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">For Delivery Partners</p>
              <ul className="space-y-1">
                <li>Partner With Us</li>
                <li>Apps For You</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Learn More</p>
              <ul className="space-y-1">
                <li>Privacy</li>
                <li>Security</li>
                <li>Terms of Service</li>
                <li>Help & Support</li>
                <li>Report a Fraud</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
        </div>

        {/* App Logos and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 md:mb-0">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="Play Store" className="w-32" />
            <img src="data:image/png;base64,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" alt="App Store" className="w-32" />
          </div>

          <div className="flex gap-4 text-xl">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="border-t border-gray-600 pt-6 text-xs text-center">
          <p className="mb-1">
            By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners.
          </p>
          <p>2025-2025 © Yummit Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
