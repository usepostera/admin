import React from "react";
import defaultAvatar from "../assets/pngs/default-avatar.png";

type Props = {
  radius: number;
  image?: string;
};

const CustomAvatar: React.FC<Props> = (props) => {
  const { radius, image } = props;

  return (
    <img
      src={image ?? defaultAvatar}
      alt=""
      className="rounded-full object-cover"
      style={{ height: radius * 2, width: radius * 2 }}
    />
  );
};

export default CustomAvatar;
