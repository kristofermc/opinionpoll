const form = document.getElementById('vote-form');

// Form Submit Event
form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=lang]:checked').value;
    const data = { lang: choice};

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => console.log(data)) 
        .catch(err => console.log(err));

    e.preventDefault();
});

fetch('http://localhost:3000/poll')
    .then(res => res.json())
    .then(data => {
        const votes = data.votes;
        const totalVotes = votes.length;
        // Count vote points - acc/current
        const voteCounts = votes.reduce(
            (acc, vote) => 
                ((acc[vote.lang] = (acc[vote.lang] || 0) + parseInt(vote.points)), acc), {});

        let dataPoints = [
            { label: 'C', y: voteCounts.C },
            { label: 'C++', y: voteCounts.Cplus },
            { label: 'C#', y: voteCounts.Cshar },
            { label: 'Python', y: voteCounts.Python },
            { label: 'Ruby', y: voteCounts.Ruby },
            { label: 'Other', y: voteCounts.Other },
        ];
        
        const chartContainer = document.querySelector('#chartContainer');
        
        if(chartContainer) {
            const chart = new CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: `Total Votes ${totalVotes}`
                },
                data: [
                    {
                        type: 'column',
                        dataPoints: dataPoints
                    }
                ]
            });
            chart.render();
        
                // Enable pusher logging - don't include this in production
                Pusher.logToConsole = true;
        
                var pusher = new Pusher('a1546fab7abad0216516', {
                  cluster: 'eu',
                  encrypted: true
                });
            
                var channel = pusher.subscribe('lang-poll');
                channel.bind('lang-vote', function(data) {
                    dataPoints = dataPoints.map(x => {
                        if(x.label == data.lang) {
                           x.y += data.points;
                           return x;
                        } else {
                            return x;
                        }
                    });
                    chart.render();
                });
        }
    });

