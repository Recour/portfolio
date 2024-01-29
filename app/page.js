'use client';

import { useEffect, useRef, useState } from 'react'
import ContentfulImage from './components/ContenfulImage';
import TechnologyTag from './components/TechnologyTag';
import Project from './components/Project';
import Image from 'next/image';
import githubLogo from '../public/github-mark.svg';
import threadsLogo from '../public/threads-logo.svg';

const contentful = require('contentful')

const client = contentful.createClient({
  space: 'gnilfgmj3mc9',
  environment: 'master',
  accessToken: '1IoJPAGkFl7WkgxHgDjboiMH2XqEV1mJNvf_E2YId_E'
})

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    title: '',
    bio: '',
    profilePicture: null,
    aboutMe: '',
  });
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);

  const spotlightRef = useRef()
  const rightContentRef = useRef()
  const aboutLinkRef = useRef()
  const aboutSectionRef = useRef()
  const educationLinkRef = useRef()
  const educationSectionRef = useRef()
  const experienceLinkRef = useRef()
  const experienceSectionRef = useRef()
  const projectsLinkRef = useRef()
  const projectsSectionRef = useRef()

  // Personal info
  useEffect(() => {
    client.getEntry('4QvSOM4V73JdVEoDAjAlY7')
      .then((entry) => {
        setPersonalInfo(entry.fields);
      })
      .catch(console.error)
  }, []);

  // Education
  useEffect(() => {
    client.getEntries({content_type: 'education'})
      .then((entry) => {
        setEducations(entry.items);
      })
      .catch(console.error)
  }, []);

  // Experience
  useEffect(() => {
    client.getEntries({content_type: 'experience'})
      .then((entry) => {
        setExperiences(entry.items);
      })
      .catch(console.error)
  }, []);

  // Projects
  useEffect(() => {
    client.getEntries({content_type: 'project'})
      .then((entry) => {
        setProjects(entry.items);
      })
      .catch(console.error)
  }, []);

  // Highlight links on scroll
  // useEffect(() => {
  //   const highlightLink = () => {
  //     if (
  //       aboutLinkRef.current.classList.contains(
  //         styles.left__content__list__itemActive
  //       )
  //     ) {
  //       aboutLinkRef.current.classList.remove(
  //         styles.left__content__list__itemActive
  //       )
  //     }

  //     if (educationLinkRef.current.classList.contains(
  //       styles.left__content__list__itemActive
  //       )
  //     ) {
  //       educationLinkRef.current.classList.remove(
  //         styles.left__content__list__itemActive
  //       )
  //     }

  //     if (
  //       experienceLinkRef.current.classList.contains(
  //         styles.left__content__list__itemActive
  //       )
  //     ) {
  //       experienceLinkRef.current.classList.remove(
  //         styles.left__content__list__itemActive
  //       )
  //     }

  //     if (
  //       projectsLinkRef.current.classList.contains(
  //         styles.left__content__list__itemActive
  //       )
  //     ) {
  //       projectsLinkRef.current.classList.remove(
  //         styles.left__content__list__itemActive
  //       )
  //     }

  //     if (
  //       rightContentRef.current.scrollTop >= projectsSectionRef.current.offsetTop
  //     ) {
  //       projectsLinkRef.current.classList.add(
  //         styles.left__content__list__itemActive
  //       )
  //     } else if (
  //       rightContentRef.current.scrollTop >= experienceSectionRef.current.offsetTop
  //     ) {
  //       experienceLinkRef.current.classList.add(
  //         styles.left__content__list__itemActive
  //       )
  //     } else if (
  //       rightContentRef.current.scrollTop >= educationSectionRef.current.offsetTop
  //     ) {
  //       educationLinkRef.current.classList.add(
  //         styles.left__content__list__itemActive
  //       )
  //     } else {
  //       aboutLinkRef.current.classList.add(
  //         styles.left__content__list__itemActive
  //       )
  //     }
  //   }

  //   const handleScroll = e => {
  //     highlightLink()
  //   }
  //   const contentRefCurrent = rightContentRef.current
  //   contentRefCurrent.addEventListener('scroll', handleScroll)

  //   highlightLink()
  //   return () => {
  //     contentRefCurrent.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])

  // Spotlight
  const mouseMoveEvent = (e) => {
    const { clientX, clientY } = e;
    
    console.log('mouseMoveEvent', clientX, clientY)
    spotlightRef.current.style.background = `radial-gradient(circle at ${clientX}px ${clientY}px, #00000000 10px, #000000ee 350px)`
  }
  useEffect(() => {
    const spotlightRefCurrent = spotlightRef.current
    console.log('spotlightRefCurrent', spotlightRefCurrent)
    if (spotlightRefCurrent) {
      spotlightRefCurrent.addEventListener("mousemove", mouseMoveEvent)
    }

    return () => {
      spotlightRefCurrent.removeEventListener("mousemove", () => {})
    }
  }, [spotlightRef])

  return (
    <div className="mx-auto px-6 bg-slate-900 lg:flex lg:px-36 lg:gap-3">
      <div ref={spotlightRef}></div>
      <header className='lg:w-1/2 lg:sticky lg:top-0 lg:max-h-screen py-12 lg:py-24 lg:flex lg:flex-col lg:justify-between text-slate-400'>
        <div className='flex flex-col gap-3'>
          <div className='text-4xl text-slate-100 font-bold'>{personalInfo.name}</div>
          <div className='text-xl text-slate-200 font-medium'>{personalInfo.title}</div>
          <div className='text-md'>{personalInfo.bio}</div>
        </div>

        <nav className='hidden lg:block text-sm uppercase list-none'>
          <li ref={aboutLinkRef}>
            <a href='#about' className='hover:text-slate-200'>About</a>
          </li>

          <li ref={educationLinkRef}>
            <a href='#education' className='hover:text-slate-200'>Education</a>
          </li>

          <li ref={experienceLinkRef}>
            <a href='#experience' className='hover:text-slate-200'>Experience</a>
          </li>

          <li ref={projectsLinkRef}>
            <a href='#projects' className='hover:text-slate-200'>Projects</a>
          </li>
        </nav>

        <div className='flex flex-row gap-3 mt-12'>
          <a href='https://github.com/Recour' target='_blank'>
            <Image src={githubLogo} alt='Github' width={30} height={30} className='invert' />
          </a>

          <a href='https://www.threads.net/@viktorrecour' target='_blank'>
            <Image src={threadsLogo} alt='Threads' width={30} height={30} className='invert' />
          </a>
        </div>
      </header>

      <main ref={rightContentRef} className='lg:w-1/2 lg:py-24'>
        <ul className='*:mb-12'>
          <section id='about' ref={aboutSectionRef}>
            <div className='mb-3 text-xl uppercase text-slate-200 font-bold'>About</div>
            <div className='text-sm text-slate-400'>{personalInfo.aboutMe}</div>
          </section>

          <section id='education' ref={educationSectionRef}>
            <div className='mb-3 text-xl uppercase text-slate-200 font-bold'>Education</div>
            <div>
              {educations
                .sort((a,b) => new Date(b.fields.graduationDate) - new Date(a.fields.graduationDate))
                .map((education, index) =>
                  <div key={index} className='my-12 first:mt-0'>
                    <div className='text-xs  text-slate-400 uppercase font-semibold my-2'>
                      {new Date(education.fields.graduationDate).toLocaleDateString()}
                    </div>
                    <div className='text-lg text-slate-200'>{education.fields.degree}</div>
                    <div className='text-xs text-slate-400'>
                      {education.fields.institutionLink ?
                        <a href={education.fields.institutionLink} target='_blank' className='hover:text-slate-300'>
                          {education.fields.institution} · {education.fields.location} ↗
                        </a>
                        :
                        <span>{education.fields.institution} · {education.fields.location}</span>
                      }
                    </div>
                  </div>
              )}
            </div>
          </section>

          <section id='experience' ref={experienceSectionRef}>
            <div className='mb-3 text-xl uppercase text-slate-200 font-bold'>Experience</div>
            <div>
              {experiences
                .sort((a,b) => new Date(b.fields.startDate) - new Date(a.fields.startDate))
                .map((experience, index) =>
                  <div key={index} className='my-12 first:mt-0'>
                    <div className='text-xs  text-slate-400 uppercase font-semibold my-2'>
                      <span>{new Date(experience.fields.startDate).toLocaleDateString()}</span> - <span>{experience.fields.endDate ? new Date(experience.fields.endDate).toLocaleDateString() : 'Present'}</span>
                    </div>
                    <div className='text-lg text-slate-200'>{experience.fields.title}</div>
                    <div className='text-xs text-slate-400'>
                      {experience.fields.companyLink ?
                        <a href={experience.fields.companyLink} className='hover:text-slate-300' target='_blank'>{experience.fields.company} · {experience.fields.location} ↗</a>
                        :
                        <span>{experience.fields.company} · {experience.fields.location}</span>
                      }
                    </div>
                    <div className='text-sm text-slate-400 my-4'>{experience.fields.description}</div>

                    <ul className="flex flex-wrap gap-1">
                      {experience.fields.technologies &&
                        experience.fields.technologies.map((technology, index) =>
                          <TechnologyTag key={index} technology={technology} />
                        )
                      }
                    </ul>
                  </div>
              )}
            </div>
          </section>

          <section id='projects' ref={projectsSectionRef}>
            <div className='mb-3 text-xl uppercase text-slate-200 font-bold'>Projects</div>
            
            <div>
              {projects
                .sort((a,b) => new Date(b.fields.date) - new Date(a.fields.date))
                .map((project, index) =>
                  <div key={index} className='my-12 first:mt-0'>
                    <Project project={project} />
                  </div>
              )}
            </div>
          </section>
        </ul>
      </main>
    </div>
  )
}
