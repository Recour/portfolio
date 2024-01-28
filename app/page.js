'use client';

import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react'
import ContentfulImage from './components/ContenfulImage';
import TechnologyTag from './components/TechnologyTag';
import Project from './components/Project';

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

  const backgroundRef = useRef()
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
  useEffect(() => {
    const highlightLink = () => {
      if (
        aboutLinkRef.current.classList.contains(
          styles.left__content__list__itemActive
        )
      ) {
        aboutLinkRef.current.classList.remove(
          styles.left__content__list__itemActive
        )
      }

      if (educationLinkRef.current.classList.contains(
        styles.left__content__list__itemActive
        )
      ) {
        educationLinkRef.current.classList.remove(
          styles.left__content__list__itemActive
        )
      }

      if (
        experienceLinkRef.current.classList.contains(
          styles.left__content__list__itemActive
        )
      ) {
        experienceLinkRef.current.classList.remove(
          styles.left__content__list__itemActive
        )
      }

      if (
        projectsLinkRef.current.classList.contains(
          styles.left__content__list__itemActive
        )
      ) {
        projectsLinkRef.current.classList.remove(
          styles.left__content__list__itemActive
        )
      }

      if (
        rightContentRef.current.scrollTop >= projectsSectionRef.current.offsetTop
      ) {
        projectsLinkRef.current.classList.add(
          styles.left__content__list__itemActive
        )
      } else if (
        rightContentRef.current.scrollTop >= experienceSectionRef.current.offsetTop
      ) {
        experienceLinkRef.current.classList.add(
          styles.left__content__list__itemActive
        )
      } else if (
        rightContentRef.current.scrollTop >= educationSectionRef.current.offsetTop
      ) {
        educationLinkRef.current.classList.add(
          styles.left__content__list__itemActive
        )
      } else {
        aboutLinkRef.current.classList.add(
          styles.left__content__list__itemActive
        )
      }
    }

    const handleScroll = e => {
      highlightLink()
    }
    const contentRefCurrent = rightContentRef.current
    contentRefCurrent.addEventListener('scroll', handleScroll)

    highlightLink()
    return () => {
      contentRefCurrent.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Gradient that follows mouse movements
  const mouseMoveEvent = (e) => {
    backgroundRef.current.style.setProperty("--x", e.clientX)
    backgroundRef.current.style.setProperty("--y", e.clientY)
  }
  useEffect(() => {
    const backgroundRefCurrent = backgroundRef.current
    if (backgroundRefCurrent) {
      backgroundRefCurrent.addEventListener("mousemove", mouseMoveEvent)
    }

    return () => {
      backgroundRefCurrent.removeEventListener("mousemove", () => {})
    }
  }, [backgroundRef])

  return (
    <main ref={backgroundRef} className={styles.main}>
      <div className={styles.left}>
        <div className={styles.left__content}>
          <div className={styles.left__content__highlight}>
            {personalInfo.profilePicture && 
              <ContentfulImage image={personalInfo.profilePicture} alt='Profile picture' width={200} height={200} />
            }
            
            <h1>
              <b>{personalInfo.name}</b>
            </h1>
            <h3>{personalInfo.title}</h3>
            <p className={styles.left__content__highlight__bio}>
              {personalInfo.bio}
            </p>
          </div>

          <p className={styles.left__content__list}>
            <li
              className={styles.left__content__list__item}
              ref={aboutLinkRef}
            >
              <a href='#about'>About</a>
            </li>

            <li
            className={styles.left__content__list__item}
            ref={educationLinkRef}
          >
            <a href='#education'>Education</a>
          </li>

            <li
              className={styles.left__content__list__item}
              ref={experienceLinkRef}
            >
              <a href='#experience'>Experience</a>
            </li>

            <li
              className={styles.left__content__list__item}
              ref={projectsLinkRef}
            >
              <a href='#projects'>Projects</a>
            </li>
          </p>

          <div className={styles.left__content__socials}>
            <svg>
              <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'></path>
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.right} ref={rightContentRef}>
        <ul className={styles.right__content}>
          <section id='about' ref={aboutSectionRef} className={styles.right__content__section}>
            <h2 className={styles.right__content__section__title}>About</h2>
            <p>{personalInfo.aboutMe}</p>
          </section>

          <section id='education' ref={educationSectionRef} className={styles.right__content__section}>
          <h2 className={styles.right__content__section__title}>Education</h2>
          {educations
            .sort((a,b) => new Date(b.fields.graduationDate) - new Date(a.fields.graduationDate))
            .map((education, index) =>
              <div key={index} className={styles.right__content__section__experience}>
                <h3>{education.fields.degree}</h3>
                <p>
                  <span>{education.fields.institution}</span> - <span>{education.fields.location}</span>
                </p>
                <sup>
                  {new Date(education.fields.graduationDate).toLocaleDateString()}
                </sup>
              </div>
          )}
        </section>

          <section id='experience' ref={experienceSectionRef} className={styles.right__content__section}>
            <h2 className={styles.right__content__section__title}>Experience</h2>
            {experiences
              .sort((a,b) => new Date(b.fields.endDate) - new Date(a.fields.endDate))
              .map((experience, index) =>
                <div key={index} className={styles.right__content__section__experience}>
                  <h3>{experience.fields.title}</h3>
                  <p>
                    <span>{experience.fields.company}</span> - <span>{experience.fields.location}</span>
                  </p>
                  <sup>
                    <span>{new Date(experience.fields.startDate).toLocaleDateString()}</span> - <span>{experience.fields.endDate ? new Date(experience.fields.endDate).toLocaleDateString() : 'Present'}</span>
                  </sup>
                  <p>{experience.fields.description}</p>

                  <div className={styles.technology_tag_container}>
                    {experience.fields.technologies &&
                      experience.fields.technologies.map((technology, index) =>
                        <TechnologyTag key={index} technology={technology} />
                      )
                    }
                  </div>
                </div>
            )}
          </section>

          <section id='projects' ref={projectsSectionRef} className={styles.right__content__section}>
            <h2 className={styles.right__content__section__title}>Projects</h2>
            
            {projects
              .sort((a,b) => new Date(b.fields.date) - new Date(a.fields.date))
              .map((project, index) =>
                <Project key={index} project={project} />
            )}
          </section>
        </ul>
      </div>
    </main>
  )
}
