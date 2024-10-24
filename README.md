# Day-By-Day

## Project Description

<p align="center">An app to consume a fake api simulating social media</p>

# Table Content

 <p align="center">
 <a href="#features">Features</a> •
 <a href="#technologies">Technologies</a> •
 <a href="#demo">Demo</a> •
 <a href="#prerequisites">Prerequisites</a> •
 <a href="#initialization">Project Initialization</a> •
 <a href="#autor">Autor</a> 
</p>

### Features

- [x] Listing posts on home page
- [x] See specific user posts
- [x] Languages with i18n
- [x] Page to change auth user info
- [x] Loading handling with animated spinner
- [x] Error handling with not found messages
- [x] E2E tests with Cypress

### Technologies

The following tools were used in building the project:

- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [Shadcnui](https://ui.shadcn.com/)
- [Lucide](https://lucide.dev/)
- [Tanstack Query (React Query)](https://tanstack.com/query/latest)
- [Next.js](https://nextjs.org/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [React Hook Form](https://react-hook-form.com/)
- [Cypress](https://www.cypress.io/)

### Demo

This application was hosted by [Vercel](https://vercel.com/) and can be found [here](https://day-by-day-tau.vercel.app/).

### Prerequisites:

- Node.js 18.17 or later: Ensure you have this version installed on your system. You can download it from the official Node.js website: https://nodejs.org/en
- A code editor: Choose a suitable editor like Visual Studio Code, Sublime Text, or Atom.

### Initialization:

1. Open your terminal and navigate to the target root directory.

2. Clone the project with git clone:

```
git clone git@github.com:alex-cerlini/day-by-day.git
```

3. Run the following command to install the dependencies:
   `npm i`

4. Create .env file on root of the project with the following keys and fullfil with the api info:

```
API_BASE_URL=
```

5. You're ready to go. Just run the following command: `npm run dev`

### End2End

#### Prerequisite

To run the end 2 end tests, first do the <a href="#initialization">Project Initialization</a> step

#### Initialization

1. Run in separated terminal the following command: `npm run cy:open`
2. In the new window, click on `E2E Testing`
3. Choose your fav browser then click on `Start E2E Testing in Chrome`
4. In the new window, choose the test and enjoy.

---

<p align="center" id="autor">
  Made with <span style="color: red;">♥</span> by <a href="https://github.com/alex-cerlini">Alexander Andrade Cerlini</a>
</p>
