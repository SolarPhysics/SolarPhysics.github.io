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

function parseMeetingDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function getMeetingArticles(meeting) {
    if (Array.isArray(meeting.articles) && meeting.articles.length) {
        return meeting.articles;
    }

    if (typeof meeting.article === 'object' && meeting.article) {
        return [meeting.article];
    }

    if (typeof meeting.article === 'string') {
        return [{ title: meeting.article }];
    }

    return [{ title: 'TBD' }];
}

function formatArticleMarkup(article, titleCase = false) {
    const title = article?.title;

    if (!title || title.toUpperCase() === 'TBD') {
        return '<span>TBD</span>';
    }

    const label = titleCase ? toTitleCase(title) : title;

    if (article.url && article.url.toUpperCase() !== 'TBD') {
        return `<a href="${article.url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    }

    return `<span>${label}</span>`;
}

function formatUpcomingArticleContent(meeting) {
    const articles = getMeetingArticles(meeting);

    if (articles.length > 1) {
        const articleItems = articles.map(article =>
            `<li class="article-item">${formatArticleMarkup(article, true)}</li>`
        ).join('');

        return `<ul class="article-list">${articleItems}</ul>`;
    }

    return formatArticleMarkup(articles[0], true);
}

function formatTableArticleContent(meeting) {
    const articles = getMeetingArticles(meeting);

    if (articles.length > 1) {
        return articles.map((article, index) =>
            `${index + 1}. ${formatArticleMarkup(article)}`
        ).join('<br>');
    }

    return formatArticleMarkup(articles[0]);
}

function formatMeetingCardArticleContent(meeting) {
    const articles = getMeetingArticles(meeting);

    if (articles.length > 1) {
        const articleItems = articles.map((article, index) =>
            `<li class="meeting-card-article-item">${index + 1}. ${formatArticleMarkup(article)}</li>`
        ).join('');

        return `<ul class="meeting-card-article-list">${articleItems}</ul>`;
    }

    return `<div class="meeting-card-article-single">${formatArticleMarkup(articles[0])}</div>`;
}

function formatTableMaterials(meeting) {
    const videoContent = meeting.video === 'TBD'
        ? 'TBD'
        : `<a href="${meeting.video}" target="_blank" rel="noopener noreferrer">Video</a>`;
    const pptContent = meeting.ppt
        ? (meeting.ppt === 'TBD'
            ? 'TBD'
            : `<a href="${meeting.ppt}" target="_blank" rel="noopener noreferrer">PPT</a>`)
        : 'N/A';

    return `${videoContent} | ${pptContent}`;
}

function formatMeetingCardMaterials(meeting) {
    const materials = [];

    if (meeting.video === 'TBD') {
        materials.push('<span class="meeting-material-text">Video TBD</span>');
    } else {
        materials.push(`<a href="${meeting.video}" target="_blank" rel="noopener noreferrer" class="meeting-material-link">Video</a>`);
    }

    if (!meeting.ppt) {
        materials.push('<span class="meeting-material-text">PPT N/A</span>');
    } else if (meeting.ppt === 'TBD') {
        materials.push('<span class="meeting-material-text">PPT TBD</span>');
    } else {
        materials.push(`<a href="${meeting.ppt}" target="_blank" rel="noopener noreferrer" class="meeting-material-link">PPT</a>`);
    }

    return materials.join('');
}

function showMeetings(groupName, meetings) {
    const meetingsTableContainer = document.getElementById('meetings-table-container');
    if (!meetingsTableContainer || !meetings.length) return;

    const startDate = meetings[0].date;
    const endDate = meetings[meetings.length - 1].date;

    const tableRows = meetings.map(meeting => `
        <tr>
            <td data-label="Date">${meeting.date}</td>
            <td data-label="Time">10:30 AM</td>
            <td data-label="Presenter">${meeting.presenter}</td>
            <td data-label="Article">${formatTableArticleContent(meeting)}</td>
            <td data-label="Materials">${formatTableMaterials(meeting)}</td>
        </tr>
    `).join('');

    const mobileCards = meetings.map(meeting => `
        <article class="meeting-card">
            <div class="meeting-card-header">
                <span class="meeting-card-date">${meeting.date}</span>
                <span class="meeting-card-time">10:30 AM</span>
            </div>
            <div class="meeting-card-row">
                <span class="meeting-card-label">Presenter</span>
                <div class="meeting-card-value">${meeting.presenter}</div>
            </div>
            <div class="meeting-card-row">
                <span class="meeting-card-label">Article</span>
                <div class="meeting-card-value">${formatMeetingCardArticleContent(meeting)}</div>
            </div>
            <div class="meeting-card-row">
                <span class="meeting-card-label">Materials</span>
                <div class="meeting-card-value meeting-material-links">${formatMeetingCardMaterials(meeting)}</div>
            </div>
        </article>
    `).join('');

    const tableHtml = `
        <h3 class="meeting-range">${startDate} ~ ${endDate}</h3>
        <div class="meetings-desktop-view">
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
                    ${tableRows}
                </tbody>
            </table>
        </div>
        <div class="meetings-mobile-list">
            ${mobileCards}
        </div>
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
    today.setHours(0, 0, 0, 0);

    const upcomingMeeting = allMeetings.find(meeting => parseMeetingDate(meeting.date) >= today);

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
                        <a href="https://khu-ac.zoom.us/j/89012045054" target="_blank" rel="noopener noreferrer" class="zoom-button">Join Zoom Meeting</a>
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
        button.type = 'button';
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

    const setMenuState = isOpen => {
        navbarMenu.classList.toggle('active', isOpen);
        mobileMenu.classList.toggle('active', isOpen);
        mobileMenu.setAttribute('aria-expanded', String(isOpen));
    };

    mobileMenu.addEventListener('click', () => {
        const isOpen = !navbarMenu.classList.contains('active');
        setMenuState(isOpen);
    });

    // Close mobile menu when a link is clicked
    navbarMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('active')) {
                setMenuState(false);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize theme manager (dark mode)
    // Theme manager removed - light mode only

    // Initialize lazy loading
    new LazyImageLoader();

    updateMeetings();

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
