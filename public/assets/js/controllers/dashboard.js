const purpleColor = '#836AF9',
    yellowColor = '#ffe800',
    cyanColor = '#28dac6',
    orangeColor = '#FF8132',
    orangeLightColor = '#FDAC34',
    oceanBlueColor = '#299AFF',
    greyColor = '#4F5D70',
    greyLightColor = '#EDF1F4',
    blueColor = '#2B9AFF',
    blueLightColor = '#84D0FF';
let borderColor, axisColor;

if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    axisColor = config.colors_dark.axisColor; // x & y axis tick color
} else {
    borderColor = config.colors.borderColor; // same as template border color
    axisColor = config.colors.axisColor; // x & y axis tick color\
}

let Dashboard = {
    module: () => {
        return "dashboard";
    },

    moduleApi: () => {
        return `api/${Dashboard.module()}`;
    },

    setGrafikKaryawan: (perempuan, laki) => {
        const polarChart = document.getElementById('polarChart');
        if (polarChart) {
            const polarChartVar = new Chart(polarChart, {
                type: 'polarArea',
                data: {
                    labels: ['Perempuan', 'Laki-Laki'],
                    datasets: [{
                        label: 'Population (millions)',
                        backgroundColor: [orangeColor, oceanBlueColor],
                        data: [perempuan, laki],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 500
                    },
                    scales: {
                        r: {
                            ticks: {
                                display: false,
                                color: axisColor
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            // Updated default tooltip UI
                            rtl: isRtl,
                            backgroundColor: config.colors.white,
                            titleColor: config.colors.black,
                            bodyColor: config.colors.black,
                            borderWidth: 1,
                            borderColor: borderColor
                        },
                        legend: {
                            rtl: isRtl,
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                padding: 25,
                                boxWidth: 8,
                                color: axisColor
                            }
                        }
                    }
                }
            });
        }
    },
   
    setGrafikKaryawanTetap: (kontrak, tetap, unknow) => {
        const polarChart = document.getElementById('polarChartTetap');
        if (polarChart) {
            const polarChartVar = new Chart(polarChart, {
                type: 'polarArea',
                data: {
                    labels: ['Kontrak', 'Tetap', 'Unknow'],
                    datasets: [{
                        label: 'Population (millions)',
                        backgroundColor: [orangeColor, cyanColor, greyColor],
                        data: [kontrak, tetap, unknow],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 500
                    },
                    scales: {
                        r: {
                            ticks: {
                                display: false,
                                color: axisColor
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            // Updated default tooltip UI
                            rtl: isRtl,
                            backgroundColor: config.colors.white,
                            titleColor: config.colors.black,
                            bodyColor: config.colors.black,
                            borderWidth: 1,
                            borderColor: borderColor
                        },
                        legend: {
                            rtl: isRtl,
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                padding: 25,
                                boxWidth: 8,
                                color: axisColor
                            }
                        }
                    }
                }
            });
        }
    },

    setGrafikStatitikKaryawan: () => {
        const barChart = document.getElementById('barChart');
        if (barChart) {
            const barChartVar = new Chart(barChart, {
                type: 'bar',
                data: {
                    labels: [
                        'IT',
                        'HC',
                        'GA',
                        'PRODUKSI',
                    ],
                    datasets: [{
                        data: [275, 90, 190, 205],
                        backgroundColor: cyanColor,
                        borderColor: 'transparent',
                        maxBarThickness: 15,
                        borderRadius: {
                            topRight: 15,
                            topLeft: 15
                        }
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 500
                    },
                    plugins: {
                        tooltip: {
                            rtl: isRtl,
                            backgroundColor: config.colors.white,
                            titleColor: config.colors.black,
                            bodyColor: config.colors.black,
                            borderWidth: 1,
                            borderColor: borderColor
                        },
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: borderColor,
                                borderColor: borderColor
                            },
                            ticks: {
                                color: axisColor
                            }
                        },
                        y: {
                            min: 0,
                            max: 400,
                            grid: {
                                color: borderColor,
                                borderColor: borderColor
                            },
                            ticks: {
                                stepSize: 100,
                                tickColor: borderColor,
                                color: axisColor
                            }
                        }
                    }
                }
            });
        }
    },

    getDashboardData:()=>{
        let params = {};
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Dashboard.moduleApi()) + "Dashboard",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                Dashboard.setGrafikKaryawan(resp.data.total_per_jenkel_cewe,resp.data.total_per_jenkel_laki);
                Dashboard.setGrafikKaryawanTetap(resp.data.total_per_status_kontrak,resp.data.total_per_status_tetap, resp.data.total_per_status_unknow);
            }
        });
    }
};

$(function () {
    Dashboard.setGrafikStatitikKaryawan();
    Dashboard.getDashboardData();
});
