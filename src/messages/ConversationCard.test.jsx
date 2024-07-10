import { render } from "@testing-library/react";
import ConversationCard from "./ConversationCard.jsx";
import { TEST_MESSAGE_2 } from "../_testCommons.js";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <ConversationCard
        message={TEST_MESSAGE_2}
        userClass={"current-user"}
        messageType={"user-messages"}
      />
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <ConversationCard
        message={TEST_MESSAGE_2}
        userClass={"current-user"}
        messageType={"user-messages"}
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have conversation-card-div", function () {
  const { container } = render(
    <MemoryRouter>
      <ConversationCard
        message={TEST_MESSAGE_2}
        userClass={"current-user"}
        messageType={"user-messages"}
      />
    </MemoryRouter>
  );
  const conversation_card_div = container.querySelector(
    ".conversation-card-div"
  );
  expect(conversation_card_div).toBeInTheDocument();
});

it("should have a message body", function () {
  const { getByText } = render(
    <MemoryRouter>
      <ConversationCard
        message={TEST_MESSAGE_2}
        userClass={"current-user"}
        messageType={"user-messages"}
      />
    </MemoryRouter>
  );
  const body = getByText("test body");
  expect(body).toBeInTheDocument();
});
