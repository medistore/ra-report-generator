# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Tools Used:

- React JS
- SASS
- Typescript
- pdfmake
- Html2Canvas
- Netlify

### Working of the application

When a user visits the website, they will find a Print button that allows them to generate a PDF report. This process involves several steps, including an API call to the FBI crime dataset to retrieve data. 

The data is then processed to create a Line Chart, which uses the Highcharts library to plot the count of Burglaries on the Y-Axis and the year on the X-Axis. Once the chart is generated, it is added to the PDF report using the PDFMake library. 

The report includes the date of generation, which is the same as the report generation date. The graph visible in the report is identical to the one generated at runtime in the previous step.

The page numbers in the report are dynamic and will update automatically as more data is added. For this particular report, there is only one page, so the page count is displayed as "1 of 1".