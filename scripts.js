let networks = {};

// Fetch the data from nodes.json
fetch('nodes.json')
    .then(response => response.json())
    .then(data => {
        networks = data;
        populateStartNodes();
    })
    .catch(error => console.error('Error fetching node data:', error));

function dijkstra(graph, start, end) {
    const pq = [{ node: start, time: 0, path: [] }];
    const seen = new Set();
    const minTime = { [start]: 0 };

    while (pq.length > 0) {
        pq.sort((a, b) => a.time - b.time);
        const { node: currentNode, time: currentTime, path } = pq.shift();

        if (seen.has(currentNode)) continue;

        const newPath = path.concat(currentNode);
        seen.add(currentNode);

        if (currentNode === end) return { time: currentTime, path: newPath };

        for (const [neighbor, travelTime] of (graph[currentNode] || [])) {
            if (!seen.has(neighbor)) {
                const nextTime = currentTime + travelTime;
                if (minTime[neighbor] === undefined || nextTime < minTime[neighbor]) {
                    minTime[neighbor] = nextTime;
                    pq.push({ node: neighbor, time: nextTime, path: newPath });
                }
            }
        }
    }
    return { time: Infinity, path: [] };
}

function populateStartNodes() {
    const startSelect = document.getElementById('start');
    const endSelect = document.getElementById('end');

    startSelect.innerHTML = '<option value="" selected disabled>Select Start City</option>';
    endSelect.innerHTML = '<option value="" selected disabled>Select Destination City</option>';
    endSelect.disabled = true;

    Object.keys(networks).forEach(network => {
        const nodes = networks[network];
        Object.keys(nodes).sort().forEach(node => {
            const startOption = document.createElement('option');
            startOption.value = node;
            startOption.textContent = `${node} (${network.includes("Western") ? "Western" : "Eastern"})`;
            startSelect.appendChild(startOption);
        });
    });
}

function populateEndNodes() {
    const startSelect = document.getElementById('start');
    const endSelect = document.getElementById('end');
    const selectedStart = startSelect.value;
    const selectedNetwork = startSelect.options[startSelect.selectedIndex].text.includes("Western")
        ? "WesternOrienLightningRailNetwork"
        : "EasternLightningRailNetwork";

    endSelect.innerHTML = '<option value="" selected disabled>Select Destination City</option>';
    endSelect.disabled = false;

    const nodes = networks[selectedNetwork];
    Object.keys(nodes).sort().forEach(node => {
        if (node !== selectedStart) {
            const endOption = document.createElement('option');
            endOption.value = node;
            endOption.textContent = `${node} (${selectedNetwork.includes("Western") ? "Western" : "Eastern"})`;
            endSelect.appendChild(endOption);
        }
    });
}

function findShortestPath() {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const selectedNetwork = document.getElementById('start').options[document.getElementById('start').selectedIndex].text.includes("Western")
        ? "WesternOrienLightningRailNetwork"
        : "EasternLightningRailNetwork";

    const graph = networks[selectedNetwork];
    const result = dijkstra(graph, start, end);

    const pathDetails = result.path.reduce((details, node, index, path) => {
        if (index === 0) return details;
        const prevNode = path[index - 1];
        const travelTime = graph[prevNode].find(([neighbor]) => neighbor === node)[1];
        const distance = travelTime * 30;
        details.totalDistance += distance;
        details.totalTime += travelTime;
        const firstClassCost = travelTime * 15;
        const standardFareCost = travelTime * 6;
        const steerageCost = travelTime * 0.9;
        const cargoCost = travelTime * 1.5;
        details.nodeDetails.push({ from: prevNode, to: node, travelTime, distance, firstClassCost, standardFareCost, steerageCost, cargoCost });
        return details;
    }, { totalDistance: 0, totalTime: 0, nodeDetails: [] });

    const totalFirstClassCost = pathDetails.totalTime * 15;
    const totalStandardFareCost = pathDetails.totalTime * 6;
    const totalSteerageCost = pathDetails.totalTime * 0.9;
    const totalCargoCost = pathDetails.totalTime * 1.5;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Route</h2>
        <p>${result.path.join(' -> ')}</p>
        <p>Total time: ${pathDetails.totalTime} hours</p>
        <p>Total distance: ${pathDetails.totalDistance} miles</p>
        <p>Costs:</p>
        <ul>
            <li>First Class: ${totalFirstClassCost.toFixed(2)} gp</li>
            <li>Standard Fare: ${totalStandardFareCost.toFixed(2)} gp</li>
            <li>Steerage: ${totalSteerageCost.toFixed(2)} gp</li>
            <li>Cargo (per 100 lbs): ${totalCargoCost.toFixed(2)} gp</li>
        </ul>
        <h2>By Leg</h2>
        ${pathDetails.nodeDetails.map((detail, index) => `
            <h3>${detail.from} to ${detail.to}:</h3>
            <p>${detail.travelTime} hours (${detail.distance} miles)</p>
            <p>Costs:</p>
            <ul>
                <li>First Class: ${detail.firstClassCost.toFixed(2)} gp</li>
                <li>Standard Fare: ${detail.standardFareCost.toFixed(2)} gp</li>
                <li>Steerage: ${detail.steerageCost.toFixed(2)} gp</li>
                <li>Cargo (per 100 lbs): ${detail.cargoCost.toFixed(2)} gp</li>
            </ul>
        `).join('')}
    `;
}
