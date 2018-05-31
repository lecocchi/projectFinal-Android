import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the DailyDescriptionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DailyDescriptionProvider = (function () {
    function DailyDescriptionProvider(http) {
        this.http = http;
        this.items = [
            {
                avatar: "../../assets/imgs/avatar-daily.jpg",
                today: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
                yesterday: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            },
            {
                avatar: "../../assets/imgs/avatar-daily.jpg",
                today: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
                yesterday: "",
            },
            {
                avatar: "../../assets/imgs/avatar-daily.jpg",
                today: "",
                yesterday: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            },
            {
                avatar: "../../assets/imgs/avatar-daily.jpg",
                today: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
                yesterday: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            },
            {
                avatar: "../../assets/imgs/avatar-daily.jpg",
                today: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
                yesterday: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            },
            {
                avatar: "../../assets/imgs/avatar-daily.jpg",
                today: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
                yesterday: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            },
            {
                avatar: "../../assets/imgs/avatar-daily.jpg",
                today: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
                yesterday: " Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            },
            {
                avatar: "../../assets/imgs/avatar-daily.jpg",
                today: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
                yesterday: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            },
            {
                avatar: "../../assets/imgs/avatar-daily.jpg",
                today: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
                yesterday: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            },
            {
                avatar: "../../assets/imgs/avatar-daily.jpg",
                today: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
                yesterday: "",
            },
            {
                avatar: "../../assets/imgs/avatar-daily.jpg",
                today: "",
                yesterday: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            }
        ];
        console.log('Hello DailyDescriptionProvider Provider');
    }
    DailyDescriptionProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DailyDescriptionProvider.ctorParameters = function () { return [
        { type: HttpClient, },
    ]; };
    return DailyDescriptionProvider;
}());
export { DailyDescriptionProvider };
//# sourceMappingURL=daily-description.js.map