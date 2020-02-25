import Vue from 'vue';

export function setSessionKey(state, val) {
    Vue.set(state, 'sessionKey', val);
}

export function setShortTeamInfo(state, val) {
    Vue.set(state, 'shortTeamInfo', val);
}

export function setShortEventInfo(state, val) {
    Vue.set(state, 'shortEventInfo', val);
}


export function setLocale(state, val) {
    Vue.set(state, 'locale', val);
}

// eslint-disable-next-line camelcase
export function setTeamAvatar(state, { team_number, avatar }) {
    Vue.set(state.teamAvatars, team_number, avatar);
}

export function setTeamLikes(state, teamLikes) {
    Vue.set(state, 'teamLikes', teamLikes);
}


export function setEventLikes(state, eventLikes) {
    Vue.set(state, 'eventLikes', eventLikes);
}
