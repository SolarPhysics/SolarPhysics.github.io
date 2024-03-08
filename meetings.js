document.addEventListener('DOMContentLoaded', function() {
    const meetings = [

        { date: '2023-09-08', presenter: 'Sibaek Yi', article: { title: 'A Model for the Sources of the Slow Solar Wind', url: 'https://arxiv.org/abs/1102.3704'}, video: 'TBD' },
        { date: '2023-09-15', presenter: 'Junmo An', article: { title: 'TBD', url: 'TBD'}, video: 'TBD'},
        { date: '2023-09-22', presenter: 'Jihye Kang', article: { title: 'Onset mechanism and a physics-based prediction of large solar flares', url: 'https://ui.adsabs.harvard.edu/abs/2021AGUFMSH23B..01K/abstract' }, video: 'TBD'},
        { date: '2023-10-06', presenter: 'Donghui Son', article: { title: 'On rising magnetic flux tube and formation of sunspots in a deep domain', url: 'https://arxiv.org/abs/2003.10583'}, video: 'TBD'},
        { date: '2023-10-13', presenter: 'Yeonwoo Jang', article: { title: 'A Framework for Detecting Polarity Inversion Lines from Longitudinal Magnetograms', url: 'https://ieeexplore.ieee.org/document/9377808'}, video: 'TBD'},
        { date: '2023-11-10', presenter: 'Hwanhee Lee', article: { title: 'Origin of the Wang–Sheeley–Arge solar wind model', url: 'https://hgss.copernicus.org/articles/8/21/2017/' }, video: 'https://khu-ac.zoom.us/rec/share/3I3bxvfs1K46M7tC0UtWozl6eEuuvdNIjwRNM2_q6Vlt1JY5IFW6VmAEDaeBoafj.NHLOBvawpYkdG_Kp'},
        { date: '2023-11-17', presenter: 'Yeongmin Kang', article: { title: 'Data-driven MHD simulation study of an inclined solar eruption in NOAA active region 11283', url: 'TBD' }, video: 'https://khu-ac.zoom.us/rec/share/UXKfj93JlHNoRZwn_F4Rxg-8rD-tUk-lbVARb744S3TXLLkHaKoWSk83ZxVg68MQ.yLydNWG3iVwPw3nN'},
        { date: '2023-11-24', presenter: 'Mingyu Jeon', article: { title: 'Probing the solar coronal magnetic field with physics-informed neural networks', url: 'https://www.nature.com/articles/s41550-023-02085-8' }, video: 'https://khu-ac.zoom.us/rec/share/IfOOGO1Oj0w7L-O7zjanmtCJ40ld6KCmBn3BtUgKo_ZlfLfzq7DAGehc6Xoq5EfL.nlC8VEiAVNNPTqgv'},
        { date: '2023-12-01', presenter: 'Hyunjin Jeong', article: { title: 'Rotation and interaction of the CMEs of September 8 and 10, 2014, tested with EUHFORIA', url: 'https://www.aanda.org/articles/aa/full_html/2023/07/aa45902-23/aa45902-23.html' }, video: 'https://khu-ac.zoom.us/rec/share/8M-6tyRGHj3ZxhWP1uiwyGEPEG6EAbGgjN0n7vpmXcTYXEmpVxQ80MOOvxvtZoxJ.HTpzFqJ3LcuQ_kld'},
        { date: '2023-12-08', presenter: 'Sunghong Park', article: { title: 'Testing the Alfvén-wave Model of the Solar Wind with Interplanetary Scintillation', url: 'https://ui.adsabs.harvard.edu/abs/2022ApJ...928..130S/abstract' }, video: 'https://khu-ac.zoom.us/rec/share/F_2ueUqEWtt4nyWF8Ama2ScjWBAiGMR3Nr8TAER9qgx2nO6zmeOA_u1wTHTrwWBZ.1RIplgH_EL6wZa67'},

        { date: '2024-01-12', presenter: 'Sibaek Yi', article: { title: 'The Thickness of Electric Current Sheets and Implications for Coronal Heating', url: 'https://arxiv.org/abs/2307.13825' }, video: 'TBD' },
        { date: '2024-01-19', presenter: 'Junmo An', article: { title: 'The Variations in Finite-difference Potential Fields: Models and Observations', url: 'https://arxiv.org/abs/2102.05618' }, video: 'https://khu-ac.zoom.us/rec/share/E0q1Wzl_BYkEiN-r8X2wSQyCCuFg6gewO-5oAuQREZ_DNbraJoXuCKd3WXqbhP49.RS_unTEpFm0fbH17' },
        { date: '2024-01-26', presenter: 'Jihye Kang', article: { title: 'Coronal Mass Ejections: A Deep Learning Approach to Generating Photospheric Vector Magnetograms of Solar Active Regions for SOHO/MDI Using SDO/HMI and BBSO Data and Effects', url: 'https://arxiv.org/abs/2211.02278' }, video: 'TBD'},
        { date: '2024-02-02', presenter: 'Donghui Son', article: { title: 'HOW-MHD: A High-Order WENO-Based Magnetohydrodynamic Code with a High-Order Constrained Transport Algorithm for Astrophysical Applications', url: 'https://arxiv.org/abs/2304.04360' }, video: 'TBD'},
        { date: '2024-02-16', presenter: 'Yeonwoo Jang', article: { title: 'Testing magnetohydrostatic extrapolation with radiative MHD simulation of a solar flare', url: 'https://arxiv.org/abs/1910.03523' }, video: 'https://khu-ac.zoom.us/rec/share/q9BScJYobQVCmtOslqwzHzL2OsAttPAEKvC4Gvl1eN4D-_IPFYuG9xMSFCANbsRR.Lm2CguFzUpaTNxnk'},
        { date: '2024-02-23', presenter: 'Hwanhee Lee', article: { title: 'Ensemble Modeling of CME Propagation', url: 'https://ui.adsabs.harvard.edu/abs/2013SoPh..285..349L/abstract' }, video: 'https://khu-ac.zoom.us/rec/share/AMDpo4or2Amp9i7er1du4sF-30zl-mMB_nhrRE-C3v4NpTv1LeLmKFZc8UjFOl5R.RKzGREJSFiiKrCRq?startTime=1708651658000'},
        { date: '2024-03-08', presenter: 'Yeongmin Kang', article: { title: 'Comparative Study of Data-driven Solar Coronal Field Models Using a Flux Emergence Simulation as a Ground-truth Data Set', url: 'https://arxiv.org/abs/2001.03721v1' }, video: 'TBD'},
        // Future meetings without article details yet are marked as TBD
        { date: '2024-03-15', presenter: 'Mingyu Jeon', article: 'TBD', video: 'TBD' },
        { date: '2024-03-22', presenter: 'Hyunjin Jeong', article: 'TBD', video: 'TBD' },
        { date: '2024-03-29', presenter: 'Sunghong Park', article: 'TBD', video: 'TBD' },
        { date: '2024-04-05', presenter: 'Kyungsun Park', article: 'TBD', video: 'TBD' }
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
                // articleContent = `<a href="${meeting.article.url}">${meeting.article.title}</a>`;
                articleContent = `<a href="${meeting.article.url}" target="_blank">${meeting.article.title}</a>`;
               
            }
            let videoContent = (typeof meeting.video === 'string' && meeting.video !== 'TBD') ? `<a href="${meeting.video}" target="_blank">Video</a>` : 'TBD';
            if (meetingDate >= today && !foundUpcoming) {
                upcomingHtml += `
                    <p><strong>🗓️ Date:</strong> &ensp; <span class="presenter-name">${meeting.date}</span></p>
                    <p><strong>⏰ Time:</strong> &ensp; <span class="presenter-name">10:30 AM</span></p>
                    <p><strong>🎙️ Presenter:</strong> &ensp; <span class="presenter-name">${meeting.presenter}</span></p>
                    <p><strong>🔖 Article:</strong> &ensp; <span class="presenter-name">${articleContent}</span></p>
                    <p><strong>🖥️ Zoom Link:</strong> &ensp; <a href="https://khu-ac.zoom.us/j/84681128298" target="_blank">Join Meeting</a></p>
                `;
                foundUpcoming = true;
            } else if (meetingDate < today) {
                pastMeetingsHtml = `
                    <tr>
                        <td>🗓️ ${meeting.date}</td>
                        <td>⏰ 10:30 AM</td>
                        <td>🎙️ ${meeting.presenter}</td>
                        <td>🔖 ${articleContent}</td>
                        <td>🔗 ${videoContent} | <a href="[Link to Slides]" target="_blank">PPT</a></td>

                    </tr>
                ` + pastMeetingsHtml;
            }
        });

        upcomingSection.innerHTML = foundUpcoming ? upcomingHtml : '<h2>Upcoming Meeting</h2><p>No more scheduled meetings.</p>';
        pastMeetingsTableBody.innerHTML = pastMeetingsHtml;
    }

    updateMeetings();
});
