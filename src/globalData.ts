export const links = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Stake",
    to: "/stake",
  },
  {
    name: "Auction",
    to: "/auction",
  },
  {
    name: "Referrals",
    to: "/referrals",
  },
  {
    name: "Contract",
    to: "/contract",
  },
];


export const questionsAndAnswers = [
  {
    question: "What is staking?",
    answer: `You can stake your GXY tokens for a fixed number of days to earn interest on them.
      Make sure to stake more than 5 days to be eligible for bonus days rewards.At the end of
      every day the daily stake pool of GXY tokens will be calculated and allocated proportionally
      between all the open stakes. The allocated GXY tokens and TRX will be available for users to
      withdraw when the stake ends.`,
  },
  {
    question: "How is stake pool calculated?",
    answer: `[GXY supply * 50000 / 5.42% inflation per year ], this daily pool will be distributed
      between all the Stakers as their stake interest.`,
  },
  {
    question: "Bonus for staking?",
    answer: `You get a bonus reward for your stake, based on the amount and time that you are staking.`,
  },
  {
    question: "What is a reward day?",
    answer: `Every stake will get a bonus day every 5 days, stakes get 2X interest on bonus days.
      Example: creating a stake on day 4 for 15 days gives this stake 3 bonus days on days 10,15,
      and 20.`,
  },
  {
    question: "What if I end my stake early?",
    answer: `You will get a penalty equal to the profit of half the days you committed to.`,
  },
  {
    question: "Do I get TRON dividends for staking?",
    answer: `Yes! One of the benefits of Staking GXY is TRON dividends.
      At the end of each day a TRON dividends pool will be calculated and allocated to all the open
      stakes based on their stake amount. The dividends pool comes from the daily auction lobby total
      entry amount.`,
  },
  {
    question: "How is dividends pool calculated?",
    answer: `97% of all TRX that enters the daily Auction Lobby is pooled and distributed back out to Stakers.`,
  },
  {
    question: "When will I recieve my TRON dividends?",
    answer: `You will receive your TRX dividends after you exit your stake position.`,
  },
];