# Lightning Rail Route Calculator

The Lightning Rail Route Calculator is a web application that helps users find the shortest path and travel time between cities on the Eberron lightning rail network. The app calculates the route based on travel time and displays the total travel time and distance, as well as the travel time and distance between each node.

## Features

- Users can select a start city from the dropdown list.
- The destination city dropdown is activated and populated based on the selected start city.
- The app calculates and displays the shortest path, total travel time, and total distance.
- Displays travel time and distance between each node.

## Getting Started

To run the application locally, follow these steps:

### Prerequisites

- A web browser
- A simple HTTP server (optional for local testing)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/<your-username>/shortest-path-calculator.git
    cd shortest-path-calculator
    ```

2. **Open `index.html` in your web browser**:
    - You can simply double-click the `index.html` file to open it in your default web browser.
    - Alternatively, you can use a simple HTTP server to serve the files locally.

### Using a Simple HTTP Server

If you have Python installed, you can use its built-in HTTP server.

For Python 3.x:

```bash
python -m http.server
