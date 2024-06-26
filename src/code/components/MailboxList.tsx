import React from "react";
import { Chip, List } from "@material-ui/core";

const MailboxList = ({ state }) => (
  <List>
    {state.mailboxes.map((value) => {
      return (
        <Chip
          label={`${value.name}`}
          onClick={() => state.setCurrentMailbox(value.path)}
          style={{ width: 128, marginBottom: 10 }}
          color={state.currentMailbox === value.path ? "secondary" : "primary"}
        />
      );
    })}
  </List>
);

export default MailboxList;

/**When a user clicks on an email (Chip) in the mailbox list, the setCurrentMailbox method is invoked. It first sets currentMailbox to the provided mailbox path (inPath) and then sets currentView to "welcome" to ensure the welcome view is active.

Next, the getMessages method is called, responsible for fetching the list of messages in the selected mailbox. Initially, it displays the "Please Wait" dialog (showHidePleaseWait(true)), then uses IMAP.Worker to fetch the message list from the server. After obtaining the list of messages, it hides the "Please Wait" dialog (showHidePleaseWait(false)).

Subsequently, the clearMessages method is invoked to clear the current message list, making space for the new message list.

Finally, a forEach loop is used to iterate through the new message list, and each message is added to the component's state using the addMessageToList method. This series of actions ensures that when a user selects a different mailbox, the corresponding message list is promptly retrieved and displayed. */

