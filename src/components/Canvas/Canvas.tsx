import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import html2canvas from "html2canvas";
import { useEffect } from "react";
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import { ReactComponent as RaLogo } from '../../images/Realassistai_Logo.svg';
import { ReactComponent as LocationSVG } from '../../images/location-share.svg';
import './Canvas.scss'
import "highcharts/css/highcharts.css";

// Register pdfMake fonts
pdfMake.fonts = {
  Poppins: {
    normal: `${window.location.protocol}//${window.location.host}/fonts/Poppins-Regular.ttf`,
    bold: `${window.location.protocol}//${window.location.host}/fonts/Poppins-Black.ttf`
  },
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
  },

};

HighchartsExporting(Highcharts);

export const Canvas = () => {

  // API call and creation of the chart.
  const getGraphData = async () => {
    const res = await fetch('https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2023&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv')

    const data = await res.json()

    const chartData = data.data.map((e: any) => {
      return [e.data_year, e.Burglary]
    })

    // Creation of Highcharts
    await Highcharts.chart("crime-chart-container", {
      chart: {
        animation: false,
        backgroundColor: '#FFFFFF',
        borderRadius: 13,
        margin: 80,
      },
      title: { text: "" },
      series: [{
        type: "line",
        data: chartData,
        color: '#1463FF',
        marker: {
          enabled: false
        },
        lineWidth: 3,
        showInLegend: false
      }],
      plotOptions: {
        area: {
          fillColor: 'white'
        },
        series: {
          states: {
            hover: {
              enabled: false
            }
          }

        },
      },
      tooltip: {
        enabled: false
      },
      xAxis: {
        title: {
          text: ''
        },
        lineWidth: 0.77,
        lineColor: '#BAC2DB',
        tickLength: 0,
        labels: {
          style: {
            fontSize: '20px'
          },
          x: 10
        }
      },
      yAxis: {
        title: {
          text: null
        },
        zoomEnabled: false,
        lineWidth: 0.77,
        startOnTick: true,
        labels: {
          style: {
            fontSize: '20px'
          },
          y: -0.2
        }
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false,
      },
    });

  }

  useEffect(() => {
    getGraphData()
  }, []);

  // handles click of the Print button.
  const handleExportToPdf = async () => {
    const chartContainer = document.getElementById("crime-chart-container")!;
    const ralogo = document?.getElementById("ra-logo");
    const locationLogo = document?.getElementById("location-logo");
    const graphWrapper = document?.getElementById("graph-wrapper")!;


    let graphWrapperCanvas = html2canvas(graphWrapper).then((canvas) => {
      return canvas.toDataURL()
    })

    if (chartContainer) {
      const ralogoSVG = ralogo?.querySelector("svg")?.outerHTML;
      const locationLogoSVG = locationLogo?.querySelector("svg")?.outerHTML;

      // Document properties required to generate PDF using pdfmake library.
      const docDefinition = {
        pageSize: 'A4',
        header: [
          {
            columns: [
              {
                svg: ralogoSVG,
                width: 100,
                alignment: 'left'
              },
              {
                text: '123 Main Street, Dover, NH 03820-4667',
                alignment: 'right',
                bold: true
              },
            ],
            margin: [16, 16, 16, 16]
          }
        ],
        content: [
          {
            canvas: [{
              type: 'rect',
              x: 0,
              y: 0,
              w: 563.35,
              h: 2.5,
              linearGradient: ['#005DFF', '#00A3FF', '#21DDFF']
            }],
            alignment: 'center'
          },
          {
            canvas: [{
              type: 'rect',
              x: 0,
              y: 0,
              w: 563.35,
              h: 130,
              linearGradient: ['#005DFF', '#00A3FF', '#21DDFF']
            }],
            margin: [-25, 16, 0, 0]
          },
          {
            canvas: [{
              type: 'rect',
              x: 0,
              y: 0,
              w: 563.35,
              h: 120,
              linearGradient: ['#005DFF', '#00A3FF', '#21DDFF']
            }],
            margin: [-25, 16, 0, 0]
          },
          {
            canvas: [{
              type: 'rect',
              x: 0,
              y: 0,
              w: 563.35,
              h: 190,
              linearGradient: ['#005DFF', '#00A3FF', '#21DDFF']
            }],
            margin: [-25, 16, 0, 0]
          },
          {
            columns: [
              {
                svg: locationLogoSVG,
                width: 20,
                alignment: 'left'
              },
              {
                text: 'Crime',
                margin: [7, 3, 0, 0],
                alignment: 'left',
                width: 50
              },
              {
                canvas: [{
                  type: 'rect',
                  x: 0,
                  y: 10,
                  w: 494.35,
                  h: 2.5,
                  linearGradient: ['#005DFF', '#00A3FF', '#21DDFF']
                }],
                alignment: 'left',
                margin: [0, 0, 0, 0]
              }
            ],
            margin: [-25, 16, 0, 18]
          },
          {
            image: await graphWrapperCanvas,
            width: 563.35,
            height: 199,
            margin: [-25, 0, 0, 18]
          }
        ],
        footer: function (currentPage: any, pageCount: any, pageSize: any) {

          const date = new Date();
          let day = date.getDate();
          let month = date.toLocaleString('default', { month: 'long' });
          let year = date.getFullYear();

          return [
            {
              canvas: [{
                type: 'rect',
                x: 16,
                y: 0,
                w: 563.35,
                h: 2,
                linearGradient: ['#005DFF', '#00A3FF', '#21DDFF']
              }]
            },
            {
              columns: [
                {
                  text: `Report Generated on ${month} ${day}, ${year}`,
                  alignment: "left",
                  color: '#1463FF',
                  bold: true
                },
                {
                  text: [
                    `RealAssist Property Report | Page ${currentPage}`,
                    {
                      text: `  of ${pageCount}`,
                      color: '#626E99',
                      bold: true
                    }
                  ],
                  alignment: "right",
                  color: '#090E24',
                  bold: true
                },
              ],
              margin: [16, 10, 16, 16]
            }
          ]
        },
        styles: {
          header: {
            decoration: 'underline'
          }
        },
        defaultStyle: {
          font: "Poppins"
        }
      }
      pdfMake.createPdf(docDefinition, null, null, pdfMake.fonts).download("RealAssist Report.pdf");
    }
  };

  return (
    <div className="main-container">
      <div id="ra-logo">
        <RaLogo />
      </div>
      <div id="location-logo"><LocationSVG /></div>
      <div className="abs-div">
        <div className="graph-wrapper" id="graph-wrapper">
          <div className="graph-heading">Burglary</div>
          <div className="graph-image">
            <div className="graph-name"><div className="graph-title">Arrests</div></div>
            <div className="graph">
              <div
                id="crime-chart-container"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="btn-div">
        <button onClick={handleExportToPdf}>
          <img src="./images/printer.svg" alt="Print" />
          Print
        </button>
      </div>
    </div>
  );
};