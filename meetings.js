import { allMeetings, meetingGroups } from './meetings-data/index.js';

// Lazy Loading Implementation
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('.lazy-img');
        this.imageObserver = null;
        this.init();
    }

    init() {
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.loadImage(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    rootMargin: '50px 0px', // Start loading 50px before the image enters viewport
                    threshold: 0.01
                }
            );

            this.images.forEach(img => this.imageObserver.observe(img));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            this.loadAllImages();
        }
    }

    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        // Create a new image to preload
        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            delete img.dataset.src;
        };
        tempImg.src = src;
    }

    loadAllImages() {
        this.images.forEach(img => this.loadImage(img));
    }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

function getParticipantAffiliation(card) {
    const affiliationSpan = card.querySelector('.affiliation span');
    if (affiliationSpan) {
        return affiliationSpan.textContent.trim();
    }

    const affiliationParagraph = Array.from(card.querySelectorAll('p'))
        .find(paragraph => paragraph.textContent.includes('Affiliation:'));

    return affiliationParagraph
        ? affiliationParagraph.textContent.replace('Affiliation:', '').trim()
        : '';
}

// Global Search Engine
class SearchEngine {
    constructor() {
        this.searchIndex = [];
        this.initializeUI();
        this.bindEvents();
    }

    buildSearchIndex(meetings) {
        // Index meetings
        const meetingIndex = meetings.map((meeting, idx) => ({
            type: 'meeting',
            id: `meeting-${idx}`,
            date: meeting.date,
            presenter: meeting.presenter,
            title: meeting.article?.title || meeting.articles?.[0]?.title || 'TBD',
            searchText: `${meeting.date} ${meeting.presenter} ${meeting.article?.title || ''} ${meeting.articles?.map(article => article.title).join(' ') || ''}`.toLowerCase()
        }));

        // Index participants (if on participants page)
        const participantCards = document.querySelectorAll('.participant-card');
        const participantIndex = Array.from(participantCards).map((card, idx) => ({
            type: 'participant',
            id: `participant-${idx}`,
            name: card.querySelector('h3')?.textContent || '',
            affiliation: getParticipantAffiliation(card),
            searchText: card.textContent.toLowerCase()
        }));

        this.searchIndex = [...meetingIndex, ...participantIndex];
    }

    initializeUI() {
        // Create search container
        const searchHTML = `
            <div class="search-container">
                <div class="search-wrapper">
                    <input type="search"
                           id="global-search"
                           class="search-input"
                           placeholder="Search meetings, presenters... (Press /)"
                           aria-label="Search">
                    <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </div>
                <div id="search-results" class="search-results" style="display: none;"></div>
            </div>
        `;

        // Insert search into navbar
        const navbar = document.querySelector('.navbar-menu');
        if (navbar) {
            navbar.insertAdjacentHTML('beforeend', searchHTML);
        }
    }

    bindEvents() {
        const searchInput = document.getElementById('global-search');
        const searchResults = document.getElementById('search-results');

        if (!searchInput || !searchResults) return;

        // Search input handler
        searchInput.addEventListener('input', this.debounce((e) => {
            const query = e.target.value.trim();
            if (query.length > 1) {
                const results = this.search(query);
                this.displayResults(results);
            } else {
                searchResults.style.display = 'none';
            }
        }, 300));

        // Focus search on '/' key
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && !this.isInputFocused()) {
                e.preventDefault();
                searchInput.focus();
            }
            if (e.key === 'Escape') {
                searchInput.blur();
                searchResults.style.display = 'none';
            }
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }

    search(query) {
        const q = query.toLowerCase();
        return this.searchIndex
            .filter(item => item.searchText.includes(q))
            .slice(0, 10); // Limit to 10 results
    }

    displayResults(results) {
        const container = document.getElementById('search-results');
        if (!container) return;

        if (!results.length) {
            container.innerHTML = '<div class="no-results">No results found</div>';
            container.style.display = 'block';
            return;
        }

        const meetingResults = results.filter(result => result.type === 'meeting');
        const participantResults = results.filter(result => result.type === 'participant');

        let html = '';

        if (meetingResults.length) {
            html += '<div class="results-section"><h4>Meetings</h4>';
            meetingResults.forEach(meeting => {
                html += `
                    <a href="#${meeting.id}" class="result-item" onclick="document.getElementById('search-results').style.display='none'">
                        <span class="result-date">${meeting.date}</span>
                        <span class="result-presenter">${meeting.presenter}</span>
                        <span class="result-title">${meeting.title.substring(0, 50)}...</span>
                    </a>`;
            });
            html += '</div>';
        }

        if (participantResults.length) {
            html += '<div class="results-section"><h4>Participants</h4>';
            participantResults.forEach(participant => {
                html += `
                    <a href="/participants.html#${participant.id}" class="result-item">
                        <span class="result-name">${participant.name}</span>
                    </a>`;
            });
            html += '</div>';
        }

        container.innerHTML = html;
        container.style.display = 'block';
    }

    isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA';
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Title case 변환 함수 추가
function toTitleCase(str) {
    // 소문자로 변환하지 않을 특수 단어들 (약어, 단위 등)
    const specialWords = new Set(['MHD', 'TBD', 'CME', 'CMEs', '3D', 'EUHFORIA', 'MAVEN', 'SOHO', 'MDI', 'SDO', 'HMI', 'BBSO', 'HOW-MHD', 'WENO', 'GLM-MHD', 'SuNeRF', 'EUV', 'OSPREI', 'COCONUT']);

    // 항상 소문자로 유지할 단어들
    const lowercaseWords = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'of', 'on', 'or', 'the', 'to', 'up', 'yet']);

    return str.split(' ').map((word, index) => {
        // 특수 단어는 그대로 유지
        if (specialWords.has(word.toUpperCase())) {
            return word.toUpperCase();
        }

        // 첫 단어이거나 소문자로 유지할 단어가 아닌 경우
        if (index === 0 || !lowercaseWords.has(word.toLowerCase())) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }

        return word.toLowerCase();
    }).join(' ');
}

function formatUpcomingArticleContent(meeting) {
    if (Array.isArray(meeting.articles)) {
        const articleItems = meeting.articles.map((article, index) =>
            `<li class="article-item"><a href="${article.url}" target="_blank">${index + 1}. ${toTitleCase(article.title)}</a></li>`
        ).join('');

        return `<ul class="article-list">${articleItems}</ul>`;
    }

    if (typeof meeting.article === 'object') {
        const title = meeting.article.title;
        const url = meeting.article.url;

        if (title && title.toUpperCase() !== 'TBD') {
            const formattedTitle = toTitleCase(title);
            if (url && url.toUpperCase() !== 'TBD') {
                return `<a href="${url}" target="_blank">${formattedTitle}</a>`;
            }

            return `<span>${formattedTitle}</span>`;
        }

        return '<span>TBD</span>';
    }

    return `<span>${meeting.article || 'TBD'}</span>`;
}

function formatTableArticleContent(meeting) {
    if (Array.isArray(meeting.articles)) {
        return meeting.articles.map((article, index) =>
            `${index + 1}. <a href="${article.url}" target="_blank">${article.title}</a>`
        ).join('<br>');
    }

    if (typeof meeting.article === 'object') {
        return `<a href="${meeting.article.url}" target="_blank">${meeting.article.title}</a>`;
    }

    return meeting.article || 'TBD';
}

function showMeetings(groupName, meetings) {
    const meetingsTableContainer = document.getElementById('meetings-table-container');
    if (!meetingsTableContainer || !meetings.length) return;

    const startDate = meetings[0].date;
    const endDate = meetings[meetings.length - 1].date;

    let tableHtml = `
        <h3>${startDate} ~ ${endDate}</h3>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Presenter</th>
                    <th>Article</th>
                    <th>Materials</th>
                </tr>
            </thead>
            <tbody>
    `;

    meetings.forEach(meeting => {
        const articleContent = formatTableArticleContent(meeting);
        const videoContent = meeting.video === 'TBD' ? 'TBD' : `<a href="${meeting.video}" target="_blank">Video</a>`;
        const pptContent = meeting.ppt ? (meeting.ppt === 'TBD' ? 'TBD' : `<a href="${meeting.ppt}" target="_blank">PPT</a>`) : 'N/A';

        tableHtml += `
            <tr>
                <td data-label="Date"> ${meeting.date}</td>
                <td data-label="Time"> 10:30 AM</td>
                <td data-label="Presenter"> ${meeting.presenter}</td>
                <td data-label="Article"> ${articleContent}</td>
                <td data-label="Materials"> ${videoContent} | ${pptContent}</td>
            </tr>
        `;
    });

    tableHtml += `
            </tbody>
        </table>
    `;

    meetingsTableContainer.innerHTML = tableHtml;

    // 선택된 그룹 버튼 스타일 변경
    document.querySelectorAll('.quarter-button').forEach(button => {
        button.classList.remove('active');
        if (button.textContent === groupName) {
            button.classList.add('active');
        }
    });
}

function updateMeetings() {
    // validateMeetings(); // 유효성 검사 실행 (주석 처리)
    const upcomingSection = document.getElementById('upcoming-meeting');
    const meetingsContainer = document.getElementById('quarters-container');
    const meetingsTableContainer = document.getElementById('meetings-table-container');

    if (!upcomingSection || !meetingsContainer || !meetingsTableContainer) {
        return;
    }

    const today = new Date();
    const upcomingMeeting = allMeetings.find(meeting => new Date(meeting.date) >= today);

    if (upcomingMeeting) {
        upcomingSection.innerHTML = `
            <div class="upcoming-card">
                <h2 class="card-title">Upcoming Meeting</h2>
                <div class="card-body">
                    <div class="card-item">
                        <span class="item-label">Date</span>
                        <span class="item-value">${upcomingMeeting.date}</span>
                    </div>
                    <div class="card-item">
                        <span class="item-label">Time</span>
                        <span class="item-value">10:30 AM</span>
                    </div>
                    <div class="card-item">
                        <span class="item-label">Presenter</span>
                        <span class="item-value">${upcomingMeeting.presenter}</span>
                    </div>
                    <div class="card-item article-section">
                        <span class="item-label">Article(s)</span>
                        <div class="item-value">${formatUpcomingArticleContent(upcomingMeeting)}</div>
                    </div>
                    <div class="card-item zoom-link">
                        <span class="item-label">Meeting Link</span>
                        <a href="https://khu-ac.zoom.us/j/89012045054" target="_blank" class="zoom-button">Join Zoom Meeting</a>
                    </div>
                </div>
            </div>
        `;
    } else {
        upcomingSection.innerHTML = `
            <div class="upcoming-card upcoming-card-empty">
                <h2 class="card-title">Upcoming Meeting</h2>
                <p class="card-body">No more scheduled meetings.</p>
            </div>
        `;
    }

    meetingsContainer.innerHTML = '';
    meetingGroups.forEach(group => {
        const button = document.createElement('button');
        button.textContent = group.id;
        button.classList.add('quarter-button');
        button.addEventListener('click', () => showMeetings(group.id, group.meetings));
        meetingsContainer.appendChild(button);
    });

    // 가장 최근 미팅 그룹을 기본으로 표시
    const latestGroup = meetingGroups[meetingGroups.length - 1];
    if (latestGroup) {
        showMeetings(latestGroup.id, latestGroup.meetings);
    }
}

function setupMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbarMenu = document.getElementById('navbar-menu');

    if (!mobileMenu || !navbarMenu) {
        return;
    }

    mobileMenu.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active'); // For the 'X' animation
    });

    // Close mobile menu when a link is clicked
    navbarMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize theme manager (dark mode)
    // Theme manager removed - light mode only

    // Initialize lazy loading
    new LazyImageLoader();

    // Initialize search engine
    const searchEngine = new SearchEngine();

    updateMeetings();

    // Build search index after meetings are loaded
    searchEngine.buildSearchIndex(allMeetings);

    // --- Navbar Mobile Menu Toggle ---
    setupMobileMenu();
    // --- End Navbar Mobile Menu Toggle ---

    // 스크롤 시 네비게이션 바 스타일 변경 (기존 코드 제거 - CSS로 처리)
    // window.addEventListener('scroll', function() {
    //     const navbar = document.querySelector('.navbar');
    //     if (window.scrollY > 50) {
    //         navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    //     } else {
    //         navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    //     }
    // });
});
