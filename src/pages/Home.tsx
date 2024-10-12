/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useMemo } from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import SimpleAnimatedComponent from "../components/SimpleAnimatedComponent";
import Inputs from "../components/Input";
import SearchIcon from "../assets/svgs/search_icon.svg";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { useRecyclableService } from "../services/recyclable";
import {
  initializeRecyclables,
  selectRecyclableItem,
} from "../store/recyclableSlice";
import { RecyclableCard } from "../components/RecyclableCard";
import { TRecyclable } from "../@types";
import PickupRequest from "../components/PickupRequest";
import Leaderboard from "../components/Leaderboard";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const recyclables = useAppSelector((state) => state.recyclables.data);
  const selectedRecyclableId = useAppSelector(
    (state) => state.recyclables.selectedId
  );
  const isRecyclableInitialzed = useAppSelector(
    (state) => state.recyclables.isInitialzed
  );

  const selectedRecyclable = useMemo(
    () => recyclables.find((e) => e._id === selectedRecyclableId),
    [selectedRecyclableId, recyclables]
  );

  const { getRecyclables } = useRecyclableService();
  const { trigger, loading } = useRequestHandler(getRecyclables);

  const httpFetchRecyclables = useCallback(async () => {
    const result = await trigger();
    if (result) {
      dispatch(initializeRecyclables(result));
    }
  }, [trigger, dispatch]);

  useEffect(() => {
    if (!isRecyclableInitialzed) {
      httpFetchRecyclables();
    }
  }, [httpFetchRecyclables, isRecyclableInitialzed]);

  const onSelect = useCallback(
    (item: TRecyclable) => {
      dispatch(selectRecyclableItem(item._id));
    },
    [dispatch]
  );

  const closePickupRequest = useCallback(() => {
    dispatch(selectRecyclableItem(null));
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 font-montserrat p-4 md:p-8">
      <div className={`${selectedRecyclable ? "hidden md:block" : ""} flex-1`}>
        <div className={"flex flex-col gap-6"}>
          <SimpleAnimatedComponent>
            <div className="w-full bg-[#228B22] p-4 rounded-[20px] flex flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-[28px] md:text-[32px] leading-[34.13px] md:leading-[39.01px] font-semibold text-white max-w-[253px] mb-4">
                  It&apos;s time to recycle
                </h3>

                <p className="text-[14px] md:text-[18px] leading-[17.07px] md:leading-[21.94px] text-white max-w-[271px]">
                  Welcome to recycle pro. Here, we save the world by recycling
                  waste and paying you for it
                </p>
              </div>

              <div>
                <img
                  src="/pngs/image2.png"
                  className="w-[161px] h-[161px] md:w-[199px] md:h-[199px] object-contain"
                  alt=""
                />
              </div>
            </div>
          </SimpleAnimatedComponent>

          <SimpleAnimatedComponent>
            <Inputs.Text
              placeholder="Search recyclables"
              className="!rounded-[40px] h-[40px] pl-4 !border-[#0000004D]"
              prefixIcon={<SearchIcon />}
            />
          </SimpleAnimatedComponent>

          <div className="hidden md:block">
            <div className="flex flex-row flex-wrap gap-2 md:gap-6">
              {!loading &&
                recyclables.map((recyclable) => (
                  <RecyclableCard
                    data={recyclable}
                    key={recyclable._id}
                    onSelect={onSelect}
                    selected={selectedRecyclableId === recyclable._id}
                  />
                ))}
            </div>
          </div>

          <div className="block md:hidden grid grid-cols-2 gap-2">
            {!loading &&
              recyclables.map((recyclable) => (
                <RecyclableCard
                  data={recyclable}
                  key={recyclable._id}
                  onSelect={onSelect}
                  selected={selectedRecyclableId === recyclable._id}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="flex-1 md:max-w-[380px]">
        {!selectedRecyclable && <Leaderboard />}

        {selectedRecyclable && (
          <PickupRequest
            recyclable={selectedRecyclable}
            onClose={closePickupRequest}
          />
        )}
      </div>
    </div>
  );
};

export default withAuthRedirect(DashboardPage);
