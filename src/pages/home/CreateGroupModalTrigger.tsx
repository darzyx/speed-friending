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
        marginTop: hasAnyGroups ? "10px" : "0",
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
      onClick={disabled ? () => {} : () => setOpenCreateGroupModal(true)}
      disabled={disabled}
      size="large"
      secondary
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
