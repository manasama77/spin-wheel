const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: "Botol Minum", qty: 5, order: 2 },
  { minDegree: 31, maxDegree: 90, value: "Bantal", qty: 10, order: 1 },
  { minDegree: 91, maxDegree: 150, value: "Asbak + Korek", qty: 10, order: 6 },
  { minDegree: 151, maxDegree: 210, value: "Pouch", qty: 20, order: 5 },
  { minDegree: 211, maxDegree: 270, value: "Tempat Sepatu", qty: 20, order: 4 },
  { minDegree: 271, maxDegree: 330, value: "Tote Bag", qty: 100, order: 3 },
  { minDegree: 331, maxDegree: 360, value: "Botol Minum", qty: 5, order: 2 },
];
//Size of each piece
const data = [1, 1, 1, 1, 1, 1];
//background color for each piece
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];

let xlabels = [
  "Bantal",
  "Botol Minum",
  "Tote Bag",
  "Tempat Sepatu",
  "Pouch",
  "Asbak + Korek",
];

//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: xlabels,
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 14 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  console.log("angleValue", angleValue);
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
//Spinner count
let count = 0;

//100 rotations for animation and last rotation for result
let resultValue = 51;
let randomDegree = 0;

//Start spinning
spinBtn.addEventListener("click", () => {
  randomDegree = generateRandomGenerator();
  console.log("randomDegree", randomDegree);

  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at

  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    console.log(" ");
    console.log("resultValue", resultValue);
    console.log("myChart.options.rotation", myChart.options.rotation);
    myChart.options.rotation = myChart.options.rotation + resultValue;
    console.log("x", myChart.options.rotation);
    console.log("randomDegree", randomDegree);
    console.log("y", myChart.options.rotation == randomDegree);
    //Update chart with new value;

    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 5;
    } else if (count > 1 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

function generateRandomGenerator() {
  let listNumber = [];

  for (let x = 0; x <= 360; x++) {
    for (let y of rotationValues) {
      if (
        x >= (y.minDegree == 0 ? 5 : y.minDegree + 5) &&
        x <= y.maxDegree - 5
      ) {
        listNumber.push(x);
      }
    }
  }

  let i = listNumber.length;
  while (--i > 0) {
    let temp = Math.floor(Math.random() * (i + 1));
    [listNumber[temp], listNumber[i]] = [listNumber[i], listNumber[temp]];
  }

  let hasil = listNumber[0];

  return hasil;
}
