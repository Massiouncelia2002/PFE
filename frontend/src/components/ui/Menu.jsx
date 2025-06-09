import { useState } from "react";

export function Menu({ items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-gray-800 text-white rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg">
          {items.map((item, index) => (
            <button
              key={index}
              className="block w-full px-4 py-2 text-left hover:bg-gray-200"
              onClick={item.onClick}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
