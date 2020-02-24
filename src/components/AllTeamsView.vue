<template>
    <div class="column" style="width: 100%">
        <div class="q-pa-lg flex flex-center">
            <q-list bordered separator>
                <TeamShortInfo
                    v-for="team in filteredListOfTeams"
                    :key="team.team_number"
                    :team="team"
                    />
            </q-list>
        </div>
        <div class="q-pa-lg flex flex-center">
            <q-pagination
                v-model="curPage"
                :max="Math.ceil(getShortTeamInfo.length / 100)"
                :input="true"
            />
        </div>
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
                const ret = teamsSortedByLikes.slice(50 * (this.curPage - 1), 50 * this.curPage);
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
