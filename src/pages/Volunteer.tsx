import React, { useCallback, useState } from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import VolunteerEventList from "../components/VolunteerEventList";
import CreateVolunteerEvent from "../components/CreateVolunteerEvent";
import Button from "../components/Button";
import SimpleAnimatedComponent from "../components/SimpleAnimatedComponent";
import { useVolunteerEvents } from "../hooks/useVolunteerEvents";
import { useNavigate, useParams } from "react-router-dom";

const Volunteer: React.FC = () => {
  const navigate = useNavigate();
  const controller = useVolunteerEvents();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { id } = useParams();

  const { reload } = controller;

  const closeCreate = useCallback(() => {
    setIsCreateOpen(false);
    reload();
  }, [reload]);

  const onSelect = useCallback(
    (id: string) => {
      navigate(`/volunteer/${id}`);
    },
    [navigate]
  );

  return (
    <div className="p-4 md:!p-8 flex flex-col md:!flex-row gap-8">
      <div className="flex-1 md:max-w-[400px]">
        {!isCreateOpen && !id && (
          <SimpleAnimatedComponent>
            <Button.Contained
              label="Create Event"
              type="button"
              onClick={() => setIsCreateOpen(true)}
            />
          </SimpleAnimatedComponent>
        )}

        <div className="mt-4">
          <VolunteerEventList
            data={controller}
            onSelect={onSelect}
            selected={id}
          />
        </div>
      </div>

      <div className="flex-1">
        {isCreateOpen && <CreateVolunteerEvent onComplete={closeCreate} />}
        {/* {!isCreateOpen && id && <VolunteerEventDetail id={id} />} */}
      </div>
    </div>
  );
};

const VolunteerPage = withAuthRedirect(Volunteer);
export default VolunteerPage;
