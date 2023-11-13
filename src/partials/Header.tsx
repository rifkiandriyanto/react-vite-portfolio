import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Dropdown from "./../utils/Dropdown";
import { Link } from "react-router-dom";

const Header = ({ isDark = false }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState<any>(false);
  const [top, setTop] = useState<any>(true);
  const hamburgerRef = useRef<any>(null);
  const mobileNavRef = useRef<any>(null);
  const [isHeaderDark, setIsHeaderDark] = useState(isDark);

  const handleToggleNav = () => {
    setMobileNavOpen((prevState: any) => !prevState);
  };

  const clickOutside = (e: any) => {
    if (
      !mobileNavOpen ||
      mobileNavRef.current.contains(e.target) ||
      hamburgerRef.current.contains(e.target)
    )
      return;
    setMobileNavOpen(false);
  };

  const keyPress = (event: any) => {
    if (!mobileNavOpen || event.keyCode !== 27) return;
    setMobileNavOpen(false);
  };

  const handleScroll = () => {
    setTop(window.pageYOffset > 10 ? false : true);
  };

  useEffect(() => {
    document.addEventListener("click", clickOutside);
    document.addEventListener("keydown", keyPress);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", clickOutside);
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsHeaderDark(top);
  }, [top]);

  const links = [
    {
      path: "/contact",
      text: "Contact",
    },
  ];

  const dropdownTitle = "Use Cases";

  const dropdownLinks = [
    {
      path: "/project",
      text: "Gambar",
    },
    {
      path: "/motion",
      text: "Video",
    },
  ];

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <svg
                className="w-8 h-8"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    cx="21.152%"
                    cy="86.063%"
                    fx="21.152%"
                    fy="86.063%"
                    r="79.941%"
                    id="header-logo"
                  >
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect
                  width="32"
                  height="32"
                  rx="16"
                  fill="url(#header-logo)"
                  fillRule="nonzero"
                />
              </svg>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:flex-grow">
            {console.log("test isHeaderDark", isHeaderDark)}

            {/* Desktop sign in links */}
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <Link
                  to="/about"
                  className={`font-medium ${
                    isHeaderDark ? "text-white" : "text-gray-600"
                  } 
                  hover:${
                    isHeaderDark ? "text-white" : "text-gray-900"
                  } px-5 py-3 flex items-center 
                   transition duration-150 ease-in-out`}
                >
                  About
                </Link>
              </li>
              {dropdownLinks.length > 0 && (
                <Dropdown isDark={isHeaderDark} title={dropdownTitle}>
                  {dropdownLinks.map((ddLink) => (
                    <li key={ddLink.path}>
                      <Link
                        to={ddLink.path}
                        className="font-medium text-sm text-gray-600 hover:text-gray-900 flex py-2 px-5 leading-tight"
                      >
                        {ddLink.text}
                      </Link>
                    </li>
                  ))}
                </Dropdown>
              )}
            </ul>
          </nav>

          {/* Mobile menu */}
          <div className="flex md:hidden">
            {/* Hamburger button */}
            <button
              ref={hamburgerRef}
              className={`hamburger ${mobileNavOpen ? "active" : ""}`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={handleToggleNav}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6 fill-current text-gray-900"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="4" width="24" height="2" />
                <rect y="11" width="24" height="2" />
                <rect y="18" width="24" height="2" />
              </svg>
            </button>

            {/* Mobile navigation */}
            <CSSTransition
              in={mobileNavOpen}
              timeout={200}
              classNames={{
                enter:
                  "transition ease-out duration-200 transform opacity-0 -translate-y-2",
                enterActive:
                  "transition ease-out duration-200 transform opacity-100 translate-y-0",
                exit: "transition ease-out duration-200",
                exitActive: "transition ease-out duration-200 opacity-0",
              }}
              unmountOnExit
            >
              <nav
                id="mobile-nav"
                ref={mobileNavRef}
                className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white transition-all duration-300 ease-in-out"
              >
                <ul className="px-5 py-2">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="flex text-gray-600 hover:text-gray-900 py-2"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                  {dropdownLinks.length > 0 && (
                    <li className="py-2 my-2 border-t border-b border-gray-200">
                      <span className="flex text-gray-600 hover:text-gray-900 py-2">
                        {dropdownTitle}
                      </span>
                      <ul className="pl-4">
                        {dropdownLinks.map((ddLink) => (
                          <li key={ddLink.path}>
                            <Link
                              to={ddLink.path}
                              className="text-sm text-gray-600 hover:text-gray-900 py-2"
                            >
                              {ddLink.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </nav>
            </CSSTransition>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
