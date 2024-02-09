import TechnologyTag from "./TechnologyTag"
import ContentfulImage from "./ContenfulImage"
import { useRef, useEffect } from "react"
import Card from "./Card"
import linkIcon from '../../public/link-icon.svg';
import Image from "next/image";

const Project = ({ project }) => {
  const { links } = project.fields

  const cardLink = links[0]
  const hasMultipleLinks = links && links.length > 1

  const LinkElement = ({ link, text }) => (
    <a href={link} target='_blank' rel='noreferrer noopener' className='text-slate-200 font-medium hover:text-cyan-200 transition-all' onClick={(e) => e.stopPropagation()}>
      <span className='flex items-center gap-2 text-xs'>
        <Image src={linkIcon} alt='Link' width={10} height={10} className='invert' />
        {text}
      </span>
    </a>
  )

  return (
    <Card link={cardLink.fields.link}>
      <div className='lg:flex'>
        <div className='hidden lg:flex w-1/3 justify-center items-center'>     
          {project.fields.images &&
            <ContentfulImage image={project.fields.images[0]} />
          }
        </div>

        <div className='lg:w-2/3 lg:ml-9'>
          <div className='text-lg text-slate-200 group-hover:text-cyan-200 transition-all'>{project.fields.title}</div>

          <div className='flex lg:hidden my-4'>
            {project.fields.images &&
              <ContentfulImage image={project.fields.images[0]} />
            }
          </div>

          <div className='text-sm text-slate-400 my-4'>{project.fields.description}</div>

          {hasMultipleLinks &&
            <div className='flex items-center gap-6'>
              {links
                .filter(link => links.indexOf(link) !== 0)
                .map((link, index) =>
                <LinkElement key={index} link={link.fields.link} text={link.fields.text} />
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
      </div>
    </Card>
  )
}

export default Project