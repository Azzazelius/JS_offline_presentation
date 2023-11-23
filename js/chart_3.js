
// Переносим в переменную HTML объект по имени класса. [0] нужен т.к. возвращается список объектов, даже если он один
var chartElement = document.getElementsByClassName('myChart_3')[0];

// Значения кривых на графике
var chartData = {
  labels: ['Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь'],
  datasets: [
    {
      label: 'Книги',
      data: [0.5, 0.6, 0.6, 0.8, 0.7, 0.97],
      pointStyle: 'rect',
      backgroundColor: '#1a3db4',
      borderColor: '#1a3db4',
      fill: false,
      pointRadius: 4,
      borderWidth: 1
    },
    {
      label: 'Фильмы',
      data: [0.3, 0.6, 0.25, 0.2, 0.2, 0.1],
      pointStyle: 'rect',
      backgroundColor: '#CE005B',
      borderColor: '#CE005B',
      fill: false,
      pointRadius: 4,
      borderWidth: 1
    },
  ]
};


// Общие настройки графика
var chartOptions = {
  scales: {
    y: {
      min: 0,
      max: 1,
      stepSize: 0.1,
      grid: { display: false }
    },
    x: {
      grid: { display: false }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        label1: {
          type: 'label',
          xValue: 0.3,
          yValue: 3.3,
          content: ['ОФВ1{%}'],
          font: {
            size: 10,
          },
          color: ['#d4d0cf'],
          drawTime: 'beforeDraw',
          },          
      }
    },
    
    legend: {
      position: 'bottom',
      align: 'start'
    },
    title: {
      display: true,
      text: 'Динамика показателя ОФВ1(%)',
      position: 'top',
      align: 'start'
    }
  },
};

// Создаем отображение графика
var chart = new Chart(chartElement, {
  type: 'line',
  data: chartData,
  options: chartOptions
});



// Анимация графика
var originalData1 = chart.data.datasets[0].data.slice(); // Копируем исходные данные для первой кривой
var originalData2 = chart.data.datasets[1].data.slice(); // Копируем исходные данные для второй кривой

chart.data.datasets[0].data = chart.data.datasets[0].data.map(function() { return NaN; }); // Заменяем данные первой кривой на NaN
chart.data.datasets[1].data = chart.data.datasets[1].data.map(function() { return NaN; }); // Заменяем данные второй кривой на NaN

var animationDelay1 = 130; // Задержка между анимацией каждой точки для первой кривой
var animationDelay2 = 90; // Задержка между анимацией каждой точки для второй кривой

chart.update(); // Обновляем график, чтобы отобразить изменения данных

chart.data.datasets[0].data.forEach(function(dataPoint, index) {
  setTimeout(function() {
    chart.data.datasets[0].data[index] = originalData1[index];
    chart.update();
  }, index * animationDelay1);
});

chart.data.datasets[1].data.forEach(function(dataPoint, index) {
  setTimeout(function() {
    chart.data.datasets[1].data[index] = originalData2[index];
    chart.update();
  }, index * animationDelay2);
});


console.log("TESTING")