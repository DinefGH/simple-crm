import { Component, OnInit } from '@angular/core';import { ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart-dash',
  templateUrl: './chart-dash.component.html',
  styleUrls: ['./chart-dash.component.scss']
})


export class ChartDashComponent {

  public barChartLegend = true;
public barChartPlugins = [];

public barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
  datasets: [
    { data: [ 0.2, 0.5, 0.7, 0.1, 0.8, 0.4, 1.0, 0.8, 0.8, 0.2, 0.6, 0.7 ], label: '2021', backgroundColor: [ 'rgb(1, 209, 255)' ] },
    { data: [ 0.4, 0.8, 0.2, 0.6, 0.4, 1.0, 0.8, 0.2, 0.6, 0.4, 0.2, 0.8 ], label: '2022', backgroundColor: [ 'rgb(229, 200, 82)' ]  }
  ]
};

public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 0.2,
        // Use a callback function to format the tick labels
        callback: function(value) {
          return '€' + value + 'M';
        }
      }
    }
  }
};
}
