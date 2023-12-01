import { Command } from 'commander';
import { listContacts, getContactById, removeContact, addContact } from './contacts.js';

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const { action, id, name, email, phone } = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      try {
        const contacts = await listContacts();
        console.log('List of contacts:\n');
        console.table(contacts)
      } catch (error) {
        console.error('Error:', error.message);
      }
      break;


    case 'get':
      try {
        const foundContact = await getContactById(id);
        if (foundContact) {
          console.log('Found contact:\n', foundContact);
        } else {
          console.log('Contact not found by this id.');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
      break;

    case 'add':
      try {
        const addedContact = await addContact(name, email, phone);
        console.log('New contact added:\n', addedContact);
      } catch (error) {
        console.error('Error:', error.message);
      }
      break;

    case 'remove':
      try {
        const removedContact = await removeContact(id);
        if (removedContact) {
          console.log('Removed contact:\n', removedContact);
        } else {
          console.log('Contact not found by this id.');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction({ action, id, name, email, phone });
