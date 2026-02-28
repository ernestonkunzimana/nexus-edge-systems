'use client'

import Link from 'next/link'
import { Mail, MapPin, Phone, Facebook, Linkedin, Twitter, MessageCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/devices', label: 'Devices' },
    { href: '/team', label: 'Team' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ]

  const services = [
    'IT Infrastructure',
    'Hardware Maintenance',
    'Network Solutions',
    'Security Systems',
    'Consulting Services',
  ]

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: 'Nairobi, Kenya',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+254 XXX XXX XXX',
      href: 'tel:+254xxxxxxxxx',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@nexusedge.com',
      href: 'mailto:info@nexusedge.com',
    },
  ]

  const socialLinks = [
    {
      icon: Facebook,
      href: '#',
      label: 'Facebook',
    },
    {
      icon: Linkedin,
      href: '#',
      label: 'LinkedIn',
    },
    {
      icon: Twitter,
      href: '#',
      label: 'Twitter',
    },
    {
      icon: MessageCircle,
      href: '#',
      label: 'WhatsApp',
    },
  ]

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">Nexus Edge Systems</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leading provider of enterprise IT solutions and services for businesses across East Africa.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-slate-400 text-sm hover:text-blue-400 transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              {contactInfo.map((info) => (
                <li key={info.label}>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="flex items-start gap-3 text-slate-400 hover:text-blue-400 transition-colors text-sm group"
                    >
                      <info.icon className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:text-blue-400" />
                      <div>
                        <p className="text-xs text-slate-500">{info.label}</p>
                        <p className="group-hover:text-blue-400">{info.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-3 text-slate-400 text-sm">
                      <info.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500">{info.label}</p>
                        <p>{info.value}</p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center sm:text-left">
              &copy; {currentYear} Nexus Edge Systems LTD. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
