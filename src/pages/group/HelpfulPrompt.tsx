import { ColorfulHeader } from "../../components/blocks/ColorfulText";
import { TimeValuesType } from "./utils";

type HelpfulPromptPropsType = {
  timeValues: TimeValuesType;
};
const HelpfulPrompt = ({ timeValues }: HelpfulPromptPropsType) => (
  <div>
    <ColorfulHeader as="h2" style={{ marginBottom: "0" }}>
      {timeValues.color === "green"
        ? "Find Your Partner"
        : timeValues.color === "blue"
        ? "Time to Chat"
        : timeValues.color === "yellow"
        ? "Round Paused"
        : timeValues.color === "pink"
        ? "Time's Almost Up"
        : timeValues.color === "red"
        ? "Round Over"
        : ""}
    </ColorfulHeader>
    <p style={{ textAlign: "center" }}>
      {timeValues.color === "green"
        ? "Your partner's number and card color are attached to yours below"
        : timeValues.color === "blue"
        ? "Please put your phone away"
        : timeValues.color === "yellow"
        ? "Please turn to an organizer for guidance"
        : timeValues.color === "pink"
        ? "You should not be looking at your phone right now"
        : timeValues.color === "red"
        ? "Please record your partner's assigned number and " +
          "whether you'd like to keep in touch (yes/no)"
        : ""}
    </p>
  </div>
);

export default HelpfulPrompt;
