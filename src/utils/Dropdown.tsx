import { useState } from "react";
import Transition from "./Transition";
import { AiOutlineDown } from "react-icons/ai";

function Dropdown({ isDark = false, children, title }: any) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
      onFocus={() => setDropdownOpen(true)}
      onBlur={() => setDropdownOpen(false)}
    >
      <a
        className={`${isDark ? "text-white" : "text-gray-600"} hover:${
          isDark ? "text-white" : "text-gray-900"
        } px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out`}
        href="#0"
        aria-expanded={dropdownOpen}
        onClick={(e) => e.preventDefault()}
      >
        {title}
        <AiOutlineDown color={isDark ? "white" : "gray"} />
      </a>
      <Transition
        show={dropdownOpen}
        tag="ul"
        className={`origin-top-right absolute top-full right-0 w-40 ${
          isDark ? "bg-gray-400" : "bg-white"
        } py-2 ml-4 rounded shadow-lg`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        {children}
      </Transition>
    </li>
  );
}

export default Dropdown;
