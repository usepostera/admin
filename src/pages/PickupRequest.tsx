import withAuthRedirect from "../hoc/withAuthRedirect";
import SimpleAnimatedComponent from "../components/SimpleAnimatedComponent";
import { PickupTable } from "../components/PickupTable";
import Inputs from "../components/Input";
import SearchIcon from "../assets/svgs/search_icon.svg";
import Button from "../components/Button";
import DownloadIcon from "../assets/svgs/document-download.svg";

const PickupRequest: React.FC = () => {
  return (
    <div className="font-montserrat p-4 md:p-8 space-y-8">
      <SimpleAnimatedComponent>
        {/** Header */}
        <div className="flex flex-row justify-between items-center w-full gap-8">
          <div className="flex-1 flex flex-row items-center gap-2">
            <div className="flex-1 max-w-[437px]">
              <Inputs.Text
                placeholder="Search requests by id, location, material type"
                className="!rounded-[40px] h-[40px] pl-4 !border-[#0000004D] w-full"
                prefixIcon={<SearchIcon />}
              />
            </div>

            <div>
              <Button.Contained label="Search" />
            </div>
          </div>

          <div>
            <Button.Outlined label="Download" prefixIcon={<DownloadIcon />} />
          </div>
        </div>
      </SimpleAnimatedComponent>

      <PickupTable />
    </div>
  );
};

const PickupRequestPage = withAuthRedirect(PickupRequest);
export default PickupRequestPage;
