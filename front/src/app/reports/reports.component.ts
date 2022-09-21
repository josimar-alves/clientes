import { Component, OnInit } from '@angular/core';
import { ReportsService } from './reports.service';
import { Router } from '@angular/router';
import { DadosReports, DataProductChart } from './dados-reports';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import ApexCharts from 'apexcharts'

@Component({
    selector: 'app-report',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

    vendasReport: DadosReports[];
    dateList: Date[] = [];
    totalsPerDay: number[] = [];
    total: number;

    dataProductChart: DataProductChart[];
    nameList: String[] = [];
    totalsPerItemList: number[] = [];

    constructor(private service: ReportsService, private router: Router) {
        this.initAndClearData();
    }

    ngOnInit() {
    }

    initAndClearData() {
        this.total = 0;
        this.dateList = [];
        this.totalsPerDay = [];
        this.nameList = [];
        this.totalsPerItemList = [];
    }

    async setupDataReport(initialDate, finalDate) {
        this.initAndClearData();
        var filterButton = <HTMLInputElement>document.getElementById("filterButton");
        filterButton.disabled = true;

        await this.service.listByDate(initialDate, finalDate).subscribe(list => {
            this.vendasReport = list;
            this.vendasReport.forEach(venda => {
                this.total += venda.total;
                this.totalsPerDay.push(venda.total);
                this.dateList.push(venda.data);
            });
            this.setVendasPorDiaChart();
        });

        await this.service.listProductSalesQuantity(initialDate, finalDate).subscribe(list => {
            this.dataProductChart = list;
            this.dataProductChart.forEach(product => {
                this.nameList.push(product.name);
                this.totalsPerItemList.push(product.quantity);
            });
            this.setVendasPorItemChart();

            filterButton.disabled = false;
        });
    }

    setVendasPorDiaChart() {
        var optionsVendasPorDia = {
            chart: {
                type: 'bar'
            },
            series: [{
                name: 'Vendas (R$)',
                data: this.totalsPerDay
            }],
            xaxis: {
                categories: this.dateList
            }
        }

        var chartVendasPorDia = new ApexCharts(document.querySelector("#chartVendasPorDia"), optionsVendasPorDia);
        chartVendasPorDia.render();
        chartVendasPorDia.updateOptions(optionsVendasPorDia);
    }

    setVendasPorItemChart() {
        var optionsVendasPorItem = {
            chart: {
                type: 'bar'
            },
            series: [{
                name: 'Items',
                data: this.totalsPerItemList
            }],
            xaxis: {
                categories: this.nameList
            }
        }

        var chartQtVendasItems = new ApexCharts(document.querySelector("#chartQtVendasItems"), optionsVendasPorItem);
        chartQtVendasItems.render();
        chartQtVendasItems.updateOptions(optionsVendasPorItem);
    }

    getTotal() {
        return this.total;
    }

}
