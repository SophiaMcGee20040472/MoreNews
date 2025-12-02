# MoreNews Redesign (Work in Progress)

---

## About the Project
MoreNews is a news website inspired by Hacker News. It’s built with **React**, **Chakra UI**, and the **Hacker News API**. The goal was to create a clean, easy-to-use site that works well on phones, tablets, and laptops. I mainly focused on laptop and mobile screens, so it may not be fully optimized for large monitors yet.  

While redesigning the front page, I realized I needed to link to other pages and create those pages to maintain navigation. This quickly led me to ensure a consistent design across the entire site. I used the Hacker News API to populate the app with real data, which was really fun to work with.  

I also included paginatation that included arrow navigation left and right and items per page filer along with item page result. I decided the last to should disappear on small screen as there was a lot going on and basic arrow navigation was a better decision. I battled a long time with pagination over the last few days I kept coming back to it as it was duplicating numbers but it was actually a very easy fix in the end.

There are bits of UI I am not happy with if something is slightly off aligned I havent gotten to fine fine tuning it.

I also added some minor Storybook components and React testing to include basic testing coverage. I really enjoyed building this app and plan to continue making improvements.

---

## Tools Used
- **React** (for building the website)
- **Chakra UI** (for design and styling)
- **Storybook** (for testing parts of the website)
- **Hacker News API** (for getting news stories)
- **Vercel** (for hosting the live site)

---

## How to Set Up the Project

### What You Need
- Node.js (version 18 or newer)
- npm or yarn

### Steps
1. Create a new React project:
   ```bash
   npx create-react-app morenews
   cd morenews
   ```

2. Install Chakra UI (use this exact version for Storybook to work):
   ```bash
   npm install @chakra-ui/react@^2.8.0 @emotion/react @emotion/styled framer-motion
   ```

3. Install Storybook:
   ```bash
   npx storybook@latest init
   ```

4. Start Storybook to test parts of the website:
   ```bash
   npm run storybook
   ```

---

## How to Use Storybook
Storybook helps you test parts of the website separately.

1. Create a file named `Button.stories.js` in the `src/components` folder.
2. Add this example code to test a button:
   ```javascript
   import React from 'react';
   import { Button } from './Button';

   export default {
     title: 'Components/Button',
     component: Button,
   };

   const Template = (args) => <Button {...args} />;

   export const PrimaryButton = Template.bind({});
   PrimaryButton.args = {
     label: 'Click Me',
   };
   ```
3. Run Storybook again to see your button:
   ```bash
   npm run storybook
   ```

---

## Live Site
You can see the live version of MoreNews here:
👉 [https://morenews.vercel.app/](https://morenews.vercel.app/)

---

## How to Deploy to Vercel
Vercel makes it easy to put your website online.

1. Push your code to a GitHub or GitLab repository.
2. Go to [Vercel](https://vercel.com/) and sign in.
3. Click **"New Project"** and connect your repository.
4. Vercel will automatically set up your project. Click **"Deploy"**.
5. Wait a few minutes. Your site will be live at a Vercel URL (like `https://your-project.vercel.app`).

---

## Screenshots

### Desktop View
![Desktop View](https://github.com/user-attachments/assets/0b6ee4ce-bc5e-498f-b0fb-c2c5d6deb9f2)
*The homepage on a computer screen.*

### Tablet View
![Tablet View](https://github.com/user-attachments/assets/d0039936-c800-4be8-8f70-c7051b7c627b)
*The homepage on a tablet.*

### Mobile View
![Mobile View](https://github.com/user-attachments/assets/c71bb979-d468-4b61-bd83-76752a485f08)
*The homepage on a phone.*

### Card Toggle
![Card Toggle](https://github.com/user-attachments/assets/077eec42-8ea8-4171-82e0-941dda6b0dcd)
*Cards with a toggle for changing how they look.*

### Pagination
![Pagination](https://github.com/user-attachments/assets/15601c15-19bb-4a9f-8181-6f63988f2a45)
*Pagination for moving between pages.*

### Spinner
![Spinner](https://github.com/user-attachments/assets/76e56c96-c7d6-413b-97c0-6650804579f9)
*Loading spinner.*

### New Stories Page
![New Stories Page](https://github.com/user-attachments/assets/895e4631-0c29-4de8-acf8-063d250b4700)
*Page for new stories.*

### Submit Page
![Submit Page](https://github.com/user-attachments/assets/825e8464-9388-4443-be32-0ce55df08eac)
*Page for submitting new stories.*

### Comments Page (Work in Progress)
![Comments Page](https://github.com/user-attachments/assets/0efc5012-ca5f-4952-a5b0-d4421cae5106)
*Comments section (still being worked on).*

---

## Storybook Screenshots

### Storybook Components
![Storybook Components](https://github.com/user-attachments/assets/23c07988-d07c-4dec-9129-b866d9263407)
*Testing components in Storybook.*

### Storybook UI
![Storybook UI](https://github.com/user-attachments/assets/01603fd4-6a4e-4250-a586-9272c7e1ecd7)
*The Storybook interface.*

### Storybook Examples
![Storybook Examples](https://github.com/user-attachments/assets/d91e7b72-8936-4969-8755-770765545c92)
*More examples of components in Storybook.*
