import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label } from "semantic-ui-react";

import { getTimeValues, TimeValuesType } from "../group/utils";
import { GroupWithIdType } from "../../types/group";
import AdminModal from "../../components/admin/AdminModal";

type TimeLabelPropsType = {
  timeValues: TimeValuesType;
  onClickTimeLabel: (openTimeModal: boolean) => void;
  userIsAdmin: boolean;
};
const TimeLabel = ({
  timeValues,
  onClickTimeLabel,
  userIsAdmin,
}: TimeLabelPropsType) => (
  <Label
    onClick={() => onClickTimeLabel(true)}
    {...(userIsAdmin
      ? {
          color: timeValues.color,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }
      : {
          style: {
            backgroundColor: "#27292a",
            color: "rgba(255, 255, 255, 0.9)",
          },
        })}
  >
    {`${timeValues.remainingMinutesDisplay}:${timeValues.remainingSecondsDisplay}`}
  </Label>
);

type GroupLinkPropsType = {
  index: number;
  group: GroupWithIdType;
  currentTimeInSeconds: number;
  userIsAdmin: boolean;
};
const GroupLink = ({
  index,
  group,
  currentTimeInSeconds,
  userIsAdmin,
}: GroupLinkPropsType) => {
  const navigate = useNavigate();

  const [openAdminModal, setOpenAdminModal] = useState(false);

  const handleClickTimeLabel = (newOpenAdminModal: boolean) => {
    if (userIsAdmin) {
      setOpenAdminModal(newOpenAdminModal);
    } else {
      navigate(`/group/${group.id}`);
    }
  };

  const timeValues = getTimeValues({ group, currentTimeInSeconds });

  return (
    <Button
      as="div"
      style={{
        width: "100%",
        maxWidth: "600px",
        marginTop: index === 0 ? "0" : "10px",
      }}
      size="large"
      labelPosition="right"
    >
      <Button
        as={Link}
        to={`/group/${group.id}`}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textAlign: "left",
          padding: "15px 5px 15px 20px",
        }}
        secondary
        active
        fluid
      >
        {group.name}
      </Button>
      <TimeLabel
        timeValues={timeValues}
        onClickTimeLabel={handleClickTimeLabel}
        userIsAdmin={userIsAdmin}
      />
      <AdminModal
        group={group}
        timeValues={timeValues}
        openAdminModal={openAdminModal}
        setOpenAdminModal={setOpenAdminModal}
      />
    </Button>
  );
};

export default GroupLink;
