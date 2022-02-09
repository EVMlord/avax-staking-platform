import React from "react";
import Layout from "components/Layout";
import SEO from "components/SEO";
import StakingTable from "components/Tables/StakingTable";
import FaqAccordion from "components/widgets/Accordion/FaqAccordion";
import { auctionFaqs } from "globalData";

export default function Auction() {
  return (
    <Layout>
      <SEO
        slug="/auction"
        title="Stake to earn more"
        pageDescription="Stake your ASP tokens within the Staking Portal and earn daily interest.
            Additionally, Stakers are rewarded AVAX tokens from the daily Lobbies based off the
            percentage of total tokens beign staked."
      />
      <div className="px-4 pt-20 max-w-screen-2xl mx-auto">
        <div className="max-w-4xl px-8 mx-auto mb-16">
          <h1>Daily Auction Lobby!</h1>
          <p>
            Notes...
          </p>
        </div>
        <div className="my-8">
          <h3 className="text-center">Auctions</h3>
          <div className="flex flex-col items-center md:flex-row-reverse md:items-start gap-4">
            <StakingTable />
            <div className="max-w-xs p-2 md:bg-gray-50">
              <h3 className="text-center">Page FAQ</h3>
              <FaqAccordion faqs={auctionFaqs} expandedUuids={["what_are_auction_lobbies"]} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
