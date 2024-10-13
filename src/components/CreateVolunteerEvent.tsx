import React, { FormEvent, useCallback, useEffect } from "react";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";
import Inputs from "./Input";
import { VolunteerInput, Validator } from "../@types";

import { useForm } from "../hooks/useForm";
import {
  emailValidator,
  emptyValidator,
  FormFieldValidator,
} from "../lib/FormFieldValidator";
import Button from "./Button";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { useVolunteerService } from "../services/volunteer";
import toast from "react-hot-toast";

const initialData: VolunteerInput = {
  address_line1: "",
  city: "",
  contact_email: "",
  contact_name: "",
  date: "",
  endTime: "",
  organizer: "",
  startTime: "",
  state: "",
  title: "",
  contact_image: "",
  contact_phone: "",
  limit: "",
  mapLink: "",
  image: null,
};

const validators: Validator<VolunteerInput> = {
  address_line1: emptyValidator("Please enter street address"),
  city: emptyValidator("Please enter city"),
  contact_email: emailValidator(),
  contact_name: new FormFieldValidator({
    rule: "match",
    regex: /^[A-Za-z]+(?:[\s'-][A-Za-z]+)*$/,
    message: "Invalid name (Ex. Pelumi Akinrele)",
  }),
  date: emptyValidator("Please select date"),
  startTime: emptyValidator("Please select start time"),
  endTime: emptyValidator("Please select end time"),
  state: emptyValidator("Please enter state"),
  limit: new FormFieldValidator(
    {
      rule: "min",
      min: 10,
      message: "Minimum applicable limit is 10",
    },
    true
  ),
  title: emptyValidator("Please enter event name"),
  organizer: emptyValidator(
    "Please enter organizer name (Ex. Postera Club Unilag)"
  ),
  image: emptyValidator("Please select an image for your event"),
  mapLink: new FormFieldValidator(
    {
      rule: "match",
      message: "Invalid url (Ex. https://maps.app.goo.gl/6XyYEB42cUKaPH8h9)",
      regex: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/,
    },
    true
  ),
};

type Props = {
  onComplete?: VoidFunction;
};

const CreateVolunteerEvent: React.FC<Props> = (props) => {
  const { onComplete } = props;

  const { form, formErrors, reset, onChange, onChangeText, validate } =
    useForm<VolunteerInput>(initialData, validators);

  const { createEvent } = useVolunteerService();
  const { trigger, loading } = useRequestHandler(createEvent);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (validate()) {
        const result = await trigger(form);
        if (result) {
          if (onComplete) {
            onComplete();
            toast.success("Created event successfully!");
          }
        }
      }
    },
    [form, onComplete, trigger, validate]
  );

  useEffect(() => {
    return reset;
  }, [reset]);

  return (
    <SimpleAnimatedComponent>
      <form
        className="flex flex-col items-start gap-6 font-montserrat md:max-w-[380px]"
        onSubmit={handleSubmit}
      >
        <h3 className="text-[20px] leading-[24.38px] font-semibold">
          Add new event
        </h3>

        <div className="w-full space-y-4">
          <Inputs.TextV2
            label="Event name"
            placeholder="Base Africa Earth Day"
            value={form.title}
            onChange={onChange("title")}
            error={formErrors.title}
            readOnly={loading}
          />

          <div className="flex flex-col gap-4 md:!flex-row w-full">
            <div className="flex-1">
              <Inputs.TextV2
                label="Address Line 1"
                placeholder="44, Commercial Ave."
                value={form.address_line1}
                onChange={onChange("address_line1")}
                error={formErrors.address_line1}
                readOnly={loading}
              />
            </div>

            <div className="flex-1">
              <Inputs.TextV2
                label="City"
                placeholder="Ikoyi"
                value={form.city}
                onChange={onChange("city")}
                error={formErrors.city}
                readOnly={loading}
              />
            </div>
          </div>

          <Inputs.TextV2
            label="State"
            placeholder="Lagos"
            value={form.state}
            onChange={onChange("state")}
            error={formErrors.state}
            readOnly={loading}
          />

          <Inputs.TextV2
            label="Map link (Optional)"
            placeholder="https://maps.app.goo.gl/6XyYEB42cUKaPH8h9"
            value={form.mapLink}
            onChange={onChange("mapLink")}
            error={formErrors.mapLink}
            readOnly={loading}
          />

          <Inputs.TextV2
            label="Organizer"
            placeholder="Blockchain Club Unilag"
            value={form.organizer}
            onChange={onChange("organizer")}
            error={formErrors.organizer}
            readOnly={loading}
          />

          <Inputs.TextV2
            label="Date"
            type="date"
            value={form.date}
            onChange={onChange("date")}
            error={formErrors.date}
            readOnly={loading}
          />

          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <Inputs.TextV2
                label="Start time"
                type="time"
                value={form.startTime}
                onChange={onChange("startTime")}
                error={formErrors.startTime}
                readOnly={loading}
              />
            </div>

            <div className="flex-1">
              <Inputs.TextV2
                label="End time"
                type="time"
                value={form.endTime}
                onChange={onChange("endTime")}
                error={formErrors.endTime}
                readOnly={loading}
              />
            </div>
          </div>

          <Inputs.Image
            label="Upload event image"
            image={form.image}
            onSelectImage={onChangeText("image")}
            error={formErrors.image}
            readOnly={loading}
          />

          <Inputs.TextV2
            label="Participant limit (Optional)"
            placeholder="100"
            type="number"
            value={form.limit}
            onChange={onChange("limit")}
            error={formErrors.limit}
            readOnly={loading}
          />

          <h3 className="font-medium text-black text-[16px] leading-[22px]">
            Contact details
          </h3>

          <Inputs.TextV2
            label="Full name"
            value={form.contact_name}
            onChange={onChange("contact_name")}
            error={formErrors.contact_name}
            readOnly={loading}
          />

          <Inputs.TextV2
            label="Email"
            value={form.contact_email}
            onChange={onChange("contact_email")}
            error={formErrors.contact_email}
            readOnly={loading}
          />
        </div>

        <Button.Contained label="Save" type="submit" loading={loading} />

        <Button.Outlined
          label="Cancel"
          type="button"
          onClick={onComplete ? () => onComplete() : undefined}
          disabled={loading}
        />
      </form>
    </SimpleAnimatedComponent>
  );
};

export default CreateVolunteerEvent;
