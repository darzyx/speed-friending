import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import InfoModal from "./InfoModal";

const StyledButton = styled(Button).attrs({ secondary: true })`
  &&&& {
    background-color: #1b1c1d !important;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();

  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <StyledButton onClick={() => navigate("/")}>
        <Icon name="home" /> Home
      </StyledButton>
      <StyledButton onClick={() => setOpenInfoModal(true)}>
        <Icon name="info circle" /> Info
      </StyledButton>
      <InfoModal
        openInfoModal={openInfoModal}
        setOpenInfoModal={setOpenInfoModal}
      />
    </div>
  );
};

export default Navbar;
