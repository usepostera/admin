import React, { useEffect, useState } from "react";
import { PickupRequestInput, TRecyclable, Validator } from "../../@types";
import { useForm } from "../../hooks/useForm";
import {
  emptyValidator,
  FormFieldValidator,
} from "../../lib/FormFieldValidator";
import { ChooseAddress, Review, SelectSize } from "./Steps";

type Props = {
  recyclable: TRecyclable;
  onClose: VoidFunction;
};

const initialData: PickupRequestInput = {
  size: "",
  addressId: "",
};

const validators: Validator<PickupRequestInput> = {
  size: new FormFieldValidator({
    rule: "min",
    min: 1,
    message: "Minimum allowed size is 1",
  }),
  addressId: emptyValidator("Please select address"),
};

enum PickupStep {
  EnterSize,
  ChooseAddress,
  Review,
}

const PickupRequest: React.FC<Props> = (props) => {
  const [step, setStep] = useState(PickupStep.EnterSize);
  const { recyclable, onClose } = props;

  const form = useForm<PickupRequestInput>(initialData, validators);

  const { reset } = form;

  useEffect(() => {
    return () => {
      reset();
      setStep(PickupStep.EnterSize);
    };
  }, [reset]);

  return (
    <div className="transition-all duration-300">
      {step === PickupStep.EnterSize && (
        <SelectSize
          form={form}
          next={() => setStep(PickupStep.ChooseAddress)}
          unit={recyclable.unit}
        />
      )}

      {step === PickupStep.ChooseAddress && (
        <ChooseAddress form={form} next={() => setStep(PickupStep.Review)} />
      )}

      {step === PickupStep.Review && (
        <Review
          recyclable={recyclable}
          form={form}
          restart={() => setStep(PickupStep.EnterSize)}
          onComplete={onClose}
        />
      )}
    </div>
  );
};

export default PickupRequest;
