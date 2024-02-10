import TechnologyTag from './TechnologyTag'
import ContentfulImage from './ContenfulImage'
import { useRef, useEffect } from 'react'
import Card from './Card'

const Project = ({ project }) => {
  const { links } = project.fields

  const cardLink = links[0]
  const hasMultipleLinks = links && links.length > 1

  const LinkElement = ({ link, text }) => (
    <a href={link} target='_blank' rel='noreferrer noopener' className='*:text-slate-200 *:fill-slate-200 font-medium *:hover:text-cyan-200 *:hover:fill-cyan-200 *:transition-all' onClick={(e) => e.stopPropagation()}>
      <span className='flex items-center gap-1 text-xs'>
        <svg width='10' height='10' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path d='M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z'/>
        </svg>
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
          <div className='flex gap-1 *:text-slate-200 *:fill-slate-200 *:group-hover:text-cyan-200 *:group-hover:fill-cyan-200 *:transition-all'>
            <div className='text-lg leading-5'>{project.fields.title}</div>
            <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 30 30' width='20' height='20'>
              <path d='M 25.980469 2.9902344 A 1.0001 1.0001 0 0 0 25.869141 3 L 20 3 A 1.0001 1.0001 0 1 0 20 5 L 23.585938 5 L 13.292969 15.292969 A 1.0001 1.0001 0 1 0 14.707031 16.707031 L 25 6.4140625 L 25 10 A 1.0001 1.0001 0 1 0 27 10 L 27 4.1269531 A 1.0001 1.0001 0 0 0 25.980469 2.9902344 z M 6 7 C 4.9069372 7 4 7.9069372 4 9 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 21 26 C 22.093063 26 23 25.093063 23 24 L 23 14 L 23 11.421875 L 21 13.421875 L 21 16 L 21 24 L 6 24 L 6 9 L 14 9 L 16 9 L 16.578125 9 L 18.578125 7 L 16 7 L 14 7 L 6 7 z'/>
            </svg>
          </div>

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

          <div className='flex flex-wrap gap-1 mt-4'>
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