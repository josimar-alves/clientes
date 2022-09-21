import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DadosReports, DataProductChart } from './dados-reports';

@Injectable({
    providedIn: 'root'
})
export class ReportsService {
    private readonly API = `http://localhost:8080/venda/`;
    constructor(private http: HttpClient) { }

    listByDate(initialDate, finalDate) {
        return this.http.get<DadosReports[]>(this.API + "getReportByDateRange/" + initialDate + "/" + finalDate)
            .pipe();
    }

    listProductSalesQuantity(initialDate, finalDate) {
        return this.http.get<DataProductChart[]>(this.API + "getProductSalesQuantityByDateRange/" + initialDate + "/" + finalDate)
            .pipe();
    }
}


