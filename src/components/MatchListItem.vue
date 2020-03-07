<template>
    <q-item dense>
        <q-item-section>
            <q-item-label caption>
                <router-link :to="`/event/${match.event_key}`">{{ getShortEventInfoDict[match.event_key].name }}</router-link>
            </q-item-label>
            <q-item-label>
                {{ computeMatchIdentifier(match.comp_level, match.set_number, match.match_number) }} <a :href="tbaLink" exact>(TBA)</a>
            </q-item-label>
        </q-item-section>
        <q-item-section>
            <q-list>
                <q-item-label header>Blue Alliance</q-item-label>
                <q-item dense v-for="teamNumber in allianceTeamNumbers.blue" :key="teamNumber">
                    <q-item-section avatar>
                        <q-avatar square color="blue" v-if="teamNumber in getTeamAvatars">
                            <img :src="getTeamAvatars[teamNumber]">
                        </q-avatar>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-btn v-if="getTeamLikes.includes(teamNumber)"
                               round
                               icon="favorite"
                               size="xs"
                               @click="isProbablySignedIn ? unlikeTeam({ teamNumber }) : $emit('promptlogin')"
                               color="primary"/>
                        <q-btn v-if="!getTeamLikes.includes(teamNumber)"
                               round
                               outline
                               icon="favorite"
                               @click="isProbablySignedIn ? likeTeam({ teamNumber }) : $emit('promptlogin')"
                               size="xs"
                               color="primary"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>
                            <router-link :to="`/team/${teamNumber}`" exact>
                                {{ teamNumber }} - {{ getShortTeamInfoDict[teamNumber].nickname }}
                            </router-link>
                            (<a :href="`https://www.thebluealliance.com/team/${teamNumber}`" target="_blank">
                                TBA
                            </a>)
                        </q-item-label>
                        <q-item-label caption>
                            Currently Rank #{{ listRankedTeams.indexOf(getShortTeamInfoDict[teamNumber]) }},
                            {{ getShortTeamInfoDict[teamNumber].likes }} likes
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-item-section>
        <q-item-section>
            <q-list>
                <q-item-label header>Red Alliance</q-item-label>
                <q-item dense v-for="teamNumber in allianceTeamNumbers.red" :key="teamNumber">
                    <q-item-section avatar>
                        <q-avatar square color="red" v-if="teamNumber in getTeamAvatars">
                            <img :src="getTeamAvatars[teamNumber]">
                        </q-avatar>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-btn v-if="getTeamLikes.includes(teamNumber)"
                               round
                               icon="favorite"
                               size="xs"
                               @click="isProbablySignedIn ? unlikeTeam({ teamNumber }) : $emit('promptlogin')"
                               color="primary"/>
                        <q-btn v-if="!getTeamLikes.includes(teamNumber)"
                               round
                               outline
                               icon="favorite"
                               @click="isProbablySignedIn ? likeTeam({ teamNumber }) : $emit('promptlogin')"
                               size="xs"
                               color="primary"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>
                            <router-link :to="`/team/${teamNumber}`" exact>
                                {{ teamNumber }} - {{ getShortTeamInfoDict[teamNumber].nickname }}
                            </router-link>
                            (<a :href="`https://www.thebluealliance.com/team/${teamNumber}`" target="_blank">
                            TBA
                        </a>)
                        </q-item-label>
                        <q-item-label caption>
                            Currently Rank #{{ listRankedTeams.indexOf(getShortTeamInfoDict[teamNumber]) }},
                            {{ getShortTeamInfoDict[teamNumber].likes }} likes
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-item-section>
    </q-item>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'MatchListItem',
        props: ['match'],
        methods: {
            computeMatchIdentifier(compLevel, setNumber, matchNumber) {
                let ret = compLevel;
                if (['qf', 'sf', 'f'].includes(compLevel)) {
                    ret += setNumber + 'm';
                }
                ret += matchNumber;
                return ret;
            },
        },
        computed: {
            ...mapGetters(['getTeamLikes', 'getShortEventInfoDict', 'getShortTeamInfoDict', 'getTeamAvatars', 'listRankedTeams', 'isProbablySignedIn']),
            tbaLink() {
                return 'https://www.thebluealliance.com/match/' + this.match.event_key + '_' + this.computeMatchIdentifier(this.match.comp_level, this.match.set_number, this.match.match_number);
            },
            allianceTeamNumbers() {
                return {
                    // eslint-disable-next-line radix
                    blue: this.match.alliances.blue.team_keys.map((v) => v.replace('frc', '')).map((v) => parseInt(v)),
                    // eslint-disable-next-line radix
                    red: this.match.alliances.red.team_keys.map((v) => v.replace('frc', '')).map((v) => parseInt(v)),
                };
            },
        },
    };
</script>

<style scoped>

</style>
