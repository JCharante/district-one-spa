<template>
    <div class="column col-xs-12 col-sm-6 q-pa-lg items-center" style="width: 480px; max-width: 100%; margin: auto; margin-top: 0;">
        <q-pagination
            v-model="curPage"
            :max="Math.ceil(getShortTeamInfo.length / 10)"
            :input="true"
        />
        <q-list bordered separator style="">
            <q-item-label header>Teams ranked by favorites</q-item-label>
            <TeamShortInfo
                v-for="team in filteredListOfTeams"
                :key="team.team_number"
                :team="team"
            />
        </q-list>
        <q-pagination
            v-model="curPage"
            :max="Math.ceil(getShortTeamInfo.length / 10)"
            :input="true"
        />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import TeamShortInfo from './TeamShortInfo';

    export default {
        name: 'AllTeamsView',
        components: { TeamShortInfo },
        computed: {
            ...mapGetters(['getShortTeamInfo', 'getTeamAvatars']),
            filteredListOfTeams() {
                const self = this;
                const teamsSortedByLikes = this.getShortTeamInfo.slice().sort((a, b) => ((a.likes > b.likes) ? -1 : 1));
                const ret = teamsSortedByLikes.slice(10 * (this.curPage - 1), 10 * this.curPage);
                this.$store.dispatch('getTeamAvatars', {
                    list_of_team_number: ret.filter((v) => { return !(v.team_number in self.getTeamAvatars); }).map((v) => { return v.team_number; }),
                });
                return ret;
            },
        },
        data() {
            return {
                curPage: 1,
            };
        },
    };
</script>

<style scoped>

</style>
