<template>
    <q-item>
        <q-list dense>
            <q-item>
                <q-item-section avatar v-if="false">
                    <q-avatar color="white" text-color="gray" font-size="0.9rem">
                        #1
                    </q-avatar>
                </q-item-section>
                <q-item-section avatar>
                    <q-avatar square color="blue" v-if="team.team_number in getTeamAvatars">
                        <img :src="getTeamAvatars[team.team_number]">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>FRC {{ team.team_number }} - {{ team.nickname }}</q-item-label>
                    <q-item-label caption v-if="team.likes >= 2">
                        Liked by {{ team.likes }} people.
                    </q-item-label>
                    <q-item-label caption v-if="team.likes === 1">
                        Liked by a single person.
                    </q-item-label>
                </q-item-section>
                <q-item-section>
                    <div class="q-pa-md q-gutter-sm">
                        <q-btn v-if="teamIsLiked"
                               round
                               icon="favorite"
                               size="xs"
                               @click="unlikeTeam({ teamNumber: team.team_number })"
                               color="primary"/>
                        <q-btn v-if="!teamIsLiked"
                               round
                               outline
                               icon="favorite"
                               @click="likeTeam({ teamNumber: team.team_number })"
                               size="xs"
                               color="primary"/>
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
    </q-item>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'TeamShortInfo',
        props: ['team'],
        methods: {
            ...mapActions(['likeTeam', 'unlikeTeam']),
        },
        computed: {
            ...mapGetters(['getTeamAvatars', 'getTeamLikes']),
            teamIsLiked() {
                return this.getTeamLikes.includes(this.team.team_number);
            },
        },
    };
</script>

<style scoped>

</style>
