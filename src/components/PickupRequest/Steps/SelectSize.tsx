import React, { FormEvent, useCallback } from "react";
import { PickupRequestInput, RecyclableUnit } from "../../../@types";
import { recyclableUnitDescriptionMapping } from "../../../lib/constants";
import Inputs from "../../Input";
import { UseFormType } from "../../../hooks/useForm";
import Button from "../../Button";
import SimpleAnimatedComponent from "../../SimpleAnimatedComponent";

type Props = {
  unit: RecyclableUnit;
  form: UseFormType<PickupRequestInput>;
  next: () => void;
};

export const SelectSize: React.FC<Props> = (props) => {
  const { unit, form: topLevelForm, next } = props;

  const { form, formErrors, onChange, validate } = topLevelForm;

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      console.log("handleSubmit");

      if (validate(["size"])) {
        next();
      }
    },
    [next, validate]
  );

  return (
    <SimpleAnimatedComponent>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <h3 className="text-[20px] leading-[24.38px] font-semibold">
          Input {recyclableUnitDescriptionMapping[unit]}
        </h3>

        <Inputs.TextV2
          label={`Estimated ${recyclableUnitDescriptionMapping[unit]}`}
          type="number"
          value={form.size}
          placeholder="10Kg"
          onChange={onChange("size")}
          error={formErrors.size}
          suffixIcon={<div className="text-gray-500 font-medium">{unit}</div>}
        />

        <div className="mt-8">
          <Button.Contained label="Continue" type="submit" />
        </div>
      </form>
    </SimpleAnimatedComponent>
  );
};
