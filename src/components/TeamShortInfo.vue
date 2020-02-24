<template>
    <q-item clickable
            v-ripple
            >
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
            </q-item>
        </q-list>
    </q-item>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'TeamShortInfo',
        props: ['team'],
        computed: {
            ...mapGetters(['getTeamAvatars']),
        },
    };
</script>

<style scoped>

</style>
