<template>
    <div class="column col-xs-10 items-center" style="margin: auto;">
        <q-pagination
            v-model="curPage"
            :max="Math.ceil(eligibleTeams.length / 15)"
            :input="true"
        />
        <q-btn-toggle v-model="showBy" :options="[{label: 'Show best teams', value: 'Sort by Ranked'}, {label: 'Show most favorited', value: 'Sort by favorites'}]" @input="curPage = 1"/>
        <q-list bordered style="">
            <q-item-label header v-if="showBy === 'Sort by Ranked'">Teams ranked by match history</q-item-label>
            <q-item-label header v-if="showBy === 'Sort by favorites'">Most favorite teams</q-item-label>
            <template v-for="team in filteredListOfTeams" >
                <q-item :key="'desktop' + team.team_number" dense>
                    <q-item-section avatar>
                        <q-item-label v-if="listRankedTeams.includes(team)">#{{ listRankedTeams.indexOf(team) + 1 }}</q-item-label>
                        <q-item-label v-else>?</q-item-label>
                        <q-item-label caption>Rank</q-item-label>
                    </q-item-section>
                    <q-item-section avatar v-if="$q.screen.gt.xs">
                        <q-item-label>{{ team.likes }}</q-item-label>
                        <q-item-label caption>likes</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-btn v-if="getTeamLikes.includes(team.team_number)"
                               round
                               icon="favorite"
                               size="xs"
                               @click="isProbablySignedIn ? unlikeTeam({ teamNumber: team.team_number }) : $emit('promptlogin')"
                               color="primary"/>
                        <q-btn v-if="!getTeamLikes.includes(team.team_number)"
                               round
                               outline
                               icon="favorite"
                               @click="isProbablySignedIn ? likeTeam({ teamNumber: team.team_number }) : $emit('promptlogin')"
                               size="xs"
                               color="primary"/>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-avatar square color="blue" v-if="team.team_number in getTeamAvatars">
                            <img :src="getTeamAvatars[team.team_number]">
                        </q-avatar>
                    </q-item-section>
                    <q-item-section><router-link :to="`/team/${team.team_number}`" exact>FRC {{ team.team_number }} - {{ team.nickname }}</router-link></q-item-section>
                    <q-item-section v-if="$q.screen.gt.xs">
                        <q-item-label v-if="listRankedTeams.includes(team)">{{ team.ranking.scalar.toFixed(2) }}</q-item-label>
                        <q-item-label v-else>Unranked</q-item-label>
                        <q-item-label caption>Combined</q-item-label>
                    </q-item-section>
                    <q-item-section v-if="$q.screen.gt.xs">
                        <q-item-label v-if="listRankedTeams.includes(team)">{{ team.ranking.mu.toFixed(2) }}</q-item-label>
                        <q-item-label v-else>Unranked</q-item-label>
                        <q-item-label caption>Strength</q-item-label>
                    </q-item-section>
                    <q-item-section v-if="$q.screen.gt.xs">
                        <q-item-label v-if="listRankedTeams.includes(team)">{{ team.ranking.sigma.toFixed(2) }}</q-item-label>
                        <q-item-label v-else>Unranked</q-item-label>
                        <q-item-label caption>Unreliability</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item :key="'mobile' + team.team_number" v-if="!$q.screen.gt.xs">
                    <q-item-section avatar>
                        <q-item-label>{{ team.likes }}</q-item-label>
                        <q-item-label caption>likes</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label v-if="listRankedTeams.includes(team)">{{ team.ranking.scalar.toFixed(2) }}</q-item-label>
                        <q-item-label v-else>Unranked</q-item-label>
                        <q-item-label caption>Combined</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label v-if="listRankedTeams.includes(team)">{{ team.ranking.mu.toFixed(2) }}</q-item-label>
                        <q-item-label v-else>Unranked</q-item-label>
                        <q-item-label caption>Strength</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label v-if="listRankedTeams.includes(team)">{{ team.ranking.sigma.toFixed(2) }}</q-item-label>
                        <q-item-label v-else>Unranked</q-item-label>
                        <q-item-label caption>Unreliability</q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator v-if="$q.screen.gt.xs" :key="'sepa' + team.team_number"/>
                <q-separator v-if="!$q.screen.gt.xs" :key="'sep' + team.team_number" style="margin-top: 5px; margin-bottom: 5px;"/>
            </template>
        </q-list>
        <q-pagination
            v-model="curPage"
            :max="Math.ceil(eligibleTeams.length / 15)"
            :input="true"
        />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'RankedTeamsViewAsFlatList',
        components: { },
        methods: {
            ...mapActions(['likeTeam', 'unlikeTeam']),
        },
        computed: {
            ...mapGetters(['listRankedTeams', 'getShortTeamInfo', 'getTeamAvatars', 'getTeamLikes', 'isProbablySignedIn']),
            filteredListOfTeams() {
                const self = this;
                const ret = this.eligibleTeams.slice(15 * (this.curPage - 1), 15 * this.curPage);
                this.$store.dispatch('getTeamAvatars', {
                    list_of_team_number: ret.filter((v) => { return !(v.team_number in self.getTeamAvatars); }).map((v) => { return v.team_number; }),
                });
                return ret;
            },
            eligibleTeams() {
                return this.showBy === 'Sort by Ranked' ? this.listRankedTeams : this.getShortTeamInfo.slice().sort((a, b) => ((a.likes > b.likes) ? -1 : 1));
            },
        },
        data() {
            return {
                curPage: 1,
                showBy: 'Sort by Ranked',
            };
        },
    };
</script>

<style scoped>

</style>
