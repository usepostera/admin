import React from "react";

type Props = {
  isSelected?: boolean;
  onSelect?: () => void;
};

const Checkbox: React.FC<Props> = (props) => {
  const { isSelected = false, onSelect } = props;

  return (
    <label
      className={`transition-all inline-flex items-center rounded-full ${
        isSelected ? "p-[6px] custom-gradient-border" : "p-0"
      }`}
    >
      <input
        type="checkbox"
        className="hidden peer"
        title="checkbox"
        checked={isSelected}
        readOnly={!onSelect}
      />
      <span className="transition-all w-[20px] h-[20px] inline-block bg-white border border-black rounded-full cursor-pointer peer-checked:border-none peer-checked:h-[10px] peer-checked:w-[10px]"></span>
    </label>
  );
};

export default Checkbox;
