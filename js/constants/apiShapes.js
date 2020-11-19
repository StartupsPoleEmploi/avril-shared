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
      certifiers ${this.certifier}
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
  get delegate() {
    return `
      {
        id
        name
        address
        personName
        email
        telephone
        meetingPlaces {
          name
          meetings ${this.meeting}
        }
      }
    `
  },
  get certifier() {
    return `
      {
        name
      }
  `,
  },
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
        certifier ${this.certifier}
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
