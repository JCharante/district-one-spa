<template>
    <q-card
        flat
        bordered
        dense
        style="margin-bottom: 20px;">
        <q-item>
            <q-item-section avatar v-if="teamNumber in getTeamAvatars">
                <q-avatar>
                    <img :src="getTeamAvatars[teamNumber]">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <q-item-label>
                    <span class="fake-link" @click="$router.push(`/team/${teamNumber}`)">{{ getShortTeamInfoDict[teamNumber].nickname }}</span>
                </q-item-label>
                <q-item-label caption>
                    FRC {{ teamNumber }}
                </q-item-label>

                <q-item-label v-if="Object.keys(teamRankingsDict).includes(`${teamNumber}`)">
                    Rank #{{ teamRankingsDict[teamNumber]}}, Score: {{ getShortTeamInfoDict[teamNumber].ranking.scalar.toFixed(2) }}
                </q-item-label>
            </q-item-section>
        </q-item>
        <q-card-actions>
            <q-btn flat
                   round
                   color="red"
                   icon="favorite"
                   v-if="teamIsLiked"
                   @click="isProbablySignedIn ? unlikeTeam({ teamNumber }) : $emit('promptlogin')"/>
            <q-btn round
                   icon="favorite"
                   v-if="!teamIsLiked"
                   flat
                   color="black"
                   @click="isProbablySignedIn ? likeTeam({ teamNumber }) : $emit('promptlogin')"/>
            <span flat color="primary">
                {{ getShortTeamInfoDict[teamNumber].likes }}
            </span>
        </q-card-actions>
    </q-card>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'TeamAsCard',
        props: ['teamNumber'],
        methods: {
            ...mapActions(['likeTeam', 'unlikeTeam']),
        },
        computed: {
            ...mapGetters(['getShortTeamInfoDict', 'getTeamAvatars', 'isProbablySignedIn', 'getTeamLikes', 'teamRankingsDict']),
            teamIsLiked() {
                return this.getTeamLikes.includes(this.teamNumber);
            },
        },
    };
</script>

<style scoped>

</style>
