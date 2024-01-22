/*
* @2023 Digital Aid Seattle
*/

import { groq } from 'next-sanity';
import { sanityClient } from '../sanity/lib/client';
import { DASProject, TeamMember } from 'types';
import airtableService from './AirtableService';


class DASProjectsService {
  query = groq`*[_type == "das-project"]`
  querySingle = groq`*[_type == "das-project"]`

  async getAll(): Promise<DASProject[]> {
    return sanityClient()
      .fetch(this.query)
  }

  async getOne(id: string): Promise<DASProject> {
    return sanityClient()
      .fetch(groq`*[_type == "das-project" && id == "${id}"]`)
      .then(results => results[0]);
  }

  getTimeline(project: DASProject): string {
    const timeline = project.duration && (project.duration.start || project.duration.end)
      ? `${project.duration.start ? project.duration.start : ''} ${project.duration.end ? (' - ' + project.duration.end) : ''}`
      : 'Ongoing'
    return timeline
  }

  async getPeople(status: string): Promise<TeamMember[]> {
    return (await airtableService.getTableRecords(
      process.env.NEXT_PUBLIC_AIRTABLE_TABLE_PEOPLE_REFERENCE
      , 100
      , `{Manual Status} = "${status}"`
    ))
      .map(r => {
        return {
          name: `${r.fields["First name"]} ${r.fields["Last name"]}`,
          role: r.fields["Position"],
          url: r.fields.pic[0].thumbnails.large.url
        } as TeamMember
      });
  }
}

const dasProjectsService = new DASProjectsService();

export { dasProjectsService };
