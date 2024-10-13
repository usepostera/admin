import React from "react";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";
import { TVolunteerEvent } from "../@types";
import RippleEffect from "./Ripple";
import { InfiniteScroll } from "./InfiniteScroll";
import { TuseVolunteerEvents } from "../hooks/useVolunteerEvents";
import Button from "./Button";
import { baseURL } from "../lib/axiosInstance";

import LocationIcon from "../assets/svgs/location.svg";
import TimerIcon from "../assets/svgs/timer.svg";

type Props = {
  data: TuseVolunteerEvents;
  selected?: string;
  onSelect?: (id: string) => void;
};

const VolunteerEventList: React.FC<Props> = (props) => {
  const { onSelect, selected } = props;

  const { events: data, hasMore, loading, loadMore, reload } = props.data;

  return (
    <SimpleAnimatedComponent className="w-full">
      <div className="w-full flex flex-col items-start">
        {!selected && (
          <div className="my-2">
            <Button.Text label="Refresh" onClick={reload} disabled={loading} />
          </div>
        )}

        {!loading && data.length === 0 && (
          <p className="font-montserrat fomt-medium text-xl">No event found.</p>
        )}

        <InfiniteScroll
          items={data}
          hasMore={hasMore}
          isFetching={loading}
          loadMore={loadMore}
          renderItem={(event) => (
            <EventTile
              data={event}
              key={event._id}
              onSelect={onSelect ? () => onSelect(event._id) : undefined}
              isSelected={selected === event._id}
            />
          )}
        />
      </div>
    </SimpleAnimatedComponent>
  );
};

export default VolunteerEventList;

type VolunteerEventTileProps = {
  data: TVolunteerEvent;
  isSelected?: boolean;
  onSelect?: VoidFunction;
};

const EventTile: React.FC<VolunteerEventTileProps> = (props) => {
  const { data, isSelected = false, onSelect } = props;

  const { image, title, city, state, date } = data;

  return (
    <SimpleAnimatedComponent className="w-full !delay-300">
      <RippleEffect
        className={`w-full transition-color font-montserrat p-2 rounded-[12px] border-[1px] flex flex-row gap-4 items-center ${
          isSelected ? "border-[#228B22]" : "border-[#0000004D]"
        }`}
        onClick={onSelect}
      >
        <img
          src={`${baseURL}/${image}`}
          alt={title}
          className="h-[74px] w-[120px] object-cover rounded-[4px]"
        />

        <div className="space-y-4">
          <p className="font-medium text-[16px] leading-[22px]">{title}</p>

          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 text-[#000000] text-[14px] leading-[22px] font-light items-center">
              <LocationIcon />

              <p>
                {city}, {state}
              </p>
            </div>

            <div className="flex flex-row gap-1 text-[#000000] text-[14px] leading-[22px] font-light items-center">
              <TimerIcon />

              <p>{new Date(date).toDateString()}</p>
            </div>
          </div>
        </div>
      </RippleEffect>
    </SimpleAnimatedComponent>
  );
};
