import { LocalStorage, Notify } from 'quasar';
import { axiosInstance } from '../../boot/axios';

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
            });
        });
    });
}

export function checkIfSessionKeyValid({ state, dispatch }) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/', {
            requestType: 'checkSessionKey',
            sessionKey: state.sessionKey,
        }).then((response) => {
            if (response.data.valid) {
                if (response.data.gaveReward) {
                    Notify.create({
                        message: 'You got a login reward! +5',
                        timeout: 3000,
                        color: 'green',
                    });
                }
                resolve();
            } else {
                Notify.create({
                    message: 'Session expired',
                    timeout: 3000,
                    color: 'red',
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
