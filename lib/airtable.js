const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE);

export const table = base("Coffee-stores");

export const findRecord = (records) => records.map(record => {
    return record.fields
})