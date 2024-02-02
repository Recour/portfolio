import TechnologyTag from "./TechnologyTag"
import ContentfulImage from "./ContenfulImage"
import { useRef, useEffect } from "react"
import Card from "./Card"

const Project = ({ project }) => {
  const { demoLink, repositoryLink, articleLink } = project.fields

  const link = demoLink || repositoryLink || articleLink

  return (
    <Card link={link}>
      <div className='flex'>
        <div className='w-1/3 flex justify-center items-center'>     
          {project.fields.images &&
            <ContentfulImage image={project.fields.images[0]} />
          }
        </div>

        <div className='w-2/3 ml-9'>
          <div className='text-lg text-slate-200 group-hover:text-cyan-200 group-hover:transition'>{project.fields.title}</div>

          <div className='text-sm text-slate-400 my-4'>{project.fields.description}</div>

          <div className="flex flex-wrap gap-1 mt-4">
            {project.fields.technologies &&
              project.fields.technologies.map((technology, index) =>
                <TechnologyTag key={index} technology={technology} />
              )
            }
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Project