export default {
  identity: `
    {
      firstName
      usageName
      lastName
      email
      gender
      mobilePhone
      homePhone
      birthday
      isHandicapped
      fullAddress{
        street
        city
        postalCode
        country
        lat
        lng
      }
      birthPlace{
        city
        county
        country
      }
      nationality{
        country
        countryCode
      }
      currentSituation{
        status
        employmentType
        registerToPoleEmploi
        registerToPoleEmploiSince
        compensationType
      }
    }
  `,
  certification: `
    {
      acronym
      label
      level
      slug
    }
  `,
  delegate: `
    {
      id
      name
      address
      personName
      email
      telephone
      certifier {
        name
      }
    }
  `,
  resume: `
    {
      id
      filename
      url
    }
  `,
  meeting: `
    {
      academyId
      address
      city
      endDate
      meetingId
      name
      place
      postalCode
      remainingPlaces
      startDate
      target
    }
  `,
  get application() {
    return `
      {
        id
        booklet_1 {
          insertedAt
          completedAt
        }
        meeting ${this.meeting}
        resumes ${this.resume}
        bookletHash
        insertedAt
        submittedAt
        certification ${this.certification}
        delegate ${this.delegate}
      }
    `
  },
  get meetingList() {
    return `
      {
        name
        meetings ${this.meeting}
      }
    `
  },
}
