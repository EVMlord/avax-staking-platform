import React from "react";
import Layout from "components/Layout";
import Link from "components/Link";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen w-full px-4 bg-white">
        <div className="flex flex-col justify-center items-center max-w-md text-center">
          <div className="font-bold text-7xl">404</div>
          Hmm, we could not find the page you were searching for, but we can
          take you to a page that exists.
          <Link to="/" button className="my-5">Back to Home</Link>
        </div>
      </div>
    </Layout>
  );
}
