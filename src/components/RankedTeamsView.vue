<template>
    <div class="column col-xs-12 col-sm-6 q-pa-lg items-center" style="width: 400px; max-width: 100%; margin: auto; margin-top: 0;">
        <q-pagination
            v-model="curPage"
            :max="Math.ceil(listRankedTeams.length / 10)"
            :input="true"
        />
        <q-list bordered separator style="">
            <q-item-label header>Teams ranked by match history</q-item-label>
            <q-list dense>
                <q-item>
                    <q-item-section>
                        <q-item-label></q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label caption>Sum</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label caption>Strength</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label caption>Confidence</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
            <TeamShortInfo
                v-for="team in filteredListOfTeams"
                :key="team.team_number"
                :team="team"
                @promptlogin="$emit('promptlogin')"
            />
        </q-list>
        <q-pagination
            v-model="curPage"
            :max="Math.ceil(listRankedTeams.length / 10)"
            :input="true"
        />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import TeamShortInfo from './TeamShortInfo';

    export default {
        name: 'RankedTeamsView',
        components: { TeamShortInfo },
        computed: {
            ...mapGetters(['listRankedTeams', 'getShortTeamInfo', 'getTeamAvatars']),
            filteredListOfTeams() {
                const self = this;
                const ret = this.listRankedTeams.slice(10 * (this.curPage - 1), 10 * this.curPage);
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
