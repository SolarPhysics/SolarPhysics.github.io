document.addEventListener('DOMContentLoaded', function() {
    const meetings = [
        { date: '2024-01-12', presenter: 'Sibaek Yi', article: { title: 'The Thickness of Electric Current Sheets and Implications for Coronal Heating', url: 'https://arxiv.org/abs/2307.13825' }},
        { date: '2024-01-19', presenter: 'Junmo An', article: { title: 'The Variations in Finite-difference Potential Fields: Models and Observations', url: 'https://arxiv.org/abs/2102.05618' }},
        { date: '2024-01-26', presenter: 'Jihye Kang', article: { title: 'Coronal Mass Ejections: A Deep Learning Approach to Generating Photospheric Vector Magnetograms of Solar Active Regions for SOHO/MDI Using SDO/HMI and BBSO Data and Effects', url: 'https://arxiv.org/abs/2211.02278' }},
        { date: '2024-02-02', presenter: 'Donghui Son', article: { title: 'HOW-MHD: A High-Order WENO-Based Magnetohydrodynamic Code with a High-Order Constrained Transport Algorithm for Astrophysical Applications', url: 'https://arxiv.org/abs/2304.04360' }},
        { date: '2024-02-16', presenter: 'Yeonwoo Jang', article: { title: 'Testing magnetohydrostatic extrapolation with radiative MHD simulation of a solar flare', url: 'https://arxiv.org/abs/1910.03523' }},
        { date: '2024-02-23', presenter: 'Hwanhee Lee', article: { title: 'Ensemble Modeling of CME Propagation', url: 'https://ui.adsabs.harvard.edu/abs/2013SoPh..285..349L/abstract' }},
        { date: '2024-03-08', presenter: 'Yeongmin Kang', article: 'TBD' },
        // Future meetings without article details yet are marked as TBD
        { date: '2024-03-15', presenter: 'Mingyu Jeon', article: 'TBD' },
        { date: '2024-03-22', presenter: 'Hyunjin Jeong', article: 'TBD' },
        { date: '2024-03-29', presenter: 'Sunghong Park', article: 'TBD' },
        { date: '2024-04-05', presenter: 'Kyungsun Park', article: 'TBD' }
        // Additional meetings...
    ];

    function updateMeetings() {
        const today = new Date();
        const upcomingSection = document.getElementById('upcoming-meeting');
        const pastMeetingsTableBody = document.querySelector('#past-meetings tbody');

        let upcomingHtml = '<h2>📚 Upcoming Meeting</h2>';
        let pastMeetingsHtml = '';
        let foundUpcoming = false;

        meetings.forEach(meeting => {
            const meetingDate = new Date(meeting.date + 'T10:30:00');
            let articleContent;
            if (typeof meeting.article === 'string') {
                articleContent = meeting.article; // Directly use the string (e.g., "TBD")
            } else {
                // articleContent = `<a href="${meeting.article.url}">${meeting.article.title}</a>`; // Use link and title for past meetings

                let titleWords = meeting.article.title.split(' ');
                titleWords = titleWords.map(word => word.charAt(0).toUpperCase() + word.slice(1));
                meeting.article.title = titleWords.join(' ');
                articleContent = `<a href="${meeting.article.url}">${meeting.article.title}</a>`;
                
            }
            if (meetingDate >= today && !foundUpcoming) {
                upcomingHtml += `
                    <p><strong>🗓️ Date:</strong> &ensp; <span class="presenter-name">${meeting.date}</span></p>
                    <p><strong>⏰ Time:</strong> &ensp; <span class="presenter-name">10:30 AM</span></p>
                    <p><strong>🎙️ Presenter:</strong> &ensp; <span class="presenter-name">${meeting.presenter}</span></p>
                    <p><strong>🔖 Article:</strong> &ensp; <span class="presenter-name">${articleContent}</span></p>
                    <p><strong>🖥️ Zoom Link:</strong> &ensp; <a href="https://khu-ac.zoom.us/j/84681128298">Join Meeting</a></p>
                `;
                foundUpcoming = true;
            } else if (meetingDate < today) {
                pastMeetingsHtml = `
                    <tr>
                        <td>🗓️ ${meeting.date}</td>
                        <td>⏰ 10:30 AM</td>
                        <td>🎙️ ${meeting.presenter}</td>
                        <td>🔖 ${articleContent}</td>
                        <td>🔗 <a href="https://khu-ac.zoom.us/rec/share/...">Video</a> | <a href="[Link to Slides]">PPT</a></td>
                    </tr>
                ` + pastMeetingsHtml;
            }
        });

        upcomingSection.innerHTML = foundUpcoming ? upcomingHtml : '<h2>Upcoming Meeting</h2><p>No more scheduled meetings.</p>';
        pastMeetingsTableBody.innerHTML = pastMeetingsHtml;
    }

    updateMeetings();
});
