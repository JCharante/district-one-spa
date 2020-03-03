<template>
    <q-item dense>
        <q-item-section>
            <q-item-label caption>
                <router-link :to="`/event/${match.event_key}`">{{ getShortEventInfoDict[match.event_key].name }}</router-link>
            </q-item-label>
            <q-item-label>
                {{ match.comp_level }}{{ match.set_number}}m{{ match.match_number}} <a :href="tbaLink" exact>(TBA)</a>
            </q-item-label>
        </q-item-section>
    </q-item>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'MatchListItem',
        props: ['match'],
        computed: {
            ...mapGetters(['getShortEventInfoDict', 'getShortTeamInfoDict']),
            tbaLink() {
                let ret = 'https://www.thebluealliance.com/match/' + this.match.event_key + '_' + this.match.comp_level;
                if (["qf", "sf", "f"].includes(this.match.comp_level)) {
                    ret += this.match.set_number + 'm';
                }
                ret += this.match.match_number;
                return ret;
            },
        },
    };
</script>

<style scoped>

</style>
