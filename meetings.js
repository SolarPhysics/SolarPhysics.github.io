document.addEventListener('DOMContentLoaded', function() {
    const meetings = [
        { date: '2024-01-12', presenter: 'Sibaek Yi', article: { title: 'Solar Dynamics and Magnetism', url: 'https://example.com/article1' }},
        { date: '2024-01-19', presenter: 'Junmo An', article: { title: 'The Heliosphere: Models and Observations', url: 'https://example.com/article2' }},
        { date: '2024-01-26', presenter: 'Jihye Kang', article: { title: 'Coronal Mass Ejections: Causes and Effects', url: 'https://example.com/article3' }},
        { date: '2024-02-02', presenter: 'Donghui Son', article: { title: 'Solar Flares: Predicting Solar Storms', url: 'https://example.com/article4' }},
        { date: '2024-02-16', presenter: 'Yeonwoo Jang', article: 'TBD' },
        // Future meetings without article details yet are marked as TBD
        { date: '2024-02-16', presenter: 'Yeonwoo Jang', article: 'TBD' },
        { date: '2024-02-23', presenter: 'Hwanhee Lee', article: 'TBD' },
        { date: '2024-03-08', presenter: 'Yeongmin Kang', article: 'TBD' },
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
                articleContent = `<a href="${meeting.article.url}">${meeting.article.title}</a>`; // Use link and title for past meetings
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
