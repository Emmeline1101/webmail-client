import axios, { AxiosResponse } from "axios";
import { config } from "./config";

// Define interface to describe a mailbox.
export interface IMailbox {
  name: string;
  path: string;
}

// Define interface to describe a received message. body is optional
export interface IMessage {
  id: string;
  date: string;
  from: string;
  subject: string;
  body?: string;
}

// The worker that will perform IMAP operations.
export class Worker {
  /**
   * Returns a list of all (top-level) mailboxes.
   *
   * return An array of objects, on per mailbox, that describes the mailbox.
   */

  public async listMailboxes(): Promise<IMailbox[]> {//返回一个 Promise 对象，其泛型参数为 IMailbox[]，表示邮箱对象数组
    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/mailboxes`
    );
    return response.data;
  }

  /**
   * Returns a list of messages in a named mailbox
   *
   * @param  inMailbox The name of the mailbox.
   * @return           An array of objects, on per message.
   */
  public async listMessages(inMailbox: string): Promise<IMessage[]> {
    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/mailboxes/${inMailbox}`
    );
    return response.data;
  }

  /**
   * Returns the body of a specified message.
   *
   * @param  inID      The ID of the message to get the body of.
   * @param  inMailbox The path of the mailbox the message is in.
   * @return           The body of the message.
   */

  public async getMessageBody(
    inID: string,
    inMailbox: String
  ): Promise<string> {
    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/messages/${inMailbox}/${inID}`
    );
    return response.data;
  }

  /**
   * Returns the body of a specified message.
   *
   * @param  inID      The ID of the message to delete.
   * @param  inMailbox The path of the mailbox the message is in.
   */
  public async deleteMessage(inID: string, inMailbox: String): Promise<void> {
    await axios.delete(`${config.serverAddress}/messages/${inMailbox}/${inID}`);
  }
}
