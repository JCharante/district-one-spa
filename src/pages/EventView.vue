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
        <div class="row justify-around q-pa-lg">
            <div class="col-12 text-center">
                <h5>Featuring:</h5>
            </div>
            <TeamAsCard
                @promptlogin="$refs.loginmodal.show()"
                v-for="teamNumber in event.team_numbers.map((v) => { return getShortTeamInfoDict[v] }).sort((a, b) => { return a.likes < b.likes ? 1 : -1 }).map((v) => { return v.team_number })"
                :key="teamNumber"
                :team-number="teamNumber"/>
        </div>
        <LogInModal ref="loginmodal"/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import TeamAsCard from '../components/TeamAsCard';
    import LogInModal from '../components/LogInModal';

    export default {
        name: 'EventView',
        components: { LogInModal, TeamAsCard },
        props: ['eventcode'],
        computed: {
            ...mapGetters(['getShortTeamInfoDict']),
        },
        mounted() {
            this.$axios.post('/', { requestType: 'getEventInfo', eventCode: this.eventcode })
                .then((response) => {
                    console.log(response.data);
                    this.gotDataYet = true;
                    this.event = response.data;
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
