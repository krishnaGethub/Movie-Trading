document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('priceChart').getContext('2d');

    // Initial data
    const initialData = {
        labels: [],
        datasets: [{
            label: 'Stock Price',
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            pointRadius: 0,
            borderWidth: 2,
            lineTension: 0.4,
            data: [],
            fill: false,
        }]
    };

    const config = {
        type: 'line',
        data: initialData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                    },
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                    },
                },
            },
            elements: {
                point: {
                    radius: 0,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    };

    const liveGraph = new Chart(ctx, config);

    let trailerViews = 1000000;
    let currentBalance = 1000;
    let moviePrice = 50;

    function watchTrailer() {
        trailerViews++;
        updateMovieDetails();
    }

    function buy() {
        if (currentBalance >= moviePrice) {
            currentBalance -= moviePrice;
            moviePrice += Math.floor(Math.random() * 20); // Simulate price change
            updateMovieDetails();
            updateGraph();
        } else {
            alert('Not enough balance to buy!');
        }
    }

    function sell() {
        currentBalance += moviePrice;
        moviePrice -= Math.floor(Math.random() * 20); // Simulate price change
        updateMovieDetails();
        updateGraph();
    }

    function updateMovieDetails() {
        const totalEarnings = 50 - currentBalance; // Assuming initial movie price is $50
        const movieName = 'Avengers: Endgame'; // You can replace this with the actual movie name

        document.getElementById('trailerViews').textContent = trailerViews.toLocaleString();
        document.getElementById('moviePrice').textContent = `$${moviePrice}`;
        document.getElementById('totalTrailerViews').textContent = trailerViews.toLocaleString();
        document.getElementById('totalEarnings').textContent = `$${totalEarnings}`;
        document.getElementById('movieName').textContent = movieName;
    }

    function updateGraph() {
        const newDataPoint = moviePrice;

        liveGraph.data.labels.push(liveGraph.data.labels.length + 1);
        liveGraph.data.datasets[0].data.push(newDataPoint);

        if (liveGraph.data.labels.length > 10) {
            liveGraph.data.labels.shift();
            liveGraph.data.datasets[0].data.shift();
        }

        liveGraph.update();
    }

    // Initial setup
    updateMovieDetails();
    setInterval(function () {
        watchTrailer(); // Simulate trailer views increase over time
    }, 5000); // Update every 5 seconds
});
