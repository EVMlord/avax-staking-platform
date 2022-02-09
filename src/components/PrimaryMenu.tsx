import React, { useState } from "react";
import { GoThreeBars } from "react-icons/go";
import ConnectWalletButton from "./Button/ConnectWalletButton";

const links = [
  {
    name: "Home",
    href: "https://kryptolite.rocks/#home",
  },
  {
    name: "Buy $KRL",
    href: "https://pancakeswap.finance/swap?outputCurrency=0xF1288cF18B1FAaA35F40111c3E5d2f827e1E920E",
    target: "_blank",
    rel: "noreferrer nofollow noopener",
  },
  {
    name: "Contract",
    href: "https://bscscan.com/token/0xf1288cf18b1faaa35f40111c3e5d2f827e1e920e",
    target: "_blank",
    rel: "noreferrer nofollow noopener",
  },
  {
    name: "Road Map",
    href: "https://kryptolite.rocks/#road",
  },
  {
    name: "Community",
    href: "https://kryptolite.rocks/#community",
  },
  {
    name: "Contact us",
    href: "#contact-us",
  },
];

export default function PrimaryMenu() {
  const [hidden, setHidden] = useState(true);

  const toggleMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setHidden((p) => !p);
  };

  const closeMenu: React.MouseEventHandler<HTMLAnchorElement> | undefined = (
    e
  ) => {
    e?.stopPropagation();
    setHidden(true);
  };

  const openClass = "!-translate-y-full";

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="outline-none flex-none inline-block lg:hidden border p-1 mr-4"
      >
        <GoThreeBars className="h-7 w-7 m-0" />
      </button>
      <nav
        className={`fixed lg:static -z-10 lg:z-auto lg:!transform-none transition-transform duration-200 w-11/12 lg:w-auto mx-auto left-0 right-0 top-[62px] lg:top-0 bg-[#2b2b2b] lg:bg-transparent ${
          hidden ? openClass : "translate-y-0"
        }`}
        role="navigation"
        aria-label="desktop nav"
      >
        <ul>
          {links.map(({ name, ...rest }, i) => (
            <li
              key={i}
              className="list-item lg:inline-block relative transition-colors duration-300 font-light text-sm lg:mx-1 text-white hover:text-primary-400 after:hidden after:lg:block after:w-1.5 after:h-1.5 after:rounded-full after:bg-primary-400 after:absolute after:left-1/2 after:-translate-x-1/2 after:top-full after:-mt-1 after:invisible hover:after:visible"
            >
              <a
                {...rest}
                onClick={closeMenu}
                className="transition-colors duration-300 p-3.5 lg:p-2 block hover:bg-[#f9b707] lg:hover:bg-inherit text-white hover:text-white lg:hover:text-primary-400"
              >
                {name}
              </a>
            </li>
          ))}
          <li className="list-item lg:inline-block relative">
            <ConnectWalletButton action={closeMenu} />
          </li>
        </ul>
      </nav>
    </div>
  );
}
