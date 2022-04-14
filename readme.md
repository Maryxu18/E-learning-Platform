# African Impact Challenge

This project contains a platform for the African Impact Challenge. The platform includes a central place for participants to connect with mentors, work with their team, ask questions, and learn.

This project exists because no existing solutions sufficiently fulfils the unique needs of the African Impact Challenge into a single platform. By integrating these features into a single platform, we can provide a more streamlined experience for Challenge participants.

## Installation

This projects requires the following software:
### Prerequisites:
1. [MongoDB Community Edition](https://www.mongodb.com/try/download/community) for your platform.
2. [Node.js version 14](https://nodejs.org/en/), including the node package manager.

Currently, this project supports all platforms, as long as a bash-compatible shell is installed.

### Setup
1. Clone this project: `git clone https://github.com/UTSCCSCC01/project-agilecats.git`
2. Go to the project folder: `cd project-agilecats`

If you only want the packages required to *run* the project, add the `--production` flag to the install commands below.

3. Install the required base packages: `npm install`
4. Install the required server packages: `(cd server && npm install)`. If `bcrypt` fails to install, try [this fix](https://stackoverflow.com/a/59546336/9074788).
5. Install the required client packages: `(cd client && npm install)`
6. Create and fill in the appropriate server onfiguration file(s) for your environment (production/test/development).
These files are in `server/src/configs` and are JSON-formatted.
7. Create the file `server/.env` and add a line with the port number, e.g. `PORT=3000`. Alternatively, set the `PORT` environment variable to the port number.
8. Run the server: `npm run start-server`


## Contributing

We welcome contributions to this project, provided that the academic deadline for the project submission has passed. The current deadline estimate is August 31, 2021. Until the deadline passes, contributions from non-team members will not be accepted.

#### To contribute a feature (with the project already set up):
1. Design a feature you want to add, or take a look at the Jira/GitHub issues page.
2. Create a fork of the project
3. Implement the feature, following the project style guide (see below) and source control workflow.
4. Write unit tests that cover every part of the feature. These are non-optional. Integration tests are preferred as well, but are not mandatory.
5. Submit a pull request to the `dev` branch, with an explanation of the changes.

#### To Contribute in other ways:
1. Open a GitHub issue with your contribution, whether that's a bug report, documentation issue, translation, etc.

## Style
This project follows the [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html) for JS code, and the relevant [Google Style Guide](https://google.github.io/styleguide/) for other languages. When adding a feature in a new language, include instructions for setting up an automatic formatter.

#### JS/JSX/TS/TSX formatting instructions
Write your code in TypeScript if possible. All of the above files are linted on commit, and can be linted manually by running `npm run lint-server`/`client`.

#### Markdown files
For `.md` files, follow a style similar to this file. Markdown cannot be formatted automatically.

## Source control workflow
This project uses git flow, starting in sprint 1. Create branches for features, and merge them into `dev` with the approval of at least 1 team member. Branches for Jira stories should contain the Jira story name. Requests to merge individual features into master will likely be rejected. Pull requests merged without approval may be rolled back. Commit messages must be meaningful.

### Commit messages
Commit messages should contain the related story name, followed by a colon, followed by the rest of the message. e.g. `AG-18: Add commit and push hooks. Remove and ignore OS-specific files`. Up to 3 issue references are allowed.
