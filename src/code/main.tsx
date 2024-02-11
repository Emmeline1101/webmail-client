import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "../css/main.css";
import BaseLayout from "./components/BaseLayout";
import * as IMAP from "./IMAP";
import * as Contacts from "./Contacts";

const baseComponent = ReactDOM.render(<BaseLayout />, document.body);

baseComponent.state.showHidePleaseWait(true);

async function getMailboxes() {

  const imapWorker: IMAP.Worker = new IMAP.Worker();  //IMAP Worker class on the client seeks to mimic that API that is exposed by the server to the IMAP Worker class
  const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();//返回一个包含邮件箱列表的 Promise
 
  mailboxes.forEach((inMailbox) => { // 遍历邮件箱列表，将每个邮箱添加到组件状态中
    baseComponent.state.addMailboxToList(inMailbox);
  });
}

getMailboxes().then(function () {
  async function getContacts() {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: Contacts.IContact[] = await contactsWorker.listContacts();
    contacts.forEach((inContact) => {
      baseComponent.state.addContactToList(inContact);
    });
  }
  getContacts().then(() => baseComponent.state.showHidePleaseWait(false));
});
//运行项目：npx webpack-dev-server --mode development --open
