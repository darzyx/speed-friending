import { ColorfulLink } from "../../components/blocks/ColorfulText";

const AdminSignedOut = () => (
  <>
    <p style={{ textAlign: "center" }}>You have signed out</p>
    <ColorfulLink to="/">Go home &rarr;</ColorfulLink>
  </>
);

export default AdminSignedOut;
