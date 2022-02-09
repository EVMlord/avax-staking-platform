import React from "react";
import { Link as ReactRouterLink, LinkProps } from "react-router-dom";

export default function Link({ children, to, button, className, ...other }: LinkProps & {button?: boolean}) {
  const internal = /^\/(?!\/)/.test(to.toString());

  const asButtonClass = button? `bg-white inline-block text-primary-600 hover:bg-primary-50/80
  hover:shadow-md focus:bg-primary-50/80 focus:shadow-lg ring-2 ring-primary-500
  py-3 px-5 font-bold rounded-full !outline-none transition` : '';
  // Use React router Link for internal links, and <a> for others
  if (internal) {
    return (
      <ReactRouterLink to={to} className={`${asButtonClass} ${className}`} {...other}>
        {children}
      </ReactRouterLink>
    );
  }
  return (
    <a
      href={to.toString()}
      rel="nofollow noreferrer noopener"
      className={`${asButtonClass} ${className}`}
      {...other}
    >
      {children}
    </a>
  );
}
