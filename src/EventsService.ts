/*
* @2023 Digital Aid Seattle
*/

import { groq } from 'next-sanity';
import { sanityClient } from '../sanity/lib/client';
import { OSEvent } from 'types';

// Who knows, maybe we replace this with Airtable
class SanityEventService {
    eventsQuery = groq`*[_type == "os-event"]`

    async getActiveEvents(): Promise<OSEvent[]> {
        return sanityClient().fetch(this.eventsQuery);
    }

}

const eventsService = new SanityEventService();

export { eventsService };
