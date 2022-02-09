import React from "react";
import Navbar from "./Navbar";
import PrimaryFooter from "./PrimaryFooter";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{props.children}</div>
      <PrimaryFooter />
    </>
  );
}
