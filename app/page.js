'use client';

import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useRef } from "react"

export default function Home() {
  const contentRef = useRef()
  const aboutLinkRef = useRef()
  const aboutSectionRef = useRef()
  const experienceLinkRef = useRef()
  const experienceSectionRef = useRef()
  const projectsLinkRef = useRef()
  const projectsSectionRef = useRef()

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
        contentRef.current.scrollTop >= projectsSectionRef.current.offsetTop
      ) {
        projectsLinkRef.current.classList.add(
          styles.left__content__list__itemActive
        )
      } else if (
        contentRef.current.scrollTop >= experienceSectionRef.current.offsetTop
      ) {
        experienceLinkRef.current.classList.add(
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
    contentRef.current.addEventListener("scroll", handleScroll)

    highlightLink()
    return () => {
      contentRef.current.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const links = [
    {
      text: "About",
      url: "about",
      description:
        "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
      linkRef: aboutLinkRef,
      ref: aboutSectionRef,
    },
    {
      text: "Experience",
      url: "experience",
      description:
        "A collection of websites ranging from very basic to complex/complete that illustrate how to accomplish specific tasks within your Gatsby sites.",
      linkRef: experienceLinkRef,
      ref: experienceSectionRef,
    },
    {
      text: "Projects",
      url: "projects",
      description:
        "Learn how to add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
      linkRef: projectsLinkRef,
      ref: projectsSectionRef,
    },
  ]

  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <div className={styles.left__content}>
          <div className={styles.left__content__highlight}>
            <h1>
              <b>Viktor Recour</b>
            </h1>
            <h3>Full Stack Engineer at OTA Insight</h3>
            <p className={styles.left__content__highlight__bio}>
              This is a bio, explaining in short what I do and what I stand
              for
            </p>
          </div>

          <p className={styles.left__content__list}>
            {links.map(link => (
              <li
                key={link.url}
                className={styles.left__content__list__item}
                ref={link.linkRef}
              >
                <a href={`#${link.url}`}>{link.text}</a>
              </li>
            ))}
          </p>

          <div className={styles.left__content__socials}>
            <svg>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.right} ref={contentRef}>
        <ul className={styles.content__list}>
          {links.map(link => (
            <section key={link.url} id={link.url} ref={link.ref}>
              <h2>{link.text} ↗</h2>
              <p>{link.description}</p>
              <p>{link.description}</p>
              <p>{link.description}</p>
              <p>{link.description}</p>
              <p>{link.description}</p>
              <p>{link.description}</p>
              <p>{link.description}</p>
              <p>{link.description}</p>
              <p>{link.description}</p>
              <p>{link.description}</p>
              <p>{link.description}</p>
              <p>{link.description}</p>
            </section>
          ))}
        </ul>
      </div>
    </main>
  )
}
