import React, { useEffect, useState } from "react";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";
import { useVolunteerService } from "../services/volunteer";
import { TVolunteerEvent } from "../@types";
import { useRequestHandler } from "../hooks/useRequestHandler";
import Loader from "./Loader";
import { baseURL } from "../lib/axiosInstance";
import CustomAvatar from "./CustomAvatar";

type Props = {
  id: string;
};

const VolunteerEventDetail: React.FC<Props> = (props) => {
  const { id } = props;
  const [event, setEvent] = useState<TVolunteerEvent | null>();
  const { getEvent } = useVolunteerService();
  const { trigger, loading } = useRequestHandler(getEvent);

  useEffect(() => {
    const run = async () => {
      const result = await trigger(id);
      if (result) {
        setEvent(result);
      }
    };

    if (id) {
      run();
    }
  }, [id, trigger]);

  if (loading || !event) {
    return <Loader size={20} />;
  }

  return (
    <div className="md:max-w-[400px] font-montserrat">
      <SimpleAnimatedComponent>
        <div className="w-full">
          <img
            src={`${baseURL}/${event.image}`}
            alt=""
            className="h-[224px] object-cover rounded-[12px] mb-4"
          />

          <h4 className="text-[20px] leading-[22px] font-medium mb-1">
            {event.title}
          </h4>

          <div className="flex flex-row text-[16px] font-light leading-[22px]">
            <p className="mr-2">By</p>

            <div className="mr-1">
              <CustomAvatar radius={10} />
            </div>

            <p className="font-normal mr-2">{event.user.name}</p>

            <p className="text-[14px]">Created 5 days ago</p>
          </div>
        </div>
      </SimpleAnimatedComponent>
    </div>
  );
};

export default VolunteerEventDetail;
