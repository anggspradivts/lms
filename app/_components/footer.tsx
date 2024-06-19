const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Angga Web Course</h2>
          <p className="text-gray-400">High-quality online education for everyone.</p>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="/courses" className="text-gray-400 hover:text-gray-200">Courses</a>
          <a href="/about" className="text-gray-400 hover:text-gray-200">About Us</a>
          <a href="/contact" className="text-gray-400 hover:text-gray-200">Contact</a>
          <a href="/faq" className="text-gray-400 hover:text-gray-200">FAQ</a>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://facebook.com" className="text-gray-400 hover:text-gray-200">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              {/* Facebook SVG Icon */}
            </svg>
          </a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-gray-200">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              {/* Twitter SVG Icon */}
            </svg>
          </a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-gray-200">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              {/* Instagram SVG Icon */}
            </svg>
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-200">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              {/* LinkedIn SVG Icon */}
            </svg>
          </a>
        </div>
        <div className="text-gray-500">
          &copy; {new Date().getFullYear()} Angga Web Course. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
