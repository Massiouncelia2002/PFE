import React, { useState, useRef, useEffect } from "react";

export const DropdownMenu = ({ children }) => {
  return <div className="relative inline-block text-left">{children}</div>;
};

export const DropdownMenuTrigger = ({ children }) => {
  return (
    <div tabIndex={0} className="cursor-pointer focus:outline-none">
      {children}
    </div>
  );
};

export const DropdownMenuContent = ({ children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const toggleMenu = () => setOpen((prev) => !prev);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={toggleMenu}>{children[0]}</div>
      {open && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white border shadow-lg z-50">
          <div className="py-1">{children.slice(1)}</div>
        </div>
      )}
    </div>
  );
};

export const DropdownMenuItem = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </button>
  );
};
