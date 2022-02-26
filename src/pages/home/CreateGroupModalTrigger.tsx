import { Button, Icon } from "semantic-ui-react";
import styled from "styled-components";

import { groupWithIdType } from "../../types/group";

const maxGroups = 50;

const CreateGroupModalTriggerContainer = styled(Button).attrs((props) => ({
  size: "large",
  disabled: props.disabled,
}))`
  &&&& {
    width: 100%;
    margin: ${({ anyGroupsExist }) => (anyGroupsExist ? "10px" : "0")} 0 0 0;
    padding-top: 14px;
    padding-bottom: 14px;
    background-color: ${({ theme }) => theme.color.five};
    color: ${({ theme }) => theme.color.text};
  }
`;

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
    <CreateGroupModalTriggerContainer
      onClick={disabled ? () => {} : () => setOpenCreateGroupModal(true)}
      anyGroupsExist={anyGroupsExist}
      disabled={disabled}
    >
      {groups.length >= maxGroups ? (
        <Icon name="remove" />
      ) : (
        <Icon name="plus" />
      )}
    </CreateGroupModalTriggerContainer>
  );
};

export default CreateGroupModalTrigger;
