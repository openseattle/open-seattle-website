/*
 * @2023 Digital Aid Seattle
 */

import { DASVolunteerRole, DASVolunteerRoleBasicInfo } from 'types'

import airtableService from './AirtableService'

// Documentation: Airtable provides an excellent guide to using their API.
// To access documentation for our unique base, visit: https://airtable.com/{{baseID}}/api/docs#javascript/table:roles
// To find the baseID, visit any page in the Digital Aid Airtable base and look at the URL.
// It will be the string of characters after the first slash, starting with "app".


class DASVolunteerRoleService {

  async getAllActiveRoles(): Promise<DASVolunteerRoleBasicInfo[]> {
    const volunteerRolesTable =
      process.env.NEXT_PUBLIC_AIRTABLE_TABLE_VOLUNTEER_ROLES
    const maxRecords = 100
    const activeRoleFilter = '{Status} = "Active"'

    const { getStringFieldRecord } = airtableService

    return airtableService.getTableRecords(
      volunteerRolesTable,
      maxRecords,
      activeRoleFilter
    ).then(activeRoles => {
      const casted = activeRoles as any[];
      casted.sort((a, b) => a.fields.Role.localeCompare(b.fields.Role))
      return casted.map((record) => {
        return {
          id: record.id,
          role: getStringFieldRecord(record, 'Role'),
          key: getStringFieldRecord(record, 'Key'),
        }
      })
    })
  }

  async getRoleDetailsByName(
    roleKey: string
  ): Promise<DASVolunteerRole | null> {
    const volunteerRolesTable =
      process.env.NEXT_PUBLIC_AIRTABLE_TABLE_VOLUNTEER_ROLES
    const maxRecords = 1
    const filterByFormula = `{Key} = '${roleKey}'`

    const recordData = await airtableService.getTableRecords(
      volunteerRolesTable,
      maxRecords,
      filterByFormula
    ) as any[];
    if (recordData.length === 0) {
      return null
    }
    const record = recordData[0];
    if (record.fields.Status !== 'Active') {
      return null
    } else {
      let keyTechnologies = await this.getAndGroupTechnologies(
        record.fields['Key technologies']
      )

      const {
        getNumberFieldRecord,
        getSplitFieldRecord,
        getStringFieldRecord,
      } = airtableService;

      const volunteerRoleData: DASVolunteerRole = {
        role: getStringFieldRecord(record, 'Role'),
        key: getStringFieldRecord(record, 'Key'),
        location: getStringFieldRecord(record, 'Location'),
        duration: getStringFieldRecord(record, 'Duration'),
        headline: getStringFieldRecord(record, 'Headline'),
        description: getStringFieldRecord(record, 'Description'),
        whyJoin: getStringFieldRecord(record, 'Why Join Us'),
        aboutUs: getStringFieldRecord(record, 'About Us'),
        responsibilities: getSplitFieldRecord(record, 'Responsibilities'),
        preferredQualifications: getStringFieldRecord(
          record,
          'Preferred Qualifications'
        ),
        keyAttributesToSuccess: getSplitFieldRecord(
          record,
          'Key attributes for success'
        ),
        keyTechnologies: keyTechnologies,
        venture: getStringFieldRecord(
          record,
          'Venture (from Partner Needs Link)'
        ),
        applicationLink: getStringFieldRecord(record, 'url to apply'),
        urgency: getNumberFieldRecord(record, 'Urgency'),
      }
      return volunteerRoleData
    }
  }

  async getAndGroupTechnologies(roleTechnologyRecordIds: string[]) {
    if (roleTechnologyRecordIds && Array.isArray(roleTechnologyRecordIds)) {
      const keyTechnologiesData = await airtableService.getTableRecords(
        process.env.NEXT_PUBLIC_AIRTABLE_TABLE_TOOLS_WE_USE
      )
      const roleTechnologies = keyTechnologiesData.filter((tech) => {
        return roleTechnologyRecordIds.includes(tech.id)
      })
      const technologiesMap = new Map()
      roleTechnologies.forEach((tech) => {
        const category = tech.fields?.Category || 'Other'
        const name = tech.fields?.['Name']
        if (!technologiesMap.has(category)) {
          technologiesMap.set(category, [])
        }
        technologiesMap.get(category).push(name)
      })
      let keyTechnologies = []
      technologiesMap.forEach((value, key) => {
        keyTechnologies.push(`${key}: ${value.join(', ')}`)
      })
      keyTechnologies = keyTechnologies.sort((a, b) => {
        if (a.startsWith('Other')) {
          return 1
        } else if (b.startsWith('Other')) {
          return -1
        } else {
          a.localeCompare(b)
        }
      })
      return keyTechnologies
    } else {
      return null
    }
  }
}

const dasVolunteerRoleService = new DASVolunteerRoleService()

export { dasVolunteerRoleService }