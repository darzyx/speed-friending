import { Button, Icon } from "semantic-ui-react";
import { GroupWithIdType } from "../../types/group";

// TODO: remove this and limit creation to auth users
const maxGroups = 50;

type CreateGroupButtonPropsType = {
  hasAnyGroups: boolean;
  groups: GroupWithIdType[];
  setOpenCreateGroupModal: (openCreateGroupModal: boolean) => void;
};

const CreateGroupModalTrigger = ({
  hasAnyGroups,
  groups,
  setOpenCreateGroupModal,
}: CreateGroupButtonPropsType) => {
  const disabled = groups.length >= maxGroups;
  return (
    <Button
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: `${hasAnyGroups ? "10px" : "0"} 0 0 0`,
        paddingTop: "14px",
        paddingBottom: "14px",
        backgroundColor: "#4b555d",
        color: "white",
      }}
      onClick={disabled ? () => {} : () => setOpenCreateGroupModal(true)}
      disabled={disabled}
      size="large"
    >
      {groups.length >= maxGroups ? (
        <Icon name="close" />
      ) : (
        <Icon name="plus" />
      )}
    </Button>
  );
};

export default CreateGroupModalTrigger;
