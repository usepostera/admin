import { PickupRequestStatus } from "../@types";
import Inputs from "../components/Input";
import { PickupDetails } from "../components/PickupDetails";
import withAuthRedirect from "../hoc/withAuthRedirect";
import { useParams } from "react-router-dom";
import { usePickupRequets } from "../hooks/usePickupRequets";
import Loader from "../components/Loader";
import Button from "../components/Button";
import SimpleAnimatedComponent from "../components/SimpleAnimatedComponent";
import { FormEvent, useCallback, useState } from "react";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { usePickupService } from "../services/pickup";
import { recyclableUnitDescriptionMapping } from "../lib/constants";
import toast from "react-hot-toast";

const PickupRequestDetail: React.FC = () => {
  const { id } = useParams();

  const { pickup, loadingPickup, reloadPickup } = usePickupRequets(id);
  const [date, setDate] = useState("");
  const [size, setSize] = useState("");

  const { acceptPickup, requestCompletePickup, closePickup } =
    usePickupService();

  const { trigger, loading: accepting } = useRequestHandler(acceptPickup);
  const httpAcceptPickup = useCallback(async () => {
    if (!id || !date) return;
    const result = await trigger(id, date);

    if (result) {
      reloadPickup(result);
    }
  }, [date, id, reloadPickup, trigger]);

  const {
    trigger: triggerRequestComplete,
    loading: submittingCompleteRequest,
  } = useRequestHandler(requestCompletePickup);

  const httpRequestCompletePickup = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (isNaN(Number(size)) || !id) {
        return;
      }
      const result = await triggerRequestComplete(id, Number(size));
      if (result) {
        reloadPickup(result);
        toast.success("Request sent to user");
        setSize("");
      }
    },
    [size, id, triggerRequestComplete, reloadPickup]
  );

  const { trigger: triggerClose, loading: closing } =
    useRequestHandler(closePickup);

  const handleClosePickup = useCallback(async () => {
    if (!id) return;
    const result = await triggerClose(id);
    if (result) {
      toast.success(result.message);
      reloadPickup(result.data);
    }
  }, [id, reloadPickup, triggerClose]);

  if (loadingPickup) {
    return <Loader size={30} />;
  }

  return (
    <div className="font-montserrat p-4 md:!p-8 flex flex-row gap-8">
      <div className="flex-1">
        <p className="text-[18px] leading-[24px] mb-2">Pickups details</p>
        {id && <PickupDetails pickup={pickup} />}

        {pickup?.status === PickupRequestStatus.processing && (
          <SimpleAnimatedComponent className="md:max-w-[388px] delay-300 my-4">
            <Button.Contained
              label="Mark as Complete"
              type="button"
              onClick={handleClosePickup}
              loading={closing}
            />
          </SimpleAnimatedComponent>
        )}
      </div>

      <div className="flex-1">
        <div className="max-w-[380px]">
          {pickup?.status === PickupRequestStatus.pending && (
            <SimpleAnimatedComponent className="space-y-4">
              <Inputs.TextV2
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <Button.Contained
                label="Accept"
                onClick={httpAcceptPickup}
                disabled={!date}
                loading={accepting}
              />
            </SimpleAnimatedComponent>
          )}

          {pickup?.status === PickupRequestStatus.accepted && (
            <SimpleAnimatedComponent>
              <form className="space-y-4" onSubmit={httpRequestCompletePickup}>
                <Inputs.TextV2
                  label={`Measured ${
                    recyclableUnitDescriptionMapping[pickup.item.unit]
                  }`}
                  type="number"
                  value={size}
                  placeholder="10Kg"
                  onChange={(e) => setSize(e.target.value)}
                  required
                  min={1}
                  suffixIcon={
                    <div className="text-gray-500 font-medium">
                      {pickup.item.unit}
                    </div>
                  }
                />

                <Button.Contained
                  label="Confirm pickup"
                  type="submit"
                  loading={submittingCompleteRequest}
                />
              </form>
            </SimpleAnimatedComponent>
          )}
        </div>
      </div>
    </div>
  );
};

const PickupRequestDetailPage = withAuthRedirect(PickupRequestDetail);
export default PickupRequestDetailPage;
