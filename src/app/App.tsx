import { Component, For } from 'solid-js';
import { colors, sections } from '../config';
import Button, { ButtonType, isButton } from './button';
import Experiences, { Experience } from './experinces';
import Links, { Link } from './links';
import Profile, { Share, ThemeSwitch } from './profile';

export type Sections = {
  [key: string]: Links | Experiences | ButtonType;
};

export interface Experiences {
  experiences: Experience[];
  default_opened?: boolean;
}

export interface Links {
  links: Link[];
  default_opened?: boolean;
}

export function isLinks(obj: any): obj is Links {
  return obj.links !== undefined;
}

export function isExperiences(obj: any): obj is Experiences {
  return obj.experiences !== undefined;
}

const App: Component = () => {

  document.documentElement.classList.add(colors.bg.main);

  // const title = document.createElement("title");
  // title.innerHTML = webpage_config.title;

  // const ogTitle = document.createElement("meta");
  // ogTitle.setAttribute("property", "og:title");
  // ogTitle.setAttribute("content", webpage_config.title);

  // const desc = document.createElement("meta");
  // desc.setAttribute("name", "description");
  // desc.setAttribute("content", webpage_config.desc);

  // const ogDesc = document.createElement("meta");
  // ogDesc.setAttribute("property", "og:description");
  // ogDesc.setAttribute("content", webpage_config.desc);

  // const keywords = document.createElement("meta");
  // keywords.setAttribute("name", "keywords");
  // keywords.setAttribute("content", webpage_config.keywords);

  // const profileFirstname = document.createElement("meta");
  // profileFirstname.setAttribute("property", "profile:first_name");
  // profileFirstname.setAttribute("content", base_profile.first_name);

  // const profileLastname = document.createElement("meta");
  // profileLastname.setAttribute("property", "profile:last_name");
  // profileLastname.setAttribute("content", base_profile.last_name);

  // const commentSection = document.createComment(" Generated Fields ");
  // document.head.appendChild(commentSection);

  // document.head.appendChild(title);
  // document.head.appendChild(desc);
  // document.head.appendChild(keywords);
  // document.head.appendChild(ogTitle);
  // document.head.appendChild(ogDesc);
  // document.head.appendChild(profileFirstname);
  // document.head.appendChild(profileLastname);

  // if (extended_profile.username) {
  //   const profileUsername = document.createElement("meta");
  //   profileUsername.setAttribute("property", "profile:username");
  //   profileUsername.setAttribute("content", extended_profile.username);
  //   document.head.appendChild(profileUsername);
  // }

  // if (extended_profile.gender) {
  //   const profileGender = document.createElement("meta");
  //   profileGender.setAttribute("property", "profile:gender");
  //   profileGender.setAttribute("content", extended_profile.gender);
  //   document.head.appendChild(profileGender);
  // }

  return (
    <>
      <nav class="relative">
        <div class="w-full text-center">
          <a href="/" class="text-sm text-[#4ea8ed] font-mono">|attach|</a>
        </div>
        <Share class="absolute left-[10px] top-[-9px] block sm:hidden" />
        <ThemeSwitch class="absolute right-[10px] top-[-9px] block sm:hidden" />
      </nav>
      <main class={`
        ${colors.text.base}
      `}>
        <Profile />
        {Object.keys(sections).length > 1 &&
          <For each={Object.keys(sections)}>
            {(sectionName) => {
              const section = sections[sectionName];
              if (isButton(section)) {
                return (
                  <Button url={section.url} download_name={section.download_name}>{sectionName}</Button>
                );
              } else if (isLinks(section)) {
                return (
                  <Links title={sectionName} linksList={section.links} default_opened={section.default_opened || false} />
                );
              } else if (isExperiences(section)) {
                return (
                  <Experiences title={sectionName} experiences={section.experiences} default_opened={section.default_opened || false} />
                );
              }
              return <></>;
            }}
          </For>
        }
        {Object.keys(sections).length == 1 &&
          <For each={Object.keys(sections)}>
            {(sectionName) => {
              const section = sections[sectionName];
              if (isButton(section)) {
                return (
                  <Button url={section.url} download_name={section.download_name}>{sectionName}</Button>
                );
              } else if (isLinks(section)) {
                return (
                  <Links title={sectionName} linksList={section.links} solo={true} default_opened={true} />
                );
              } else if (isExperiences(section)) {
                return (
                  <Experiences title={sectionName} experiences={section.experiences} solo={true} default_opened={true} />
                );
              }
              return <></>;
            }}
          </For>
        }
        <footer>
          <div class={`px-[20px] sm:px-[60px] flex align-center items-center py-[30px] ${colors.text['link-content']}`}>
            <a href="https://github.com/ZackarySantana/Attach" target="_blank">
              <p class="text-sm">Putting the power of connecting in to the hands of the user. Theme <code>{colors.name}</code></p>
              <h3>Click here to make your own <span class="text-[#4ea8ed] font-mono">|attach|</span></h3>
            </a>
          </div>
        </footer>
      </main>
    </>
  );
};

export default App;
