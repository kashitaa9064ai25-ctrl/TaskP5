import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer id="contact" className="mt-auto">
      <div className="bg-[#178582] text-white pt-10 pb-6 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
          <div>
            <h4 className="font-bold text-lg mb-3">Explore</h4>
            <ul className="space-y-1 text-sm text-teal-50">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><a href="#questions" className="hover:underline">Questions</a></li>
              <li><a href="#articles" className="hover:underline">Articles</a></li>
              <li><a href="#tutorials" className="hover:underline">Tutorials</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Support</h4>
            <ul className="space-y-1 text-sm text-teal-50">
              <li><a href="#faqs" className="hover:underline">FAQs</a></li>
              <li><a href="#help" className="hover:underline">Help</a></li>
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Stay connected</h4>
            <div className="flex space-x-3 text-2xl">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-80">📘</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:opacity-80">🐦</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-80">📷</a>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto border-t border-teal-600 pt-4 text-center">
          <p className="font-bold text-sm tracking-wide mb-2">DEV@Deakin 2026</p>
          <div className="space-x-6 text-xs text-teal-100">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms</a>
            <a href="#conduct" className="hover:underline">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;