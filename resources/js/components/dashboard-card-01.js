// Import Chart.js
import {
  Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';
import { chartAreaGradient } from '../app';

// Import utilities
import { tailwindConfig, formatValue, hexToRGB } from '../utils';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);

// A chart built with Chart.js 3
// https://www.chartjs.org/
const dashboardCard01 = () => {
  
  const ctx = document.getElementById('dashboard-card-01');
  if (!ctx) return;

  const darkMode = localStorage.getItem('dark-mode') === 'true';

  const tooltipBodyColor = {
    light: '#6B7280',
    dark: '#9CA3AF'
  };

  const tooltipBgColor = {
    light: '#ffffff',
    dark: '#374151'
  };

  const tooltipBorderColor = {
    light: '#E5E7EB',
    dark: '#4B5563'
  };  

  // fetch('/json-data-feed?datatype=1')
  //   .then(a => {
  //     return a.json();
  //   })
  //   .then(result => {
      const data = [732,610,610,504,504,504,349,349,504,342, 504, 610, 391, 192, 154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532, 532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234, 234, 314, 314, 314, 388, 314, 202, 202, 202, 202, 314, 720, 642]
      const labels = ["12-01-2020","01-01-2021","02-01-2021","03-01-2021","04-01-2021","05-01-2021","06-01-2021","07-01-2021","08-01-2021","09-01-2021", "10-01-2021", "11-01-2021", "12-01-2021", "01-01-2022", "02-01-2022", "03-01-2022", "04-01-2022", "05-01-2022", "06-01-2022", "07-01-2022", "08-01-2022", "09-01-2022", "10-01-2022", "11-01-2022", "12-01-2022", "01-01-2023"]
      const dataset1 = data.slice(0, 26);
      const dataset2 = data.slice(26, 52);
      // console.log(result.data)
      // const dataset1 = [732, 610, 610, 504, 504, 504, 349, 349, 504, 342,732, 610, 610, 504, 504, 504, 349, 349, 504, 342,]
      // const dataset2 = [123, 323, 934, 123, 345, 123, 1243, 22, 504, 342,123, 323, 934, 123, 345, 123, 1243, 22, 504, 342]
      // console.log(dataset1);  //  732, 610, 610, 504, 504, 504, 349, 349, 504, 342,
      // console.log(dataset1); //  732, 610, 610, 504, 504, 504, 349, 349, 504, 342
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            // Indigo line
            {
              data: dataset1,
              fill: true,
              backgroundColor: function(context) {
                const chart = context.chart;
                const {ctx, chartArea} = chart;
                return chartAreaGradient(ctx, chartArea, [
                  { stop: 0, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0)` },
                  { stop: 1, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0.2)` }
                ]);
              },
              borderColor: tailwindConfig().theme.colors.violet[500],
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 3,
              pointBackgroundColor: tailwindConfig().theme.colors.violet[500],
              pointHoverBackgroundColor: tailwindConfig().theme.colors.violet[500],
              pointBorderWidth: 0,
              pointHoverBorderWidth: 0,
              clip: 20,
              tension: 0.2
            },
            // Gray line
            {
              data: dataset2,
              // borderColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[500])}, 0.25)`,
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 3,
              // pointBackgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[500])}, 0.25)`,
              // pointHoverBackgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[500])}, 0.25)`,
              pointBorderWidth: 0,
              pointHoverBorderWidth: 0,
              clip: 20,
              tension: 0.2
            },
          ],
        },
        options: {
          layout: {
            padding: 20,
          },
          scales: {
            y: {
              display: false,
              beginAtZero: true,
            },
            x: {
              type: 'time',
              time: {
                parser: 'MM-DD-YYYY',
                unit: 'month',
              },
              display: false,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: () => false, // Disable tooltip title
                label: (context) => formatValue(context.parsed.y),
              },
              bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
              backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
              borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,     
            },
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: 'nearest',
          },
          maintainAspectRatio: false,
        },
      });
      
      document.addEventListener('darkMode', (e) => {
        const { mode } = e.detail;
        if (mode === 'on') {
          chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
          chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
          chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
        } else {
          chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
          chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
          chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
        }
        chart.update('none');
      });      
    // });
};

export default dashboardCard01;
