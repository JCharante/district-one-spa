<template>
    <q-item>
        <q-list dense>
            <q-item>
                <q-item-section avatar>
                    <q-avatar square color="blue" v-if="team.team_number in getTeamAvatars">
                        <img :src="getTeamAvatars[team.team_number]">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>
                        <span class="fake-link">FRC {{ team.team_number }} - {{ team.nickname }}</span>
                    </q-item-label>
                    <q-item-label caption v-if="team.likes >= 2">
                        Favorited by {{ team.likes }} people.
                    </q-item-label>
                    <q-item-label caption v-if="team.likes === 1">
                        Favorited by a single person.
                    </q-item-label>
                </q-item-section>
                <q-item-section>
                    <div class="q-pa-md q-gutter-sm">
                        <q-btn v-if="teamIsLiked"
                               round
                               icon="favorite"
                               size="xs"
                               @click="isProbablySignedIn ? unlikeTeam({ teamNumber: team.team_number }) : $emit('promptlogin')"
                               color="primary"/>
                        <q-btn v-if="!teamIsLiked"
                               round
                               outline
                               icon="favorite"
                               @click="isProbablySignedIn ? likeTeam({ teamNumber: team.team_number }) : $emit('promptlogin')"
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
            ...mapGetters(['getTeamAvatars', 'getTeamLikes', 'isProbablySignedIn']),
            teamIsLiked() {
                return this.getTeamLikes.includes(this.team.team_number);
            },
        },
    };
</script>

<style scoped lang="stylus">

</style>
