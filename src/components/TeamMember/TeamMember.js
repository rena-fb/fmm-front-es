import React from "react"
import "./TeamMember.scss"

const TeamMember = ({ fullName, imageUrl, designation, excerpt, grid }) => {
  return (
    <article className={`team-member ${grid ? "team-member__grid" : ""}`}>
      <figure>
        <img
          src={imageUrl}
          alt={fullName}
          width="100%"
          className="team-member__image"
          loading="lazy"
        />
      </figure>

      <section className="team-member__details">
        <h4 className="mb-0">{fullName}</h4>
        <p>{designation}</p>
        <p>{excerpt}</p>
      </section>
    </article>
  )
}

export default TeamMember
