import React from "react";
import Navbar from "./Navbar";
import PrimaryFooter from "./PrimaryFooter";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-primary-800 bg-gradient-to-r from-primary-800 to-primary-700 p-1 text-lg
        font-black text-center text-white">
        Auction Ends 00:00:00
      </div>
      <Navbar />
      <div className="min-h-screen">{props.children}</div>
      <PrimaryFooter />
    </>
  );
}
