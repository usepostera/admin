import React, { useCallback } from "react";
import SimpleAnimatedComponent from "../../SimpleAnimatedComponent";
import { baseURL } from "../../../lib/axiosInstance";
import { PickupRequestInput, TRecyclable } from "../../../@types";
import { recyclableUnitDescriptionMapping } from "../../../lib/constants";
import { UseFormType } from "../../../hooks/useForm";
import { capitalize } from "../../../lib/helpers";
import { useUserAddress } from "../../../hooks/useUserAddress";
import Button from "../../Button";
import { usePickupService } from "../../../services/pickup";
import { useRequestHandler } from "../../../hooks/useRequestHandler";
import toast from "react-hot-toast";

type Props = {
  recyclable: TRecyclable;
  form: UseFormType<PickupRequestInput>;
  restart: VoidFunction;
  onComplete: VoidFunction;
};

export const Review: React.FC<Props> = (props) => {
  const { getAddressById } = useUserAddress();

  const {
    recyclable: { image, name, unit, _id },
    form: { form, validate },
    restart,
    onComplete,
  } = props;

  const { requestNewPickup } = usePickupService();
  const { trigger, loading } = useRequestHandler(requestNewPickup);

  const handleSubmit = useCallback(async () => {
    if (validate()) {
      const result = await trigger({ ...form, recyclable: _id });
      if (result) {
        toast.success("Pickup request submitted!");
        onComplete();
      }
    }
  }, [_id, form, onComplete, trigger, validate]);

  return (
    <SimpleAnimatedComponent className="w-full">
      <div className="w-full flex flex-col gap-6">
        <h3 className="text-[20px] leading-[24.38px] font-semibold">
          Review request
        </h3>

        <div>
          <div className="border-[1px] border-[#0000004D] rounded-[12px] py-[8px] px-[12px] flex flex-col gap-[12px]">
            <img
              src={`${baseURL}/${image}`}
              alt=""
              className="h-[190px] w-full object-cover rounded-md"
            />

            <div className="flex flex-col gap-[8px]">
              <h4 className="text-[16px] leading-[24px] font-semibold">
                {name}
              </h4>

              <div className="flex flex-row justify-between text-[14px] leading-[24px]">
                <p className="font-light">
                  {capitalize(recyclableUnitDescriptionMapping[unit])}
                </p>

                <p>
                  {form.size} {unit}
                </p>
              </div>

              <div className="flex flex-row justify-between text-[14px] leading-[24px]">
                <p className="font-light">Address</p>

                <p>{getAddressById(form.addressId)?.address ?? "-"}</p>
              </div>
            </div>
          </div>

          <p className="mt-2">
            Note: Pickup dates would be updated in less than 24 hours after
            request submission.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Button.Contained
            label="Submit"
            type="button"
            onClick={handleSubmit}
            loading={loading}
          />

          <Button.Text label="Edit details" type="button" onClick={restart} />
        </div>
      </div>
    </SimpleAnimatedComponent>
  );
};
