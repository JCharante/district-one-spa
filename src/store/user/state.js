import { LocalStorage } from 'quasar';

function baseGen() {
    return {
        sessionKey: '',
        lastAnnouncementVersionShown: 1,
        hideAnnouncement: false,
        shortTeamInfo: [],
        teamAvatars: {},
        teamLikes: [],
    };
}

let stored = {};
if (LocalStorage.has('vuex-store-user')) {
    stored = LocalStorage.getItem('vuex-store-user');
}

export default Object.assign(baseGen(), stored);
