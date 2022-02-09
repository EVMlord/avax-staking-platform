import React from "react";
import { Token } from "config/entities/token";
import tokens from "config/constants/tokens";

interface TokenPairImageProps {
  primaryToken: Token;
  secondaryToken: Token;
}

const getImageUrlFromToken = (token: Token) => {
  const address = token.symbol === "BNB" ? tokens.wbnb.address : token.address;
  return `/stake/images/tokens/${address}.svg`;
};

export default function TokenPairImage({
  primaryToken,
  secondaryToken,
}: TokenPairImageProps) {
  return (
      <div className="relative inline-block h-[70px] w-[70px] mr-2">
        <div className="w-8 h-8 inline-block absolute top-0 left-0 rounded-full">
          <TokenImage
            src={getImageUrlFromToken(secondaryToken)}
            alt={primaryToken.name || ""}
            className="w-full h-full"
          />
        </div>
        <div className="w-14 h-14 inline-block absolute bottom-0 right-0 rounded-full">
          <TokenImage
            src={getImageUrlFromToken(primaryToken)}
            alt={primaryToken.name || ""}
            className="w-full h-full"
          />
        </div>
    </div>
  );
}

export const TokenImage = (
  {alt, ...props}: React.ImgHTMLAttributes<HTMLImageElement>
) => {
  return <img alt={alt} {...props} />;
};
