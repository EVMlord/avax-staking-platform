import React from "react";
import Layout from "components/Layout";
import SEO from "components/SEO";
import CopyToClipboard from "components/widgets/CopyToClipboard";

export default function Referrals() {
  return (
    <Layout>
      <SEO
        slug="/stake"
        title="Refer friends and earn even more"
        pageDescription="Your referrals will earn an extra 5% minted ASP tokens on their Auction
            Lobby Purchase. As a referrer you will earn an extra 10%. There are no limits on number
            nor the amount of referrals that you can get."
      />
      <div className="px-4 py-20 max-w-3xl mx-auto text-center">
        <h1>Refer and Earn More</h1>
        <p>
          Your referrals will earn an extra 5% minted ASP tokens on their
          Auction Lobby Purchase. As a referrer you will earn an extra 10%.
          There are no limits on number nor the amount of referrals that you can
          get.
        </p>
        <div className="mt-12">
            <div className="text-2xl text-gray-600 my-4">Copy your referral link</div>
            <div><CopyToClipboard content="https://asp.com/?ref=w2Fg46chi" /></div>
        </div>
      </div>
    </Layout>
  );
}
