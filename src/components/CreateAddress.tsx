import React, { useCallback, useEffect } from "react";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";
import Inputs from "./Input";
import RippleEffect from "./Ripple";
import { AddressInput, UserAddressType, Validator } from "../@types";

import HomeIcon from "../assets/svgs/home_icon.svg";
import BriefcaseIcon from "../assets/svgs/briefcase.svg";
import Checkbox from "./Checkbox";
import { useForm } from "../hooks/useForm";
import { emptyValidator } from "../lib/FormFieldValidator";
import Button from "./Button";
import { useAddressService } from "../services/address";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { useAppDispatch } from "../store/store";
import { insertNewAddress } from "../store/addressSlice";

const initialData: AddressInput = {
  address: "",
  addressType: "",
};

const validators: Validator<AddressInput> = {
  address: emptyValidator("Address cannot be empty"),
  addressType: emptyValidator("Please select address label"),
};

type Props = {
  onComplete?: VoidFunction;
};

const CreateAddress: React.FC<Props> = (props) => {
  const { onComplete } = props;

  const dispatch = useAppDispatch();

  const { form, formErrors, reset, onChange, onChangeText, validate } =
    useForm<AddressInput>(initialData, validators);

  const { saveNewAddress } = useAddressService();
  const { trigger, loading } = useRequestHandler(saveNewAddress);

  const handleSubmit = useCallback(async () => {
    if (validate()) {
      const result = await trigger(form);
      if (result) {
        dispatch(insertNewAddress(result));
        if (onComplete) {
          onComplete();
        }
      }
    }
  }, [dispatch, form, onComplete, trigger, validate]);

  useEffect(() => {
    return reset;
  }, [reset]);

  return (
    <SimpleAnimatedComponent>
      <form className="flex flex-col items-start gap-6 font-montserrat">
        <h3 className="text-[20px] leading-[24.38px] font-semibold">
          Add new address
        </h3>

        <div className="w-full">
          <Inputs.TextV2
            label="Your address"
            placeholder="Block 8, flat 49..."
            multiple
            value={form.address}
            onChange={onChange("address")}
            error={formErrors.address}
            readOnly={loading}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <span className="text-[16px] leading-[22px]">Address label</span>

          <AddressLabel
            addressType={UserAddressType.Home}
            isSelected={form.addressType === UserAddressType.Home}
            onSelect={onChangeText("addressType")}
          />

          <AddressLabel
            addressType={UserAddressType.Work}
            isSelected={form.addressType === UserAddressType.Work}
            onSelect={onChangeText("addressType")}
          />

          {formErrors.addressType && (
            <span className="text-danger text-[12px] font-semibold leading-[15px] my-2">
              {formErrors.addressType}
            </span>
          )}

          <div className="mt-8">
            <Button.Contained
              label="Save"
              type="button"
              onClick={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </form>
    </SimpleAnimatedComponent>
  );
};

export default CreateAddress;

type AddressLabelProps = {
  isSelected: boolean;
  addressType: UserAddressType;
  onSelect: (val: UserAddressType) => void;
};

const AddressLabel: React.FC<AddressLabelProps> = (props) => {
  const { addressType, isSelected, onSelect } = props;

  const renderIcon = useCallback(() => {
    switch (addressType) {
      case UserAddressType.Home:
        return <HomeIcon height={24} width={24} color="#292D32" />;

      case UserAddressType.Work:
        return <BriefcaseIcon height={24} width={24} color="#292D32" />;
    }
  }, [addressType]);

  return (
    <RippleEffect
      className="w-full bg-white rounded-[8px] border-[1px] border-[#0000004D] p-4"
      onClick={() => onSelect(addressType)}
      skipDelay
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-[12px]">
          {renderIcon()} <span>{addressType}</span>
        </div>

        <Checkbox isSelected={isSelected} />
      </div>
    </RippleEffect>
  );
};
