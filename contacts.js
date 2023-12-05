import { promises as fs } from 'fs';
import path from 'path';

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error('Error reading contacts.json:', error.message);
    throw error;
  }
}

async function getContactById(contactId) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const readData = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(readData);
    const foundContact = contactsList.find(contact => contact.id === contactId);

    return foundContact || null;

  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function removeContact(contactId) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const readData = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(readData);
    const foundContactIndex = contactsList.findIndex(contact => contact.id === contactId);

    if (foundContactIndex === -1) {
      return null;
    }

    const removedContact = contactsList.splice(foundContactIndex, 1)[0];

    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

    return removedContact || null;

  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function addContact(name, email, phone) {
  // Повертає об'єкт доданого контакту. 
  try {
    const readData = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(readData);

    const newContactId = Date.now().toString();

    const newContact = {
      id: newContactId,
      name,
      email,
      phone
    };

    contactsList.push(newContact);


    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

    return newContact;

  } catch (error) {
    console.log(error.message);
    throw error;
  }
}


export { listContacts, getContactById, removeContact, addContact };




