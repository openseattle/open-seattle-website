/*
* @2023 Digital Aid Seattle
*/
import { Image } from 'sanity';

type OSEvent = {
  _id: string,
  _createdAt: Date,
  title: string,
  date: string,
  start: string,
  end: string,
  location: string,
  description: string,
  image: Image,
  rsvpLink: string,
  active: boolean,
  details: boolean,
  partner: string,
  id: string,
  interest: Image
  about: {
    title: string,
    details: string[]
  }[]
}

type TeamMember = {
  _id: string,
  _createdAt: Date,
  name: string,
  role: string,
  image: Image,
  url: string
}

type DASProject = {
  _id: string
  _createdAt: Date
  orderRank: string
  id: string
  title: string
  partner: string
  programAreas: string[]
  description: string
  status: 'active' | 'recruiting' | 'complete'
  projectLink: string
  duration?: { start: string; end: string }
  image: Image
  problem: string[]
  solution: string[]
  impact: string[]
  rolesNeeded: string[]
  currentTeam: TeamMember[]
  display: boolean
}

type DASVolunteerRoleBasicInfo = {
  role: string
  key: string
}

type DASVolunteerRole = {
  location: string
  duration: string
  headline: string
  description?: string
  whyJoin: string
  aboutUs: string
  responsibilities: string[]
  preferredQualifications: string
  keyAttributesToSuccess: string[]
  keyTechnologies?: string[]
  venture?: string
  applicationLink?: string
  urgency?: number
} & DASVolunteerRoleBasicInfo