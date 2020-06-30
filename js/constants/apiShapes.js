export default {
  get identity() {
    return `
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
        fullAddress ${this.address}
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
    `
  },
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
  entityWithLabelOnly: `
    {
      label
    }
  `,
  address: `
    {
      street
      city
      postalCode
      country
      lat
      lng
    }
  `,
  period: `
    {
      startDate
      endDate
      totalHours
      weekHoursDuration
    }
  `,
  get experience() {
    return `
      {
        companyName
        employmentType
        jobIndustry
        title
        uuid
        fullAddress ${this.address}
        skills ${this.entityWithLabelOnly}
        periods ${this.period}
      }
    `
  },
  get education() {
    return `
      {
        courses ${this.entityWithLabelOnly}
        degree
        grade
        diplomas ${this.entityWithLabelOnly}
      }
    `
  },
  get booklet() {
    return `
      {
        certificationName
        certifierName
        insertedAt
        updatedAt
        completedAt
        education ${this.education}
        experiences ${this.experience}
      }
    `
  },
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
