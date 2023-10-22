/*
 * @2023 Digital Aid Seattle
 */

import Airtable from 'airtable'
import { DASVolunteerRole } from 'types'

// Documentation: Airtable provides an excellent guide to using their API.
// To access documentation for our unique base, visit: https://airtable.com/{{baseID}}/api/docs#javascript/table:roles
// To find the baseID, visit any page in the Digital Aid Airtable base and look at the URL.
// It will be the string of characters after the first slash, starting with "app".

class DASVolunteerRoleService {
  private airtable: Airtable
  private base: Airtable.Base
  private volunteerRolesTable: Airtable.Table<Airtable.FieldSet>

  constructor(apiKey: string, baseId: string, tableId: string) {
    this.airtable = new Airtable({
      apiKey: apiKey || process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
    })
    this.base = this.airtable.base(
      baseId || process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID_DAS
    )
    this.volunteerRolesTable = this.base(
      tableId || process.env.NEXT_PUBLIC_AIRTABLE_TABLE_VOLUNTEER_ROLES
    )
  }

  getRoleUrl(roleName: string) {
    return `/volunteer_role?role=${roleName.replace(/ /g, '-').toLowerCase()}`
  }

  async getVolunteerRoles(): Promise<DASVolunteerRole[]> {
    try {
      const records = await this.volunteerRolesTable
        .select({
          view: 'Grid view',
        })
        .all()

      const activeRoles = records.filter(
        (record) => record.get('Status') === 'Active'
      )
      const volunteerRolesData = activeRoles.map((record) => {
        const roleUrl = this.getRoleUrl(String(record.fields.Role))
        return {
          id: record.id,
          role: String(record.fields.Role),
          roleUrl,
          description: String(record.fields.Description),
          applicationLink: String(record.fields['url to apply']),
          image: {
            filename: record.fields.image[0].filename,
            url: record.fields.image[0].url,
            width: record.fields.image[0].width,
            height: record.fields.image[0].height,
          },
        }
      })
      return volunteerRolesData
    } catch (err) {
      console.log(err)
      throw err
    }
  }
  // TODO: Need to improve parsing of param to include roles that have a '/' eg) QA/Test Engineer or UI/UX Designer
  async getVolunteerRoleByName(roleName): Promise<DASVolunteerRole | null> {
    try {
      const formattedRoleName = roleName.replace(/-/g, ' ')
      const recordData = await this.volunteerRolesTable
        .select({
          view: 'Grid view',
          maxRecords: 1,
          filterByFormula: `LOWER(Role) = "${formattedRoleName}"`,
        })
        .firstPage()
      if (recordData.length === 0) {
        return null
      }
      const record = recordData[0]
      const roleUrl = this.getRoleUrl(String(record.fields.Role))
      const volunteerRoleData = {
        id: record.id,
        roleUrl,
        role: String(record.fields?.Role),
        description: String(record.fields?.Description),
        applicationLink: String(record.fields?.['url to apply']),
        image: {
          filename: record.fields?.image[0]?.filename,
          url: record.fields?.image[0]?.url,
          width: record.fields?.image[0]?.width,
          height: record.fields?.image[0]?.height,
        },
      }
      return volunteerRoleData
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID_DAS
const tableId = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_VOLUNTEER_ROLES

const dasVolunteerRoleService = new DASVolunteerRoleService(
  apiKey,
  baseId,
  tableId
)

export { dasVolunteerRoleService }
