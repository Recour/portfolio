'use client';

import { useCallback, useEffect, useRef, useState } from 'react'
import ContentfulImage from './components/ContentfulImage'
import TechnologyTag from './components/TechnologyTag'
import Project from './components/Project'
import Image from 'next/image'
import styles from './page.module.css'
import Card from './components/Card'
import ContentfulText from './components/ContentfulText'
import Spotlight from './components/Spotlight'
import throttle from './helpers/throttle'
import SectionTitle from './components/SectionTitle';

const contentful = require('contentful')

const client = contentful.createClient({
  space: 'gnilfgmj3mc9',
  environment: 'master',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
})

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState(null)
  const [educations, setEducations] = useState([])
  const [experiences, setExperiences] = useState([])
  const [projects, setProjects] = useState([])
  const [certificates, setCertificates] = useState([])
  const [meta, setMeta] = useState(null)

  const aboutLinkRef = useRef()
  const aboutSectionRef = useRef()
  const educationLinkRef = useRef()
  const educationSectionRef = useRef()
  const experienceLinkRef = useRef()
  const experienceSectionRef = useRef()
  const projectsLinkRef = useRef()
  const projectsSectionRef = useRef()
  const certificatesLinkRef = useRef()
  const certificatesSectionRef = useRef()

  const localeStringOptions = {
    year: 'numeric',
    month: 'short'
  }

  function areDatesSameMonth(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    )
  }

  // Personal info
  useEffect(() => {
    client.getEntry('4QvSOM4V73JdVEoDAjAlY7')
      .then((entry) => {
        setPersonalInfo(entry);
      })
      .catch(console.error)
  }, [])

  // Education
  useEffect(() => {
    client.getEntries({content_type: 'education'})
      .then((entry) => {
        setEducations(entry.items);
      })
      .catch(console.error)
  }, [])

  // Experience
  useEffect(() => {
    client.getEntries({content_type: 'experience'})
      .then((entry) => {
        setExperiences(entry.items);
      })
      .catch(console.error)
  }, [])

  // Projects
  useEffect(() => {
    client.getEntries({content_type: 'project'})
      .then((entry) => {
        setProjects(entry.items);
      })
      .catch(console.error)
  }, [])

  // Certificates
  useEffect(() => {
    client.getEntries({content_type: 'certificate'})
      .then((entry) => {
        setCertificates(entry.items);
      })
      .catch(console.error)
  }, [])

  // Meta
  useEffect(() => {
    client.getEntry('1e6DSVNeWdFC97yRfAYESp')
      .then((entry) => {
        setMeta(entry);
      })
      .catch(console.error)
  }, [])

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
        certificatesLinkRef.current.classList.contains(
          styles.nav_itemActive
        )
      ) {
        certificatesLinkRef.current.classList.remove(
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
      } else if (
        certificatesSectionRef.current.getBoundingClientRect().bottom >=0
      ) {
        certificatesLinkRef.current.classList.add(
          styles.nav_itemActive
        )
      } else {
        projectsLinkRef.current.classList.add(
          styles.nav_itemActive
        )
      }
    }

    highlightLink()

    const handleScroll = e => {
      highlightLink()
    }
    const throttledHandleScroll = throttle(handleScroll, 50)

    window.addEventListener('scroll', throttledHandleScroll)

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  return (
    <Spotlight className='px-6 lg:flex md:px-12 lg:px-24 lg:gap-3 xl:px-48 2xl:px-80 relative'>
      <header className='lg:w-1/2 lg:sticky lg:top-0 lg:max-h-screen py-12 md:py-24 lg:flex lg:flex-col lg:justify-between text-slate-400'>
        <div className='flex flex-col gap-3'>
          <div className='text-4xl text-slate-100 font-bold tracking-tight'>{personalInfo?.fields.name}</div>
          <div className='text-xl text-slate-200 font-medium'>{personalInfo?.fields.title}</div>
          <div className='text-md'>{personalInfo?.fields.bio}</div>

          <nav className='hidden mt-24 lg:flex flex-col gap-6 text-xs uppercase font-bold list-none tracking-widest'>
            <li className={styles.nav_item} ref={aboutLinkRef}>
              <a href='#about' className='hover:text-slate-200'>About</a>
            </li>

            <li className={styles.nav_item} ref={educationLinkRef}>
              <a href='#education' className='hover:text-slate-200'>Education</a>
            </li>

            <li className={styles.nav_item} ref={experienceLinkRef}>
              <a href='#experience' className='hover:text-slate-200'>Experience</a>
            </li>

            <li className={styles.nav_item} ref={certificatesLinkRef}>
              <a href='#certificates' className='hover:text-slate-200'>Certificates</a>
            </li>

            <li className={styles.nav_item} ref={projectsLinkRef}>
              <a href='#projects' className='hover:text-slate-200'>Projects</a>
            </li>
          </nav>
        </div>

        <div className='flex flex-row gap-3 mt-12 *:fill-slate-400 *:transition-all'>
          <a className='hover:fill-cyan-200' href='https://github.com/Recour' target='_blank' rel='noreferrer noopener'>
            <svg aria-label='GitHub' width='30' height='30' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 98 96'>
              <path d='M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z'/>
            </svg>
          </a>

          <a className='hover:fill-cyan-200' href='https://www.linkedin.com/in/viktor-recour-784267167/' target='_blank' rel='noreferrer noopener'>
            <svg aria-label='LinkedIn' xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24'>
              <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'/>
            </svg>
          </a>

          <a className='hover:fill-cyan-200' href='https://www.threads.net/@viktorrecour' target='_blank' rel='noreferrer noopener'>
            <svg aria-label='Threads' width='30' height='30' viewBox='0 0 192 192' xmlns='http://www.w3.org/2000/svg'>
              <path d='M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z'></path>
            </svg>
          </a>

          <a className='hover:fill-cyan-200' href='https://typehero.dev/@Recour' target='_blank' rel='noreferrer noopener'>
            <svg className='rounded' aria-label='TypeHero' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox='0 0 64 64'>
              <path d="M0 32v32h64.002V-.002H0zm51.577-2.55c1.625.406 2.865 1.128 4.003 2.306.59.63 1.463 1.778 1.534 2.052.02.08-2.763 1.95-4.45 2.997-.06.04-.305-.223-.58-.63-.823-1.2-1.686-1.717-3.007-1.808-1.94-.132-3.2.884-3.18 2.58 0 .498.07.792.274 1.2.427.884 1.22 1.412 3.708 2.49 4.582 1.97 6.542 3.27 7.76 5.12 1.36 2.062 1.666 5.354.742 7.802-1.016 2.662-3.535 4.47-7.08 5.07-1.097.193-3.698.163-4.876-.05-2.57-.457-5.008-1.727-6.512-3.393-.59-.65-1.737-2.347-1.666-2.47.03-.04.295-.203.59-.376l2.377-1.37 1.84-1.067.386.57c.538.823 1.717 1.95 2.428 2.326 2.042 1.077 4.846.924 6.227-.315.59-.538.833-1.097.833-1.92 0-.742-.09-1.067-.477-1.625-.498-.71-1.514-1.31-4.4-2.56-3.302-1.422-4.724-2.306-6.024-3.708-.752-.813-1.463-2.113-1.758-3.2-.244-.904-.305-3.17-.112-4.084.68-3.2 3.088-5.415 6.563-6.075 1.128-.213 3.75-.132 4.856.142zM36.552 32.12l.02 2.62h-8.33v23.67H22.35v-23.67h-8.33v-2.57l.07-2.64c.03-.04 5.1-.06 11.246-.05l11.185.03z" />
            </svg>
          </a>
        </div>
      </header>

      <main className='lg:w-1/2 pb-24 lg:py-24'>
        <section id='about' ref={aboutSectionRef} className='text-md text-slate-400 flex flex-col gap-6'>
          <SectionTitle text='About' />
          <ContentfulText document={personalInfo?.fields.about} />
        </section>

        <section id='education' ref={educationSectionRef} className='mt-24'>
          <SectionTitle text='Education' />
          {educations
            .sort((a,b) => new Date(b.fields.graduationDate) - new Date(a.fields.graduationDate))
            .map((education, index) =>
              <div key={index} className='mt-12 first:mt-0'>
                <Card link={education.fields.institutionLink}>
                  <div className='md:flex'>
                    <div className='md:w-1/5 lg:w-1/3 mb-4'>
                      <div className='text-xs  text-slate-400 uppercase font-medium'>
                        {new Date(education.fields.graduationDate).toLocaleString('en-US', localeStringOptions)}
                      </div>
                    </div>

                    <div className='md:w-4/5 lg:w-2/3 md:ml-9'>
                      <div className='text-lg text-slate-200 leading-5 group-hover:text-cyan-200 transition-all'>{education.fields.degree}</div>
                      <div className='text-xs text-slate-400 fill-slate-400 mt-1'>
                        {education.fields.institution} · {education.fields.location}
                        <svg className='inline mb-0.5 ml-1' xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 30 30' width='12' height='12'>
                          <path d='M 25.980469 2.9902344 A 1.0001 1.0001 0 0 0 25.869141 3 L 20 3 A 1.0001 1.0001 0 1 0 20 5 L 23.585938 5 L 13.292969 15.292969 A 1.0001 1.0001 0 1 0 14.707031 16.707031 L 25 6.4140625 L 25 10 A 1.0001 1.0001 0 1 0 27 10 L 27 4.1269531 A 1.0001 1.0001 0 0 0 25.980469 2.9902344 z M 6 7 C 4.9069372 7 4 7.9069372 4 9 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 21 26 C 22.093063 26 23 25.093063 23 24 L 23 14 L 23 11.421875 L 21 13.421875 L 21 16 L 21 24 L 6 24 L 6 9 L 14 9 L 16 9 L 16.578125 9 L 18.578125 7 L 16 7 L 14 7 L 6 7 z'/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
          )}
        </section>

        <section id='experience' ref={experienceSectionRef} className='mt-24 group/list'>
          <SectionTitle text='Experience' />
          {experiences
            .sort((a,b) => new Date(b.fields.startDate) - new Date(a.fields.startDate))
            .map((experience, index) =>
              <div key={index} className='mt-12 first:mt-0 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 transition-all'>
                <Card link={experience.fields.companyLink}>
                  <div className='md:flex'>
                    <div className='md:w-1/5 lg:w-1/3 mb-4'>
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

                    <div className='md: w-4/5 lg:w-2/3 md:ml-9'>
                      <div className='text-lg leading-5 text-slate-200 group-hover:text-cyan-200 transition-all'>{experience.fields.title}</div>
                      <div className='text-xs text-slate-400 fill-slate-400 mt-1'>
                        <span>
                          {experience.fields.company} · {experience.fields.location}
                        </span>
                        <svg className='inline mb-0.5 ml-1' xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 30 30' width='12' height='12'>
                          <path d='M 25.980469 2.9902344 A 1.0001 1.0001 0 0 0 25.869141 3 L 20 3 A 1.0001 1.0001 0 1 0 20 5 L 23.585938 5 L 13.292969 15.292969 A 1.0001 1.0001 0 1 0 14.707031 16.707031 L 25 6.4140625 L 25 10 A 1.0001 1.0001 0 1 0 27 10 L 27 4.1269531 A 1.0001 1.0001 0 0 0 25.980469 2.9902344 z M 6 7 C 4.9069372 7 4 7.9069372 4 9 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 21 26 C 22.093063 26 23 25.093063 23 24 L 23 14 L 23 11.421875 L 21 13.421875 L 21 16 L 21 24 L 6 24 L 6 9 L 14 9 L 16 9 L 16.578125 9 L 18.578125 7 L 16 7 L 14 7 L 6 7 z'/>
                        </svg>
                      </div>
                      <div className='text-sm text-slate-400 my-4'>{experience.fields.description}</div>

                      <ul className='flex flex-wrap gap-1'>
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
            )
          }
        </section>

        <section id='certificates' ref={certificatesSectionRef} className='mt-24 group/list'>
          <SectionTitle text='Certificates' />
          {certificates
            .sort((a,b) => new Date(b.fields.completionDate) - new Date(a.fields.completionDate))
            .map((certificate, index) =>
              <div key={index} className='my-12 lg:my-6 first:mt-0 last:mb-0 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 transition-all'>
                <Card link={certificate.fields.link.fields.link}>
                  <div className='md:flex'>
                    <div className='md:w-1/5 lg:w-1/3 mb-4'>
                      <div className='text-xs  text-slate-400 uppercase font-medium'>
                        {new Date(certificate.fields.completionDate).toLocaleString('en-US', localeStringOptions)}
                      </div>
                    </div>

                    <div className='md:w-4/5 lg:w-2/3 md:ml-9'>
                      <div className='text-lg leading-5 text-slate-200 group-hover:text-cyan-200 transition-all'>{certificate.fields.name}</div>
                      <div className='text-xs text-slate-400 fill-slate-400 mt-1'>
                        {certificate.fields.link.fields.text} · {certificate.fields.hours} hours
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
          )}
        </section>

        <section id='projects' ref={projectsSectionRef} className='mt-24 group/list'>
          <SectionTitle text='Projects' />
          {projects
            .sort((a,b) => new Date(b.fields.date) - new Date(a.fields.date))
            .map((project, index) =>
              <div key={index} className='my-12 lg:my-6 first:mt-0 last:mb-0 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 transition-all'>
                <Project project={project} />
              </div>
          )}
        </section>

        <section className='mt-24'>
          <div className='rounded-xl text-slate-400 text-sm'>
            <ContentfulText document={meta?.fields.description} />
          </div>
        </section>
      </main>
    </Spotlight>
  )
}
