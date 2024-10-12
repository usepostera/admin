import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { UseFormType } from "../../../hooks/useForm";
import { PickupRequestInput } from "../../../@types";
import SimpleAnimatedComponent from "../../SimpleAnimatedComponent";
import Button from "../../Button";
import AddressList from "../../AddressList";
import CreateAddress from "../../CreateAddress";

type Props = {
  form: UseFormType<PickupRequestInput>;
  next: () => void;
};

export const ChooseAddress: React.FC<Props> = (props) => {
  const { form: topLevelForm, next } = props;
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { validate } = topLevelForm;

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (validate(["addressId"])) {
        next();
      }
    },
    [next, validate]
  );

  const reset = () => {
    setIsCreateOpen(false);
  };

  useEffect(() => {
    return reset;
  }, []);

  if (isCreateOpen) {
    return <CreateAddress onComplete={() => setIsCreateOpen(false)} />;
  }

  return (
    <SimpleAnimatedComponent>
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
        <h3 className="text-[20px] leading-[24.38px] font-semibold">
          Choose address
        </h3>

        <div className="w-full flex flex-col items-start">
          <AddressList
            selected={topLevelForm.form.addressId}
            onSelect={topLevelForm.onChangeText("addressId")}
          />

          <div className="mt-2">
            <Button.Text
              label="Add Another Address +"
              onClick={() => setIsCreateOpen(true)}
            />
          </div>
        </div>

        <div className="mt-8">
          <Button.Contained
            label="Confirm address"
            type="submit"
            disabled={!topLevelForm.form.addressId}
          />
        </div>
      </form>
    </SimpleAnimatedComponent>
  );
};
