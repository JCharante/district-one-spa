<template>
    <div class="row">
        <div class="col-md-2 col-xs-12" style="padding-top: 10px; padding-bottom: 10px;">
            <q-item dense>
                <q-item-section>
                    <q-item-label caption>
                        <router-link :to="`/event/${match.event_key}`">{{ getShortEventInfoDict[match.event_key].name }}</router-link>
                    </q-item-label>
                    <q-item-label>
                        {{ computeMatchIdentifier(match.comp_level, match.set_number, match.match_number) }} <a :href="tbaLink" exact>(TBA)</a>
                    </q-item-label>
                </q-item-section>
            </q-item>
        </div>
        <div :class="{ 'col-xs-12': true, 'col-md-4': true, 'bg-blue-1': match.winning_alliance !== 'blue', 'bg-blue-3': match.winning_alliance === 'blue' }" style="padding-top: 10px; padding-bottom: 10px;">
            <q-list>
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
                            (<a :href="`https://www.thebluealliance.com/team/${teamNumber}`" target="_blank">TBA</a>)
                        </q-item-label>
                        <q-item-label caption>
                            Live Rank #{{ listRankedTeams.indexOf(getShortTeamInfoDict[teamNumber]) }},
                            {{ getShortTeamInfoDict[teamNumber].likes }} likes
                        </q-item-label>
                        <q-item-label v-if="'matchRankings' in match" caption>
                            Team Score: <b><span v-if="deltaScalar(teamNumber) > 0">+</span>{{ deltaScalar(teamNumber).toFixed(2) }}</b>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
        <div :class="{ 'col-xs-12': true, 'col-md-4': true, 'bg-red-1': match.winning_alliance !== 'red', 'bg-red-3': match.winning_alliance === 'red' }" style="padding-top: 10px; padding-bottom: 10px;">
            <q-list>
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
                            (<a :href="`https://www.thebluealliance.com/team/${teamNumber}`" target="_blank">TBA</a>)
                        </q-item-label>
                        <q-item-label caption>
                            Live Rank #{{ listRankedTeams.indexOf(getShortTeamInfoDict[teamNumber]) }},
                            {{ getShortTeamInfoDict[teamNumber].likes }} likes
                        </q-item-label>
                        <q-item-label v-if="'matchRankings' in match" caption>
                            Team Score: <b><span v-if="deltaScalar(teamNumber) > 0">+</span>{{ deltaScalar(teamNumber).toFixed(2) }}</b>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
        <div class="col-xs-12 col-md-2 text-center" style="padding-top: 10px; padding-bottom: 10px;">
            <div v-if="match.actual_time !== null">
                <p class="text-blue-10" v-if="match.winning_alliance === 'blue'">Blue Alliance Won!</p>
                <p class="text-red-10" v-else-if="match.winning_alliance === 'red'">Red Alliance Won!</p>
                <p v-else>It was a tie!</p>
            </div>
            <div v-else>
                Match Scheduled. Check back soon!
            </div>
            <p>Match predictions coming soon.</p>
        </div>
    </div>
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
            preScalar(teamNumber) {
                return this.match.matchRankings.preRankings['frc' + teamNumber].mu - (3 * this.match.matchRankings.preRankings['frc' + teamNumber].sigma);
            },
            postScalar(teamNumber) {
                return this.match.matchRankings.postRankings['frc' + teamNumber].mu - (3 * this.match.matchRankings.postRankings['frc' + teamNumber].sigma);
            },
            deltaScalar(teamNumber) {
                return this.postScalar(teamNumber) - this.preScalar(teamNumber);
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
