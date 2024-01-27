import TechnologyTag from "./TechnologyTag"
import styles from '../page.module.css'

const Project = ({ project }) => {
  return (
    <div className={styles.right__content__section__project}>
      <h3 className={styles.right__content__section__project__title}>
        {project.fields.title}
      
        <sub>
          {project.fields.demoLink &&
            <a href={project.fields.demoLink} target='_blank'>Demo ↗</a>
          }

          {project.fields.repositoryLink &&
            <a href={project.fields.repositoryLink} target='_blank'>Repository ↗</a>
          }

          {project.fields.articleLink &&
            <a href={project.fields.articleLink} target='_blank'>Article ↗</a>
          }
        </sub>
      </h3>

      <sup>{new Date(project.fields.date).toLocaleDateString()}</sup>

      <p>{project.fields.description}</p>

      <div className={styles.technology_tag_container}>
        {project.fields.technologies &&
          project.fields.technologies.map((technology, index) =>
            <TechnologyTag key={index} technology={technology} />
          )
        }
      </div>
    </div>
  )
}

export default Project