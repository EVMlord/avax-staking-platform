import React from "react";
import Layout from "components/Layout";
import SEO from "components/SEO";
import StakingTable from "components/Tables/StakingTable";
import FaqAccordion from "components/widgets/Accordion/FaqAccordion";
import { auctionFaqs } from "globalData";
import StakeForm from "components/Forms/StakeForm";

export default function Auction() {
  return (
    <Layout>
      <SEO
        slug="/auctions"
        title="Stake to earn more"
        pageDescription="Stake your AVAX tokens within the Auction Portal and earn daily interest.
            Additionally, Stakers are rewarded ASP tokens from the daily Lobbies based off the
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
          <div className="flex flex-col items-center lg:flex-row-reverse md:items-start gap-4">
            <div className="w-full overflow-x-auto">
              <h3 className="text-center text-gray-600">Auctions</h3>
              <StakingTable />
              <StakeForm className=" mt-8 shadow-md px-4 mx-auto lg:mx-0" />
            </div>
            <div className="max-w-sm lg:max-w-xs p-2 mx-auto">
              <h3 className="text-center text-gray-600">Auction FAQ</h3>
              <FaqAccordion
                faqs={auctionFaqs}
                expandedUuids={["what_is_staking"]}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
