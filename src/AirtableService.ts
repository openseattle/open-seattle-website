/*
 * @2023 Digital Aid Seattle
 */

import Airtable, { FieldSet, Records } from 'airtable'

// Documentation: Airtable provides an excellent guide to using their API.
// To access documentation for our unique base, visit: https://airtable.com/{{baseID}}/api/docs#javascript/table:roles
// To find the baseID, visit any page in the Digital Aid Airtable base and look at the URL.
// It will be the string of characters after the first slash, starting with "app".

class AirtableService {
  private airtable: Airtable
  private base: Airtable.Base
  private table: Airtable.Table<Airtable.FieldSet>

  constructor(apiKey: string, baseId: string) {
    this.airtable = new Airtable({
      apiKey: apiKey || process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
    })
    this.base = this.airtable.base(
      baseId || process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID_DAS
    )
  }

  async getTableRecords(
    tableId: string,
    maxRecords?: number,
    filterByFormula?: string
  ): Promise<Records<FieldSet>> {
    this.table = this.base(tableId)
    try {
      const records = await this.table
        .select({
          maxRecords: maxRecords || 100, // default max records is 100, more than that and we will need to start using pagination
          filterByFormula: filterByFormula || '',
        })
        .all()
      return records
    } catch (error) {
      console.error(error)
    }
  }

  getNumberFieldRecord(
    record: Airtable.Record<FieldSet>,
    field: string
  ): number {
    if (record.get(field) === undefined) {
      return null
    } else {
      return record.get(field) as number
    }
  }

  getStringFieldRecord(
    record: Airtable.Record<FieldSet>,
    field: string
  ): string {
    if (record.get(field) === undefined) {
      return null
    } else {
      return record.get(field) as string
    }
  }

  getSplitFieldRecord(
    record: Airtable.Record<FieldSet>,
    field: string
  ): string[] {
    if (record.get(field) === undefined) {
      return null
    } else {
      return (record.get(field) as string).split('\n')
    }
  }
}

const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID_DAS

const airtableService = new AirtableService(apiKey, baseId)

export default airtableService
