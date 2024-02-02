'use client';

import { useEffect, useRef, useState } from 'react'
import ContentfulImage from './components/ContenfulImage';
import TechnologyTag from './components/TechnologyTag';
import Project from './components/Project';
import Image from 'next/image';
import githubLogo from '../public/github-logo.svg';
import threadsLogo from '../public/threads-logo.svg';
import linkedinLogo from '../public/linkedin-logo.svg';
import styles from './page.module.css';
import Card from './components/Card';

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
  const scrollRef = useRef()
  const aboutLinkRef = useRef()
  const aboutSectionRef = useRef()
  const educationLinkRef = useRef()
  const educationSectionRef = useRef()
  const experienceLinkRef = useRef()
  const experienceSectionRef = useRef()
  const projectsLinkRef = useRef()
  const projectsSectionRef = useRef()

  const localeStringOptions = {
    year: 'numeric',
    month: 'long'
  }

  function areDatesSameMonth(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  }

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
  useEffect(() => {
    const highlightLink = () => {
      if (
        aboutLinkRef.current.classList.contains(
          styles.nav_itemActive
        )
      ) {
        aboutLinkRef.current.classList.remove(
          styles.nav_itemActive
        )
      }

      if (educationLinkRef.current.classList.contains(
        styles.nav_itemActive
        )
      ) {
        educationLinkRef.current.classList.remove(
          styles.nav_itemActive
        )
      }

      if (
        experienceLinkRef.current.classList.contains(
          styles.nav_itemActive
        )
      ) {
        experienceLinkRef.current.classList.remove(
          styles.nav_itemActive
        )
      }

      if (
        projectsLinkRef.current.classList.contains(
          styles.nav_itemActive
        )
      ) {
        projectsLinkRef.current.classList.remove(
          styles.nav_itemActive
        )
      }

      if (
        aboutSectionRef.current.getBoundingClientRect().bottom >=0
      ) {
        aboutLinkRef.current.classList.add(
          styles.nav_itemActive
        )
      } else if (
        educationSectionRef.current.getBoundingClientRect().bottom >=0
      ) {
        educationLinkRef.current.classList.add(
          styles.nav_itemActive
        )
      } else if (
        experienceSectionRef.current.getBoundingClientRect().bottom >=0
      ) {
        experienceLinkRef.current.classList.add(
          styles.nav_itemActive
        )
      } else {
        projectsLinkRef.current.classList.add(
          styles.nav_itemActive
        )
      }
    }

    const handleScroll = e => {
      highlightLink()
    }
    const scrollRefCurrent = scrollRef.current
    document.addEventListener('scroll', handleScroll)

    highlightLink()
    return () => {
      scrollRefCurrent.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Spotlight
  const mouseMoveEvent = (e) => {
    const { clientX, clientY } = e;
    
    spotlightRef.current.style.background = `radial-gradient(circle at ${clientX}px ${clientY}px, #00000000 10px, #000000ee 350px)`
  }
  useEffect(() => {
    const spotlightRefCurrent = spotlightRef.current
  
    if (spotlightRefCurrent) {
      spotlightRefCurrent.addEventListener("mousemove", mouseMoveEvent)
    }

    return () => {
      spotlightRefCurrent.removeEventListener("mousemove", () => {})
    }
  }, [spotlightRef])

  return (
    <div ref={scrollRef} className="mx-auto px-6 bg-slate-900 lg:flex lg:px-36 lg:gap-3">
      <div ref={spotlightRef}></div>
      <header className='lg:w-1/2 lg:sticky lg:top-0 lg:max-h-screen py-12 lg:py-24 lg:flex lg:flex-col lg:justify-between text-slate-400'>
        <div className='flex flex-col gap-3'>
          <div className='text-4xl text-slate-100 font-bold'>{personalInfo.name}</div>
          <div className='text-xl text-slate-200 font-medium'>{personalInfo.title}</div>
          <div className='text-md'>{personalInfo.bio}</div>

          <nav className='hidden mt-24 lg:flex flex-col gap-3 text-xs uppercase list-none tracking-widest'>
            <li className={styles.nav_item} ref={aboutLinkRef}>
              <a href='#about' className='hover:text-slate-200'>About</a>
            </li>

            <li className={styles.nav_item} ref={educationLinkRef}>
              <a href='#education' className='hover:text-slate-200'>Education</a>
            </li>

            <li className={styles.nav_item} ref={experienceLinkRef}>
              <a href='#experience' className='hover:text-slate-200'>Experience</a>
            </li>

            <li className={styles.nav_item} ref={projectsLinkRef}>
              <a href='#projects' className='hover:text-slate-200'>Projects</a>
            </li>
          </nav>
        </div>

        <div className='flex flex-row gap-3 mt-12'>
          <a href='https://github.com/Recour' target='_blank'>
            <Image src={githubLogo} alt='Github' width={30} height={30} className='invert' />
          </a>

          <a href='https://www.linkedin.com/in/viktor-recour-784267167/' target='_blank'>
            <Image src={linkedinLogo} alt='LinkedIn' width={30} height={30} className='invert' />
          </a>

          <a href='https://www.threads.net/@viktorrecour' target='_blank'>
            <Image src={threadsLogo} alt='Threads' width={30} height={30} className='invert' />
          </a>
        </div>
      </header>

      <main className='lg:w-1/2 lg:py-24'>
        <section id='about' ref={aboutSectionRef} className='text-sm text-slate-400'>
          {personalInfo.aboutMe}
        </section>

        <section id='education' ref={educationSectionRef} className='mt-24'>
          {educations
            .sort((a,b) => new Date(b.fields.graduationDate) - new Date(a.fields.graduationDate))
            .map((education, index) =>
              <div key={index} className='my-12 first:mt-0'>
                <Card link={education.fields.institutionLink}>
                  <div className='flex'>
                    <div className='w-1/3'>
                      <div className='text-xs  text-slate-400 uppercase font-medium'>
                        {new Date(education.fields.graduationDate).toLocaleString('en-US', localeStringOptions)}
                      </div>
                    </div>

                    <div className='w-2/3 ml-9'>
                      <div className='text-lg text-slate-200 leading-5 group-hover:text-cyan-200 group-hover:transition'>{education.fields.degree}</div>
                      <div className='text-xs text-slate-400 mt-1'>
                        {education.fields.institution} · {education.fields.location}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
          )}
        </section>

        <section id='experience' ref={experienceSectionRef} className='mt-24'>
            {experiences
              .sort((a,b) => new Date(b.fields.startDate) - new Date(a.fields.startDate))
              .map((experience, index) =>
                <div key={index} className='my-12 first:mt-0'>
                  <Card link={experience.fields.companyLink}>
                    <div className='flex'>
                      <div className='w-1/3'>
                        <div className='text-xs  text-slate-400 uppercase font-medium'>
                          <span>{new Date(experience.fields.startDate).toLocaleString('en-US', localeStringOptions)}</span>
                          {!areDatesSameMonth(new Date(experience.fields.startDate), new Date(experience.fields.endDate)) &&
                            <span>
                              <span> - </span>
                              <span>{experience.fields.endDate ? new Date(experience.fields.endDate).toLocaleString('en-US', localeStringOptions) : 'Present'}</span>
                            </span>
                          }
                        </div>
                      </div>

                      <div className='w-2/3 ml-9'>
                        <div className='text-lg text-slate-200 leading-5 group-hover:text-cyan-200 group-hover:transition'>{experience.fields.title}</div>
                        <div className='text-xs text-slate-400 mt-1'>
                          {experience.fields.company} · {experience.fields.location}
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
                    </div>
                  </Card>
                </div>
            )}
        </section>

        <section id='projects' ref={projectsSectionRef} className='mt-24'>
          {projects
            .sort((a,b) => new Date(b.fields.date) - new Date(a.fields.date))
            .map((project, index) =>
              <div key={index} className='my-6 first:mt-0 last:mb-0'>
                <Project project={project} />
              </div>
          )}
        </section>
      </main>
    </div>
  )
}
