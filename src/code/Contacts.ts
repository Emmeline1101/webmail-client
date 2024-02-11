import axios, { AxiosResponse } from "axios";
import { config } from "./config";


// Define interface to describe a contact.  Note that we'll only have an _id field when retrieving or adding, so
// id has to be optional.
export interface IContact {
  _id?: number;
  name: string;
  email: string;
}

// The worker that will perform contact operations.

export class Worker {
  /**
   * Returns a list of all contacts from the server.
   *
   * @return An array of objects, on per contact.
   */

  public async listContacts(): Promise<IContact[]> {
    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/contacts`
    );
    return response.data;
  }
  /* End listContacts(). */


  /**
   * Add a contact to the server.
   *
   * inContact The contact to add.
   * return  The inContact object, but now with a _id field added.
   */

  public async addContact(contact: IContact): Promise<IContact> {
    const response: AxiosResponse = await axios.post(
      `${config.serverAddress}/contacts`,
      contact
    );
    return response.data;
  }

   /**
   * Delete a contact from the server.
   *
   * inID The ID (_id) of the contact to add.
   */
  public async deleteContact(id): Promise<void> {
    await axios.delete(`${config.serverAddress}/contacts/${id}`);
  }

  public async updateContact(contact: IContact): Promise<number> {
    const response: AxiosResponse = await axios.put(
      `${config.serverAddress}/contacts`,
      contact
    );
    return response.data;
  }
}
