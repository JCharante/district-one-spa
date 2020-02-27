<template>
    <div v-if="!gotDataYet">
        <p>Loading...</p>
    </div>
    <div v-else>
        <q-card
            v-if="getShortTeamInfo.length > 0"
            flat
            bordered
            dense>
            <q-item>
                <q-item-section avatar v-if="team.team_number in getTeamAvatars">
                    <q-avatar>
                        <img :src="getTeamAvatars[team.team_number]">
                    </q-avatar>
                </q-item-section>

                <q-item-section>
                    <q-item-label>
                        FRC {{ team.team_number }} - {{ team.nickname }}
                    </q-item-label>
                    <q-item-label caption>
                        {{ team.name }}
                    </q-item-label>
                    <q-item-label caption>
                        Since {{ team.rookie_year }}
                    </q-item-label>
                    <q-item-label caption>
                        From {{ team.school_name }} in {{ team.city }}
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-card-actions>
                <q-btn flat
                       round
                       color="red"
                       icon="favorite"
                       v-if="teamIsLiked"
                       @click="isProbablySignedIn ? unlikeTeam({ teamNumber: team.team_number }) : $refs.loginmodal.show()"/>
                <q-btn round
                       icon="favorite"
                       v-if="!teamIsLiked"
                       flat
                       color="black"
                       @click="isProbablySignedIn ? likeTeam({ teamNumber: team.team_number }) : $refs.loginmodal.show()"/>
                <span flat color="primary">
                    {{ getShortTeamInfoDict[team.team_number].likes }} people have favorited
                </span>
            </q-card-actions>
        </q-card>
        <q-card
            flat
            bordered
            v-if="typeof team.ranking !== typeof {}"
            dense>
            <q-item>
                <q-item-section>
                    <q-item-label class="text-center">
                        Team Ranking
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-item-label class="text-center">
                        Sorry but this team is currently unranked. Tell them to do a week 1 event.
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-card>
        <q-card
            flat
            bordered
            v-if="typeof team.ranking === typeof {}"
            dense>
            <q-item>
                <q-item-section>
                    <q-item-label class="text-center">
                        Rank {{ teamRankingsDict[team.team_number] }} with a combined score of {{ team.ranking.scalar.toFixed(2) }}
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-item-label class="text-center">
                        The cumulative score is calculated with the formula: strength ({{ team.ranking.mu.toFixed(2) }}) minus three times unreliability ({{ team.ranking.sigma.toFixed(2) }})
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-card>
        <q-card
            flat
            bordered
            dense>
            <q-item>
                <q-item-section>
                    <q-item-label class="text-center">
                        Events for 2020
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-list>
                <event-short-info v-for="event in team.events.slice().sort((a, b) => (Date.parse(a.start_date) > Date.parse(b.start_date) ? 1 : -1))"
                                  :key="event.key"
                                  :event="event"
                                  @promptlogin="$emit('promptlogin')"/>
            </q-list>
        </q-card>
        <q-card
            flat
            bordered
            dense>
            <q-item>
                <q-item-section>
                    <q-item-label class="text-center">
                        Matches for 2020
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item v-if="team.matches.length === 0">
                <q-item-section>
                    <q-item-label class="text-center">
                        Sorry but this team has no matches yet.
                    </q-item-label>
                </q-item-section>
            </q-item>
            <NewMatch
                @promptlogin="$refs.loginmodal.show()"
                v-for="match in matchesSorted"
                :key="match.key"
                :protagonist="team.team_number"
                :match="match"/>
        </q-card>
        <LogInModal ref="loginmodal"/>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import LogInModal from '../components/LogInModal';
    import NewMatch from '../components/NewMatch';
    import EventShortInfo from '../components/EventShortInfo';

    export default {
        name: 'TeamView',
        components: { EventShortInfo, NewMatch, LogInModal },
        props: ['teamNumber'],
        computed: {
            ...mapGetters(['getTeamAvatars', 'isProbablySignedIn', 'getTeamLikes', 'getShortTeamInfoDict', 'getShortTeamInfo', 'listRankedTeams', 'teamRankingsDict']),
            teamIsLiked() {
                return this.getTeamLikes.includes(this.team.team_number);
            },
            matchesSorted() {
                return this.team.matches.slice().sort((a, b) => (a.predicted_time < b.predicted_time ? 1 : -1));
            },
        },
        methods: {
            ...mapActions(['likeTeam', 'unlikeTeam']),
            load() {
                // eslint-disable-next-line radix
                this.$axios.post('/', { requestType: 'getTeamInfo', teamNumber: parseInt(this.teamNumber) })
                    .then((response) => {
                        console.log(response.data);
                        if ('avatar' in response.data) {
                            this.$store.commit('setTeamAvatar', { team_number: this.teamNumber, avatar: response.data.avatar });
                        }
                        this.team = response.data;
                        this.gotDataYet = true;
                    });
            },
        },
        mounted() {
            this.load();
        },
        watch: {
            teamNumber(old, e) {
                this.gotDataYet = false;
                this.load();
            },
        },
        data() {
            return {
                gotDataYet: false,
                team: {},
            };
        },
    };
</script>

<style scoped>

</style>
