import React, { Fragment } from "react"
import { Col, Container, Row } from "reactstrap"
import TeamMember from "../TeamMember/TeamMember"

const OurTeam = ({ data, team }) => {
  return (
    <Fragment>
      <Container className="page-section">
        <Row>
          <Col xs="12">
            <section className="section-title">
              <h2 className="mb-4">{data?.title}</h2>

              <section
                dangerouslySetInnerHTML={{
                  __html: data?.content,
                }}
              />
            </section>
          </Col>
        </Row>

        <Row>
          <Col xs="12">
            {team?.map((member, index) => (
              <Fragment key={index}>
                {member?.node?.team_data?.name && (
                  <TeamMember
                    fullName={member?.node?.team_data?.name}
                    imageUrl={member?.node?.team_data?.image?.sourceUrl}
                    designation={member?.node?.team_data?.designation}
                    excerpt={member?.node?.team_data?.about}
                  />
                )}
              </Fragment>
            ))}
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default OurTeam
