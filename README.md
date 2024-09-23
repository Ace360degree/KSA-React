
## Kuwal Sanam Architect
KSA was Initially developed on Codeigniter Framework. Which was later migrated to React Js using [`Next.js`](https://nextjs.org/). Many of the code were changed and Manupilated to be copactible with React Js. 

## Libraries and Dependencies
Please check the `.env` file for Libraries and Dependencies.

## Assets and Media
Primary Images such as Logos and Misc images can be found in `public/images/` folder.  External Images ie. Projects & Ideas are called from `.env => SITE_URL`. Make sure to update the `.env` file when the URL for Admin Panel is changed.

## Admin Panel and Assets URL
Dynamic Assets/Media such as Files and Images are uploaded from [`Admin panel`](https://360clients.in/aceks/admin)
The Uploaded Assets are stored in this The [`Images Folder`](https://360clients.in/aceks/admin)

## Possible Bugs and Glitches
Usage of React Hooks such as UseState() and UseRef() is recommended instead of using document.querySelector() or document.getElementById(). This App uses Global State Management Libraries such as Zustand, Redux (unused) and UseContextAPI.

## Development Guide
For Development Purposes, the App is Uploaded on [`Vercel`](https://ksa-react.vercel.app/). Lastest Commits are automatically deployed. Please check the Vercel Version of the App before making changes on the LIVE URL.

