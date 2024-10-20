import React, { FormEvent, useCallback } from "react";
import { AppBottomSheetWrapper } from "./AppBottomSheet";
import Button from "./Button";

type Props = {
  isOpen: boolean;
  message: string;
  onSubmit: (shouldContinue: boolean) => void;
  loading?: boolean;
};

const ConfirmDelete: React.FC<Props> = (props) => {
  const { message, onSubmit, isOpen, loading = false } = props;

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (loading) {
        return;
      }

      onSubmit(true);
    },
    [loading, onSubmit]
  );

  return (
    <AppBottomSheetWrapper isOpen={isOpen} onClose={() => onSubmit(false)}>
      <form
        className="flex flex-col items-start font-montserrat md:max-w-[380px] mx-auto gap-2"
        onSubmit={handleSubmit}
      >
        <h3 className="self-start font-medium text-[20px] leading-[24px] mb-4">
          Confirm Delete
        </h3>

        <p className="text-[16px] leading-[20px] mb-2">{message}</p>

        <div className="ml-auto flex flex-row-reverse gap-4">
          <div className="w-fit">
            <Button.Contained
              label="Continue"
              type="submit"
              loading={loading}
            />
          </div>

          <div className="w-fit">
            <Button.Outlined
              label="Cancel"
              type="button"
              onClick={() => onSubmit(false)}
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </AppBottomSheetWrapper>
  );
};

export default ConfirmDelete;
