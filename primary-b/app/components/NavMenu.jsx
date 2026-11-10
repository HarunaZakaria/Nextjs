import React from "react";

function NavMenu() {
  return (
    <div>
      <ul className="flex justify-end mr-10">
        <li className="mx-3 hover:text-red-500 text-lg">Home</li>
        <li className="mx-3 hover:text-red-500 text-lg">About</li>
        <li className="mx-3 hover:text-red-500 text-lg">Events</li>
        <li className="mx-3 hover:text-red-500 text-lg">Admissions</li>
        <li className="mx-3 hover:text-red-500 text-lg">Contact Us</li>
        <li className="mx-3 hover:text-red-500 text-lg">Blog</li>
      </ul>
    </div>
  );
}

export default NavMenu;
