import React from "react";
import SimpleAnimatedComponent from "../SimpleAnimatedComponent";

const Leaderboard: React.FC = () => {
  return (
    <SimpleAnimatedComponent>
      <div className="flex flex-col gap-6">
        <h3 className="text-[20px] leading-[24.38px] font-semibold">
          Leaderboard
        </h3>
      </div>
    </SimpleAnimatedComponent>
  );
};

export default Leaderboard;
