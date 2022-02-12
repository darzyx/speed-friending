import { Icon, Pagination as SemanticPagination } from "semantic-ui-react";
import styled from "styled-components";

import { SessionWithIdType } from "../../types/session";
import CenterMiddle from "../../components/blocks/CenterMiddle";

const Pagination = styled(SemanticPagination)`
  &&&& {
    max-width: 100%;
    &,
    * {
      color: white !important;
      background-color: #1b1c1d;
      outline: none;
      border: none;
    }
    .active.item,
    &:hover {
      background-color: #27292a;
    }
  }
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  margin-top: 20px;
  padding: 0;
  color: #00aaff;
  cursor: pointer;
  font-size: 16px;
  outline: none;
`;

type StyledPaginationPropsType = {
  session: SessionWithIdType;
  selectedPage: string;
  setSelectedPage: (selectedPage: string) => void;
  selectedRoundIsActive: boolean;
};
const StyledPagination = ({
  session,
  selectedPage,
  setSelectedPage,
  selectedRoundIsActive,
}: StyledPaginationPropsType) => {
  const handlePageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { activePage }: { activePage: string }
  ) => {
    setSelectedPage(activePage);
  };

  return (
    <CenterMiddle>
      <Pagination
        activePage={selectedPage}
        onPageChange={handlePageChange}
        totalPages={session.total_rounds}
        boundaryRange={0}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
      />
      <LinkButton
        onClick={() => setSelectedPage(session.active_round.toString())}
      >
        Go to Active Round{" "}
        <Icon
          name={
            selectedRoundIsActive
              ? "check circle outline"
              : "arrow alternate circle right outline"
          }
        />
      </LinkButton>
    </CenterMiddle>
  );
};

export default StyledPagination;
