<template>
    <div v-if="!gotDataYet">
        <p>Loading data for {{ eventcode }}</p>
    </div>
    <div v-else>
        <div class="row justify-around q-pa-lg">
            <div class="col-12 text-center">
                <h5>{{ event.name }}</h5>
            </div>
        </div>
        <div class="row" v-if="getShortTeamInfo.length > 0">
            <RankedTeamsViewAsFlatList @promptlogin="$refs.loginmodal.show()" :whitelist="event.team_numbers"/>
        </div>
        <div>
            <div class="col-12 text-center">
                <h5>Matches:</h5>
            </div>
            <q-virtual-scroll style="max-height: 1080px;"
                              :items="matchesSorted"
                              separator>
                <template v-slot="{ item, index }">
                    <match-list-item :key="index" :match="item"/>
                    <q-separator :key="'a' + index" style="margin-top: 5px; margin-bottom: 5px"/>
                    <!--<NewMatch
                        @promptlogin="$refs.loginmodal.show()"
                        :key="index"
                        :match="item"/>-->
                </template>
            </q-virtual-scroll>
        </div>
        <LogInModal ref="loginmodal"/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import RankedTeamsViewAsFlatList from 'components/RankedTeamsViewAsFlatList';
    import MatchListItem from 'components/MatchListItem';
    import TeamAsCard from '../components/TeamAsCard';
    import LogInModal from '../components/LogInModal';
    import NewMatch from '../components/NewMatch';

    export default {
        name: 'EventView',
        components: { MatchListItem, RankedTeamsViewAsFlatList, LogInModal },
        props: ['eventcode'],
        computed: {
            ...mapGetters(['getShortTeamInfoDict', 'getShortTeamInfo']),
            matchesSorted() {
                return this.event.matches.slice().sort((a, b) => (a.predicted_time < b.predicted_time ? 1 : -1));
            },
        },
        mounted() {
            this.$axios.post('/', { requestType: 'getEventInfo', eventCode: this.eventcode })
                .then((response) => {
                    console.log(response.data);
                    this.gotDataYet = true;
                    this.event = response.data;
                    this.$store.dispatch('getTeamAvatars', { list_of_team_number: response.data.team_numbers });
                });
        },
        data() {
            return {
                gotDataYet: false,
                event: {},
            };
        },
    };
</script>

<style scoped>

</style>
