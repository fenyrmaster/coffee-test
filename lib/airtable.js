const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE);

export const table = base("Coffee-stores");

export const findRecord = (records) => records.map(record => {
    return{
        recordId: record.id,
        ...record.fields
    } 
});

export const findRecordByFilter = async id => {
    const records = await table.select({
        filterByFormula: `id=${JSON.stringify(id)}`
    }).firstPage();

    return findRecord(records)
}