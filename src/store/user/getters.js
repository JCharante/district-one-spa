export function getSessionKey(state) {
    return state.sessionKey;
}

export function getDisplayName(state) {
    return state.displayName;
}

export function getShortTeamInfo(state) {
    return state.shortTeamInfo;
}

export function listRankedTeams(state) {
    return state.shortTeamInfo.filter((v) => typeof v.ranking === typeof {}).sort((a, b) => (a.ranking.scalar > b.ranking.scalar ? -1 : 1));
}

export function teamRankingsDict(state) {
    const dict = {};
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < listRankedTeams(state).length; i++) {
        dict[listRankedTeams(state)[i - 1].team_number] = i;
    }
    return dict;
}

export function getShortTeamInfoDict(state) {
    const dict = {};
    state.shortTeamInfo.forEach((obj) => {
        dict[obj.team_number] = obj;
    });
    return dict;
}

export function getShortEventInfoDict(state) {
    const dict = {};
    state.shortEventInfo.forEach((obj) => {
        dict[obj.eventCode] = obj;
    });
    return dict;
}

export function getShortEventInfo(state) {
    return state.shortEventInfo;
}

export function getTeamAvatars(state) {
    return state.teamAvatars;
}

export function isProbablySignedIn(state) {
    return state.sessionKey.length > 0;
}

export function getLocale(state) {
    return state.locale;
}

export function getDarkModeEnabled(state) {
    return state.darkModeEnabled;
}

export function getEnableOnlineSync(state) {
    return state.enableOnlineSync;
}

export function getTeamLikes(state) {
    return state.teamLikes;
}

export function getEventLikes(state) {
    return state.eventLikes;
}

export function getHideAnnouncement(state) {
    return new Date() < state.hideAnnouncementUntil;
}
