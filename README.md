# Instagram DM Analyzer

### Objective
Be able to upload a simple IG DM JSON file and get metrics about the conversations

This app requires not database connection and is currently stored in an S3 bucket serving the webpage. The site makes no external requests and on refresh will clear the uploaded data.

Build using Material UI components.

### Installation
**Development**
Clone Repo
`npm install`
`npm start`

**Release**
`npm run build`
Deploy dist folder contents as you usually would.
