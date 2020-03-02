import { LocalStorage, Notify } from 'quasar';
import axios, { axiosInstance } from '../../boot/axios';

export function refreshShortTeamInfo({ commit }) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/', {
            requestType: 'getTeamsForTeamList',
        }).then((response) => {
            commit('setShortTeamInfo', response.data.teams);
            resolve();
        }).catch((err) => {
            reject(err);
            Notify.create({
                message: err,
                timeout: 2000,
                color: 'red',
                position: 'top',
            });
        });
    });
}


export function refreshShortEventInfo({ commit }) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/', {
            requestType: 'getShortEventInfo',
        }).then((response) => {
            commit('setShortEventInfo', response.data.events);
            resolve();
        }).catch((err) => {
            reject(err);
            Notify.create({
                message: err,
                timeout: 2000,
                color: 'red',
                position: 'top',
            });
        });
    });
}


export function getTeamLikes({ state, commit }) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/', {
            requestType: "getTeamAndEventLikes",
            sessionKey: state.sessionKey,
        }).then((response) => {
            commit('setTeamLikes', response.data.teamLikes);
            commit('setEventLikes', response.data.eventLikes);
            resolve();
        }).catch((err) => {
            reject(err);
            Notify.create({
                message: err,
                timeout: 2000,
                color: 'red',
                position: 'top',
            });
        });
    });
}

export function likeTeam({ state, commit }, { teamNumber }) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/', {
            requestType: "likeTeam",
            sessionKey: state.sessionKey,
            teamNumber,
        }).then((response) => {
            commit('setTeamLikes', response.data.teamLikes);
            commit('setEventLikes', response.data.eventLikes);
            Notify.create({
                message: response.data.success_msg,
                timeout: 2000,
                color: 'green',
                position: 'top',
            });
            resolve();
        }).catch((err) => {
            reject(err);
            Notify.create({
                message: err,
                timeout: 2000,
                color: 'red',
                position: 'top',
            });
        });
    });
}

export function likeEvent({ state, commit }, { eventCode }) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/', {
            requestType: "likeEvent",
            sessionKey: state.sessionKey,
            eventCode,
        }).then((response) => {
            commit('setTeamLikes', response.data.teamLikes);
            commit('setEventLikes', response.data.eventLikes);
            Notify.create({
                message: response.data.success_msg,
                timeout: 2000,
                color: 'green',
                position: 'top',
            });
            resolve();
        }).catch((err) => {
            reject(err);
            Notify.create({
                message: err,
                timeout: 2000,
                color: 'red',
                position: 'top',
            });
        });
    });
}

export function unlikeTeam({ state, commit }, { teamNumber }) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/', {
            requestType: "unlikeTeam",
            sessionKey: state.sessionKey,
            teamNumber,
        }).then((response) => {
            commit('setTeamLikes', response.data.teamLikes);
            commit('setEventLikes', response.data.eventLikes);
            Notify.create({
                message: response.data.success_msg,
                timeout: 2000,
                color: 'green',
                position: 'top',
            });
            resolve();
        }).catch((err) => {
            reject(err);
            Notify.create({
                message: err,
                timeout: 2000,
                color: 'red',
                position: 'top',
            });
        });
    });
}

export function unlikeEvent({ state, commit }, { eventCode }) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/', {
            requestType: "unlikeEvent",
            sessionKey: state.sessionKey,
            eventCode,
        }).then((response) => {
            commit('setTeamLikes', response.data.teamLikes);
            commit('setEventLikes', response.data.eventLikes);
            Notify.create({
                message: response.data.success_msg,
                timeout: 2000,
                color: 'green',
            });
            resolve();
        }).catch((err) => {
            reject(err);
            Notify.create({
                message: err,
                timeout: 2000,
                color: 'red',
                position: 'top',
            });
        });
    });
}

// eslint-disable-next-line camelcase
export function getTeamAvatars({ commit }, { list_of_team_number }) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/', {
            requestType: 'getAvatarsForTeams',
            list_of_team_number,
        }).then((response) => {
            // eslint-disable-next-line camelcase
            Object.keys(response.data).forEach((team_number) => {
                commit('setTeamAvatar', { team_number, avatar: response.data[team_number] });
            });
            resolve();
        }).catch((err) => {
            reject(err);
            Notify.create({
                message: err,
                timeout: 2000,
                color: 'red',
                position: 'top',
            });
        });
    });
}

export function checkIfSessionKeyValid({ state, dispatch }) {
    return new Promise((resolve, reject) => {
        if (state.sessionKey.length === 0) {
            resolve();
            return;
        }
        axiosInstance.post('/', {
            requestType: 'checkSessionKey',
            sessionKey: state.sessionKey,
        }).then((response) => {
            if (response.data.valid) {
                dispatch('getTeamLikes');
                if (response.data.gaveReward) {
                    Notify.create({
                        message: 'You got a login reward! +5',
                        timeout: 3000,
                        color: 'green',
                        position: 'top',
                    });
                }
                resolve();
            } else {
                Notify.create({
                    message: 'Session expired',
                    timeout: 3000,
                    color: 'red',
                    position: 'top',
                });
                dispatch('userLogout');
                resolve();
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

export function saveUserStore({ state }) {
    LocalStorage.set('vuex-store-user', state);
}

export function userLogout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
        commit('setSessionKey', '');
        commit('setTeamLikes', []);
        commit('setEventLikes', []);
        commit('setHideAnnouncementUntil', new Date());
        dispatch('saveUserStore');
        resolve();
    });
}

export function login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

export function setSessionKey({ commit, dispatch }, { sessionKey }) {
    localStorage.setItem('sessionKey', sessionKey);
    commit('setSessionKey', sessionKey);
    dispatch('saveUserStore');
}

export function setHideAnnouncement24Hours({ commit, dispatch }) {
    const newDate = new Date();
    newDate.setHours(newDate.getHours() + 24);
    commit('setHideAnnouncementUntil', newDate);
    dispatch('saveUserStore');
}
