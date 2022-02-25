import { Button, Icon } from "semantic-ui-react";
import theme from "../../styles/theme";
import { groupWithIdType } from "../../types/group";

// TODO: remove this and limit creation to auth users
const maxGroups = 50;

type CreateGroupButtonPropsType = {
  anyGroupsExist: boolean;
  groups: groupWithIdType[];
  setOpenCreateGroupModal: (openCreateGroupModal: boolean) => void;
};
const CreateGroupModalTrigger = ({
  anyGroupsExist,
  groups,
  setOpenCreateGroupModal,
}: CreateGroupButtonPropsType) => {
  const disabled = groups.length >= maxGroups;
  return (
    <Button
      style={{
        width: "100%",
        margin: `${anyGroupsExist ? "10px" : "0"} 0 0 0`,
        paddingTop: "14px",
        paddingBottom: "14px",
        backgroundColor: theme.color.five,
        color: theme.color.text,
      }}
      onClick={disabled ? () => {} : () => setOpenCreateGroupModal(true)}
      disabled={disabled}
      size="large"
    >
      {groups.length >= maxGroups ? (
        <Icon name="remove" />
      ) : (
        <Icon name="plus" />
      )}
    </Button>
  );
};

export default CreateGroupModalTrigger;
