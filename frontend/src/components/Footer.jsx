import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 shadow-inner mt-10">
      <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

        <div className="flex flex-col gap-2 md:gap-4">
          <p className="text-xl font-bold text-red-500">Homely</p>
          <p className="text-gray-600 text-sm max-w-[250px]">
            Discover and book unique stays, experiences, and more. Making your home feel like never before.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-gray-800 font-semibold">Company</span>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">About Us</a>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">Blog</a>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">Careers</a>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">Press</a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-800 font-semibold">Support</span>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">Help Center</a>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">Safety Information</a>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">Cancellation Options</a>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">Community Guidelines</a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-800 font-semibold">Hosting</span>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">Host your home</a>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">Host an experience</a>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">Responsible hosting</a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-800 font-semibold">Community</span>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">Diversity & Belonging</a>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">Accessibility</a>
            <a href="#" className="text-gray-600 hover:text-red-500 transition">Homely.org</a>
          </div>
        </div>

        <div className="flex gap-4 mt-6 md:mt-0">
          {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, idx) => (
            <a key={idx} href="#" 
               className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition">
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-gray-200 mt-6 py-4">
        <p className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Homely. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
