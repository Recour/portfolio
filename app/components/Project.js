import TechnologyTag from "./TechnologyTag"
import styles from '../page.module.css'
import ContentfulImage from "./ContenfulImage"

const Project = ({ project }) => {
  return (
    <div>
      <div className='text-lg text-slate-200'>{project.fields.title}</div>
    
      <div className='flex text-xs gap-3 text-slate-400'>
        {project.fields.demoLink &&
          <a href={project.fields.demoLink} target='_blank' className='hover:text-slate-300'>Demo ↗</a>
        }

        {project.fields.repositoryLink &&
          <a href={project.fields.repositoryLink} target='_blank' className='hover:text-slate-300'>Repository ↗</a>
        }

        {project.fields.articleLink &&
          <a href={project.fields.articleLink} target='_blank' className='hover:text-slate-300'>Article ↗</a>
        }
      </div>

      <div className='text-sm text-slate-400 my-4'>{project.fields.description}</div>

      {project.fields.images &&
        <div className='flex gap-1 my-4'>
          {project.fields.images.map((image, index) =>
            <ContentfulImage key={index} image={image} width={100} height={100} />
          )}
        </div>
      }

      <div className="flex flex-wrap gap-1 my-4">
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