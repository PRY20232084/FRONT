import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent, ModalConfig } from 'src/app/_metronic/partials';
import { AuthService } from 'src/app/services/auth.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
} from 'ng-apexcharts';
import { ActivatedRoute, Router } from '@angular/router';
import { RawMaterialService } from 'src/app/services/raw-material.service';
import { RawMaterial } from 'src/app/models/RawMaterial';
import { DashboardService } from 'src/app/services/dashboard.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  rawMaterials: RawMaterial[] = [];
  name: string;
  isLoading: boolean = true;
  selectedRawMaterial: any;

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  series: any[] = [
    {
      name: 'Predicción',
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Consumo real',
      data: [0, 0, 0, 0, 0, 0],
    },
  ];
  loggedUser: any;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private rawMaterialService: RawMaterialService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let categories = [];

    for (let i = 0; i < 7; i++) {
      let currentMonth = month - i;
      let currentYear = year;

      if (currentMonth <= 0) {
        currentMonth += 12;
        currentYear--;
      }

      let stringMonth = this.convertMonth(currentMonth);
      let dateString = `${stringMonth} - ${currentYear}`;
      categories.push(dateString);
    }

    categories.reverse();

    this.chartOptions = {
      series: this.series,
      chart: {
        height: 500,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#FFC000', '#2F75B5'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        dashArray: [8, 0],
      },
      title: {
        text: 'HISTÓRICO VS PREDICCIÓN',
        align: 'center',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: categories,
        title: {
          text: 'MESES',
        },
      },
      yaxis: {
        title: {
          text: 'CONSUMO',
        },
        min: 5,
        max: 550,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    };

    this.authService.currentUser.subscribe((x) => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      } else {
        this.loadRawMaterials();
      }
    });
    this.cdr.detectChanges();
  }

  loadRawMaterials(): void {
    this.rawMaterialService
      .getRawMaterials()
      .subscribe((rawMaterialsResponse) => {
        this.rawMaterials = rawMaterialsResponse;
        this.name = this.rawMaterials[0].name;
        this.updateName(this.rawMaterials[0].name);
        this.selectedRawMaterial = this.rawMaterials[0];
        this.cdr.detectChanges();

        // Move the logic that depends on this.name here
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let convertedMonth: string = this.convertMonth(month);

        let body = {
          tipo_de_materia_prima: this.name,
          mes_de_consumo: convertedMonth,
          año: year,
        };

        this.dashboardService.lastMonths(body).subscribe((predictResponse) => {
          predictResponse.results.Prediction =
            predictResponse.results.Prediction.map(function (num: number) {
              return Math.round(num);
            });
          this.updateChart(
            this.name,
            predictResponse.results.Real,
            predictResponse.results.Prediction
          );
        });
      });
  }

  updateChart(baseName: string, real: number[], predict: number[]): void {
    this.series = [
      {
        name: 'Predicción de consumo de ' + baseName,
        data: predict,
      },
      {
        name: 'Consumo real de ' + baseName,
        data: real,
      },
    ];
    this.chartOptions.series = this.series;
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  convertMonth(month: number): string {
    switch (month) {
      case 1:
        return 'ENERO';
      case 2:
        return 'FEBRERO';
      case 3:
        return 'MARZO';
      case 4:
        return 'ABRIL';
      case 5:
        return 'MAYO';
      case 6:
        return 'JUNIO';
      case 7:
        return 'JULIO';
      case 8:
        return 'AGOSTO';
      case 9:
        return 'SEPTIEMBRE';
      case 10:
        return 'OCTUBRE';
      case 11:
        return 'NOVIEMBRE';
      case 12:
        return 'DICIEMBRE';
      default:
        return 'MAYO';
    }
  }

  updateName(selectedName: string) {
    this.name = selectedName;
    this.cdr.detectChanges();
  }

  onRawMaterialChange() {
    this.isLoading = true;

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let convertedMonth: string = this.convertMonth(month);

    let body = {
      tipo_de_materia_prima: this.selectedRawMaterial, // Aquí asignamos solo el nombre
      mes_de_consumo: convertedMonth,
      año: year,
    };

    console.log('Selected raw material:', this.selectedRawMaterial);
    let materialName = this.selectedRawMaterial;
    console.log('Material name:', materialName);

    this.dashboardService.lastMonths(body).subscribe((predictResponse) => {
      predictResponse.results.Prediction =
        predictResponse.results.Prediction.map((num: number) =>
          Math.round(num)
        );
      this.updateChart(
        materialName,
        predictResponse.results.Real,
        predictResponse.results.Prediction
      );
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }
}
