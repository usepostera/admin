import { useNavigate } from "react-router-dom";
import RippleEffect from "./Ripple";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";
import { FaLongArrowAltLeft } from "react-icons/fa";

const GoBack = () => {
  const navigate = useNavigate();

  return (
    <SimpleAnimatedComponent>
      <RippleEffect className="mb-2 w-fit" onClick={() => navigate(-1)}>
        <div className="flex flex-row items-center gap-2 text-[12px]">
          <FaLongArrowAltLeft /> <span>Go back</span>
        </div>
      </RippleEffect>
    </SimpleAnimatedComponent>
  );
};

export default GoBack;
