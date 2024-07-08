# Lightning Rail Route Calculator

The Lightning Rail Route Calculator is a web application that helps users find the shortest path and travel time between cities on the Eberron lightning rail network. The app calculates the route based on travel time and displays the total travel time and distance, as well as the travel time and distance between each node. Additionally, it calculates travel costs for different classes.

## Features

- Users can select a start city from the dropdown list.
- The destination city dropdown is activated and populated based on the selected start city.
- The app calculates and displays the shortest path, total travel time, total distance, and travel costs.
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

Then open your web browser and go to [http://localhost:8000](http://localhost:8000).

## Deployment

To deploy the application using GitHub Pages:

1. **Create a new repository** on GitHub and name it `shortest-path-calculator`.
2. **Upload the files**:
    - `index.html`
    - `nodes.json`
    - `scripts.js`
3. **Configure GitHub Pages**:
    - Go to the repository settings.
    - Scroll down to the "GitHub Pages" section.
    - Select the branch (usually `main` or `master`) and the root directory as the source.
    - Save the settings.
4. **Access the web app**:
    - After a few minutes, GitHub Pages will deploy your site. You can access it via `https://<your-username>.github.io/shortest-path-calculator`.

## Project Structure

- `index.html` - The main HTML file containing the structure of the web application.
- `nodes.json` - A JSON file containing the data for the Western and Eastern lightning rail networks.
- `scripts.js` - A JavaScript file containing the logic for calculating the shortest path, updating the UI, and calculating travel costs.

## Usage

1. Select a start city from the dropdown list.
2. The destination city dropdown will be activated and populated based on the selected start city.
3. Select a destination city from the dropdown list.
4. Click the "Find Route" button to calculate the shortest path.
5. The app will display the shortest path, total travel time, total distance, and travel costs for different classes (First Class, Standard Fare, Steerage).
6. The app will also display the travel time and distance between each node.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Eberron community for the inspiration and data.
