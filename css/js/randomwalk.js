let steps = 100;
let chart;

function updateSteps(val) {
steps = val;
document.getElementById("stepValue").innerText = val;
}

function runSimulation() {
let price = 100;
let randomWalk = [price];
let labels = [];

let realStock = [100,102,101,103,105,104,106,107,105,108];

for (let i = 1; i <= steps; i++) {
let step = Math.random() > 0.5 ? 1 : -1;
price += step;
randomWalk.push(price);
labels.push(i);
}

drawChart(labels, randomWalk, realStock);
createTable(randomWalk);
}

function drawChart(labels, randomData, realData) {
const ctx = document.getElementById('walkChart').getContext('2d');
if (chart) chart.destroy();

chart = new Chart(ctx, {
type: 'line',
data: {
labels: labels,
datasets: [
{ label: 'Random Walk', data: randomData },
{ label: 'Real Stock', data: realData }
]
}
});
}

function createTable(data) {
let html = "<h3>Price Table</h3>";
html += "<table border='1'><tr><th>Step</th><th>Price</th></tr>";
data.forEach((v,i)=>{ html+=`<tr><td>${i}</td><td>${v}</td></tr>`;});
html += "</table>";
document.getElementById("tableContainer").innerHTML = html;
}

function downloadChart() {
const link = document.createElement('a');
link.download = 'random_walk.png';
link.href = document.getElementById('walkChart').toDataURL();
link.click();
}

