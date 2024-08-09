//functional component with arrow function
import React from "react";
import image2 from "../../assets/icons/Home.png"
import image3 from "../../assets/icons/Product.png"
import image4 from "../../assets/icons/AboutUs.png";
import image5 from "../../assets/icons/ContactUs.png";
import MenuItem from "./MenuItem";

//array of the items like logo and its url passed to the menuitems.js
//passed in the form of props

const NavBar = () => {
  const listItems = [
    {
      id: 1,
      logo: image2,
      url: "/",
      name: 'Home'
    },
  
    {
      id: 2,
      logo: image3,
      url: "/products",
      name: 'Products'
    },
  
    {
      id: 3,
      logo: image4,
      url: "/aboutus/content",
      name: 'About Us'
    },
  
    {
      id: 4,
      logo: image5,
      url: "/contactus/content",
      name: 'Contact Us'
    }
  ];
  return (
    <ul className="navbar-nav me-auto mb-2 mb-md-0">
      {/* this is the loop through using map function. */}
      {/* props are passed here */}
      {listItems.map((item) => (
        <MenuItem {...item} key={item.id}></MenuItem>
      ))}
    </ul>
  );
};

export default NavBar;
