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
          countryCode
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
  get certification() {
    return `
      {
        id
        acronym
        label
        level
        slug
        isActive
        certifiers ${this.certifier}
      }
    `;
  },
  resume: `
    {
      id
      name
      category
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
      countryCode
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
        addressName
        address
        personName
        email
        telephone
        website
        isActive
        hasMandatoryBooklet
        externalNotes
      }
    `
  },
  get certifier() {
    return `
      {
        name
        externalNotes
      }
    `
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
  get romes() {
    return `
      {
        label
        code
      }
    `
  },
  get booklet() {
    return `
      {
        certificationName
        certificationRomes ${this.romes}
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
        isCertificationDelegateAvailable
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
