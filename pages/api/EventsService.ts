/*
* @2023 Digital Aid Seattle
*/

import { groq } from 'next-sanity';
import { DASEvent, OSEvent } from 'types';
import { sanityClient } from '../../sanity/lib/client';
import airtableService from './AirtableService';

const EVENTS_TABLE = 'tblcX8EP3xNGw2IMD';

// Who knows, maybe we replace this with Airtable
class EventsService {

  async getAll(): Promise<DASEvent[]> {
    const MAX_RECORDS = 50;
    const FILTER = '';
    return await airtableService
      .getTableRecords(EVENTS_TABLE, MAX_RECORDS, FILTER)
      .then(records => records.map(record => {
        const fields = record.fields;
        return {
          airtableId: airtableService.getStringFieldRecord(record, 'Event ID'),
          title: airtableService.getStringFieldRecord(record, 'Title'),
          sequence: airtableService.getNumberFieldRecord(record, 'Sequence'),
          eventDate: airtableService.getDateFieldRecord(record, 'Event Date'),
          duration: airtableService.getNumberFieldRecord(record, 'Duration'),
          location: airtableService.getStringFieldRecord(record, 'Location'),
          description: airtableService.getStringFieldRecord(record, 'Description')
        } as DASEvent
      }))
  }

  getTimeString = (event: OSEvent): string => {
    return event.start + (event.end ? ' - ' + event.end : '');
  }

  async getActiveEvents(): Promise<OSEvent[]> {
    return sanityClient()
      .fetch(groq`*[_type == "os-event" && active == true]`);
  }

  async getOne(id: string): Promise<OSEvent> {
    return sanityClient()
      .fetch(groq`*[_type == "os-event" && id == "${id}"]`)
      .then(results => results.length === 0 ? null : results[0]);
  }
}

const eventsService = new EventsService();

export { eventsService };
