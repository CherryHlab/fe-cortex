# Cortex-x-e2e
## Getting started
### Installing Cypress
First, make sure you have all the (system requirements.)[https://docs.cypress.io/app/get-started/install-cypress#System-requirements]

#### Install
Install Cypress via your preferred package manager. This will install Cypress locally as a dev dependency for your project.
```bash
npm install cypress --save-dev
```
or
```bash
yarn add cypress --dev
```
or
```bash
pnpm add cypress --save-dev
```
Make sure you have Node.js installed and that you have already run npm init or have a node_modules folder or package.json file in the root of your project to ensure Cypress is installed in the correct directory.

### System requirements
#### Operating System
Cypress is a desktop application that is installed on your computer. The desktop application supports these operating systems:
- macOS 10.15 and above (Intel or Apple Silicon 64-bit (x64 or arm64)).
- Linux Ubuntu 20.04 and above, Fedora 40 and above, and Debian 11 and above (x64 or arm64) (see Linux Prerequisites down below).
Cypress deprecated the use of Node.js 16.x in Cypress 13.0.0. We recommend that users update to at least Node.js 18.x. For related reasons, Cypress deprecates the use of Linux operating systems with library glibc versions 2.17 - 2.27. The Linux CLI command ldd --version displays your glibc version.
- Windows 10 and above (x64).

#### Node.js
Cypress requires Node.js in order to install. We support the versions listed below:
- Node.js 18.x, 20.x, 22.x and above

Cypress generally aligns with (Node's release schedule.)[https://github.com/nodejs/Release]

#### Installing Node.js

Follow the instructions on (Download Node.js)[https://nodejs.org/en/download] to download and install (Node.js.)[https://nodejs.org/]

If you are using a (Cypress Docker image)[https://docs.cypress.io/app/continuous-integration/overview#Cypress-Docker-variants], you will find a fixed version of Node.js is pre-installed in the image. You select the Node.js version using the Docker image tag.

# Open the App
## cypress open
You can open Cypress from your project root using one of the following commands, depending on the package manager (npm, Yarn or pnpm) you are using:

```bash
npx cypress open
```
or
```bash
yarn cypress open
```
or
```bash
pnpm cypress open
```
After a moment, the Cypress Launchpad will open.
