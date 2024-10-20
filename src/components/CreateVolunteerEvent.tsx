import React, { FormEvent, useCallback, useEffect, useState } from "react";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";
import Inputs from "./Input";
import { VolunteerInput, Validator, TVolunteerEvent } from "../@types";

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
import Loader from "./Loader";

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
  id?: string;
};

const CreateVolunteerEvent: React.FC<Props> = (props) => {
  const { onComplete, id } = props;

  const [event, setEvent] = useState<TVolunteerEvent | null>();
  const { getEvent } = useVolunteerService();
  const { trigger: triggerGetEvent, loading: loadingEvent } =
    useRequestHandler(getEvent);

  useEffect(() => {
    const run = async (eventId: string) => {
      const result = await triggerGetEvent(eventId);
      if (result) {
        setEvent(result);
      }
    };

    if (id) {
      run(id);
    }
  }, [id, triggerGetEvent]);

  const { form, formErrors, reset, onChange, onChangeText, validate } =
    useForm<VolunteerInput>(initialData, validators);

  const { createEvent, updateEvent } = useVolunteerService();
  const { trigger, loading } = useRequestHandler(createEvent);
  const { trigger: triggerUpdate, loading: updating } =
    useRequestHandler(updateEvent);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (validate()) {
        let result;

        if (id) {
          result = await triggerUpdate(form, id);
        } else {
          result = await trigger(form);
        }

        if (result) {
          if (onComplete) {
            onComplete();
            toast.success("Created event successfully!");
          }
        }
      }
    },
    [form, id, onComplete, trigger, triggerUpdate, validate]
  );

  useEffect(() => {
    return reset;
  }, [reset]);

  useEffect(() => {
    if (event) {
      Object.entries(event).forEach(([key, value]) => {
        if (typeof value !== "object") {
          if (typeof value === "string" || typeof value === "number") {
            if (key === "date") {
              onChangeText("date")(value.toString().split("T")[0]);
            } else if (key === "limit" && value === 0) {
              onChangeText("limit")("");
            } else {
              onChangeText(key as keyof VolunteerInput)(value);
            }
          }
        } else if (!Array.isArray(value) && key === "user") {
          onChangeText("contact_name")(value.name);
          onChangeText("contact_email")(value.email);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  if (loadingEvent) {
    return <Loader size={20} />;
  }

  return (
    <SimpleAnimatedComponent>
      <form
        className="flex flex-col items-start gap-6 font-montserrat md:max-w-[380px]"
        onSubmit={handleSubmit}
      >
        <h3 className="text-[20px] leading-[24.38px] font-semibold">
          {event ? "Update event" : "Add new event"}
        </h3>

        <div className="w-full space-y-4">
          <Inputs.TextV2
            label="Event name"
            placeholder="Base Africa Earth Day"
            value={form.title}
            onChange={onChange("title")}
            error={formErrors.title}
            readOnly={loading || updating}
          />

          <div className="flex flex-col gap-4 md:!flex-row w-full">
            <div className="flex-1">
              <Inputs.TextV2
                label="Address Line 1"
                placeholder="44, Commercial Ave."
                value={form.address_line1}
                onChange={onChange("address_line1")}
                error={formErrors.address_line1}
                readOnly={loading || updating}
              />
            </div>

            <div className="flex-1">
              <Inputs.TextV2
                label="City"
                placeholder="Ikoyi"
                value={form.city}
                onChange={onChange("city")}
                error={formErrors.city}
                readOnly={loading || updating}
              />
            </div>
          </div>

          <Inputs.TextV2
            label="State"
            placeholder="Lagos"
            value={form.state}
            onChange={onChange("state")}
            error={formErrors.state}
            readOnly={loading || updating}
          />

          <Inputs.TextV2
            label="Map link (Optional)"
            placeholder="https://maps.app.goo.gl/6XyYEB42cUKaPH8h9"
            value={form.mapLink}
            onChange={onChange("mapLink")}
            error={formErrors.mapLink}
            readOnly={loading || updating}
          />

          <Inputs.TextV2
            label="Organizer"
            placeholder="Blockchain Club Unilag"
            value={form.organizer}
            onChange={onChange("organizer")}
            error={formErrors.organizer}
            readOnly={loading || updating}
          />

          <Inputs.TextV2
            label="Date"
            type="date"
            value={form.date}
            onChange={onChange("date")}
            error={formErrors.date}
            readOnly={loading || updating}
          />

          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <Inputs.TextV2
                label="Start time"
                type="time"
                value={form.startTime}
                onChange={onChange("startTime")}
                error={formErrors.startTime}
                readOnly={loading || updating}
              />
            </div>

            <div className="flex-1">
              <Inputs.TextV2
                label="End time"
                type="time"
                value={form.endTime}
                onChange={onChange("endTime")}
                error={formErrors.endTime}
                readOnly={loading || updating}
              />
            </div>
          </div>

          <Inputs.Image
            label="Upload event image"
            image={form.image}
            onSelectImage={onChangeText("image")}
            error={formErrors.image}
            readOnly={loading || updating}
          />

          <Inputs.TextV2
            label="Participant limit (Optional)"
            placeholder="100"
            type="number"
            value={form.limit}
            onChange={onChange("limit")}
            error={formErrors.limit}
            readOnly={loading || updating}
          />

          <h3 className="font-medium text-black text-[16px] leading-[22px]">
            Contact details
          </h3>

          <Inputs.TextV2
            label="Full name"
            value={form.contact_name}
            onChange={onChange("contact_name")}
            error={formErrors.contact_name}
            readOnly={loading || updating}
          />

          <Inputs.TextV2
            label="Email"
            value={form.contact_email}
            onChange={onChange("contact_email")}
            error={formErrors.contact_email}
            readOnly={loading || updating}
          />
        </div>

        <Button.Contained
          label="Save"
          type="submit"
          loading={loading || updating}
        />

        <Button.Outlined
          label="Cancel"
          type="button"
          onClick={onComplete ? () => onComplete() : undefined}
          disabled={loading || updating}
        />
      </form>
    </SimpleAnimatedComponent>
  );
};

export default CreateVolunteerEvent;
