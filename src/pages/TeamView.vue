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
                       @click="isProbablySignedIn ? unlikeTeam({ teamNumber: team.team_number }) : $emit('promptlogin')"/>
                <q-btn round
                       icon="favorite"
                       v-if="!teamIsLiked"
                       flat
                       color="black"
                       @click="isProbablySignedIn ? likeTeam({ teamNumber: team.team_number }) : $emit('promptlogin')"/>
                <span flat color="primary">
                {{ getShortTeamInfoDict[team.team_number].likes }} people have favorited
            </span>
            </q-card-actions>
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
            <q-item>
                <q-item-section v-if="team.matchesArray.length === 0">
                    <q-item-label class="text-center">
                        Sorry but this team has no matches yet.
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-card>
        <LogInModal ref="loginmodal"/>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import LogInModal from '../components/LogInModal';

    export default {
        name: 'TeamView',
        components: { LogInModal },
        props: ['teamNumber'],
        computed: {
            ...mapGetters(['getTeamAvatars', 'isProbablySignedIn', 'getTeamLikes', 'getShortTeamInfoDict', 'getShortTeamInfo']),
            teamIsLiked() {
                return this.getTeamLikes.includes(this.team.team_number);
            },
        },
        methods: {
            ...mapActions(['likeTeam', 'unlikeTeam']),
        },
        mounted() {
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
