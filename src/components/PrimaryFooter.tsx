import React from "react";
import { links } from "globalData";
import { IconBaseProps } from "react-icons";
import Link from "./Link";
/* import {
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa"; */

export interface SocialLinkProps {
  link: string;
  icon: (props: IconBaseProps) => JSX.Element;
}
/* 
const SocialLink = ({ link, icon }: SocialLinkProps) => (
  <a
    href={link}
    rel="noopener nofollow"
    className="text-white p-3.5 mx-2 ring-1 ring-gray-400 rounded-full hover:bg-primary-500 transition"
  >
    {icon({ className: "h-4 w-4" })}
  </a>
);

const socials: SocialLinkProps[] = [
  {
    link: "https://twitter.com/KryptoliteSwap",
    icon: (props) => <FaTwitter {...props} />,
  },
  {
    link: "https://fb.me/KryptoliteCommunity",
    icon: (props) => <FaFacebookF {...props} />,
  },
  {
    link: "https://t.me/KryptoliteCommunity",
    icon: (props) => <FaTelegram {...props} />,
  },
  {
    link: "https://t.me/KryptoliteNews",
    icon: (props) => <FaTelegramPlane {...props} />,
  },
  {
    link: "https://instagram.com/kryptolite_community",
    icon: (props) => <FaInstagram {...props} />,
  },
]; */

export default function PrimaryFooter() {
  return (
    <footer>
      <div>
        <div className="container mx-auto py-4 px-5 flex flex-col justify-center">
          <div className="text-center my-4 flex flex-wrap justify-center">
            {links.map(({ name, ...rest }, i) => (
              <Link
                key={name}
                className="px-5 py-3 text-sm font-semibold hover:text-primary-700
                focus:text-primary-500 transition-colors duration-300"
                {...rest}
              >
                {name}
              </Link>
            ))}
          </div>
          <div className="text-sm text-center">
            Copyright &copy; {new Date().getFullYear()} ASP.
          </div>
        </div>
      </div>
    </footer>
  );
}
