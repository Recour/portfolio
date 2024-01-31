import TechnologyTag from "./TechnologyTag"
import ContentfulImage from "./ContenfulImage"
import { useRef, useEffect } from "react"

const Project = ({ project }) => {
  const { demoLink, repositoryLink, articleLink } = project.fields

  const projectRef = useRef()

  const linkToOpen = demoLink || repositoryLink || articleLink

  useEffect(() => {
    const projectRefCurrent = projectRef.current

    const handleClick = () => {
      window.open(linkToOpen, '_blank')
    }

    projectRefCurrent.addEventListener('click', handleClick)
    return () => projectRefCurrent.removeEventListener('click', handleClick)
  }, [linkToOpen])

  return (
    <div ref={projectRef} className='rounded-xl p-3 hover:bg-cyan-900/10 hover:transition cursor-pointer'>
      <div className='flex gap-2 items-center'>
        <div className='text-lg text-slate-200'>{project.fields.title}</div>
        <span className='text-xs'>↗</span>
      </div>

      <div className='text-sm text-slate-400 my-4'>{project.fields.description}</div>

      {project.fields.images &&
        <div className='flex gap-1 my-4'>
          {project.fields.images.map((image, index) =>
            <ContentfulImage key={index} image={image} width={100} height={100} />
          )}
        </div>
      }

      <div className="flex flex-wrap gap-1 mt-4">
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