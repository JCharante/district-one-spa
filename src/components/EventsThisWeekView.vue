<template>
    <div class="column col-xs-12 col-sm-6 q-pa-lg items-center" style="width: 450px; max-width: 100%; margin: auto; margin-top: 0;">
        <q-pagination
            v-model="curPage"
            :max="Math.ceil(getShortEventInfoThisWeek.length / 10)"
            :input="true"
        />
        <q-list bordered separator style="">
            <q-item-label header>This Week's Hot Events</q-item-label>
            <EventShortInfo
                v-for="event in filteredListOfEvents"
                :key="event.eventCode"
                :event="event"
                @promptlogin="$emit('promptlogin')"
            />
        </q-list>
        <q-pagination
            v-model="curPage"
            :max="Math.ceil(getShortEventInfoThisWeek.length / 10)"
            :input="true"
        />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import EventShortInfo from './EventShortInfo';

    export default {
        name: 'EventsThisWeekView',
        components: { EventShortInfo },
        computed: {
            ...mapGetters(['getShortEventInfo', 'getShortEventInfoThisWeek']),
            filteredListOfEvents() {
                const self = this;
                const eventsSortedByLikes = this.getShortEventInfoThisWeek.slice().sort((a, b) => ((a.likes > b.likes) ? -1 : 1));
                const ret = eventsSortedByLikes.slice(10 * (this.curPage - 1), 10 * this.curPage);
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
