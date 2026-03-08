import meetings2023First from './2023-1st.js';
import meetings2024First from './2024-1st.js';
import meetings2024Second from './2024-2nd.js';
import meetings2024Third from './2024-3rd.js';
import meetings2025First from './2025-1st.js';
import meetings2025Second from './2025-2nd.js';

export const meetingGroups = [
    meetings2023First,
    meetings2024First,
    meetings2024Second,
    meetings2024Third,
    meetings2025First,
    meetings2025Second
];

export const allMeetings = meetingGroups.flatMap(group => group.meetings);
