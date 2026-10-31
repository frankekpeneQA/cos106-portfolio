# My Miva Journey — Frank Ekara

A responsive, multi-page student portfolio for COS 106 – Introduction to Web Technologies. The portfolio presents Frank Ekara's Software Engineering studies at Miva Open University and his developing interest in Quality Assurance.

## Pages
- `index.html` — homepage and introduction
- `about.html` — education, career aspirations, skills and interests
- `projects.html` — three sample QA practice projects and a testing workflow table
- `planner.html` — interactive task planner (localStorage)
- `contact.html` — contact details and client-side form validation

## Technologies
HTML5, external CSS3, and vanilla JavaScript. The layout uses CSS Grid/Flexbox, responsive media queries, transitions, semantic elements, tables, links, lists, and a profile image.

## Run locally
Open `index.html` in a browser, or open this folder in Visual Studio Code and use the Live Server extension.

## Publish with GitHub Pages
1. Create a public GitHub repository named `my-miva-journey`.
2. Upload the contents of this folder (not the enclosing folder) so `index.html` is in the repository root.
3. In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
4. After deployment, the site URL will be `https://YOUR-GITHUB-USERNAME.github.io/my-miva-journey/`.

## Notes
- The contact form performs browser-side validation only; it does not transmit messages to an email account or server.
- Academic planner tasks are saved in the current browser's local storage, not synced across devices.
- The project descriptions are presented as learning/practice examples, not commercial client claims.
