<template>
    <q-item>
        <q-list dense>
            <q-item>
                <q-item-section avatar>
                    <q-avatar color="white" text-color="gray" font-size="0.9rem" v-if="event.week">
                        W{{ event.week }}
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ event.short_name }}</q-item-label>
                    <q-item-label caption v-if="event.district">
                        {{ event.district.display_name }}
                    </q-item-label>
                </q-item-section>
                <q-item-section>
                    <q-item-label caption v-if="event.likes >= 2">
                        Favorited by {{ event.likes }} people.
                    </q-item-label>
                    <q-item-label caption v-if="event.likes === 1">
                        Favorited by a single person.
                    </q-item-label>
                    <q-item-label caption v-if="event.likes === 0">
                        Not favorited by anyone yet.
                    </q-item-label>
                </q-item-section>
                <q-item-section>
                    <div class="q-pa-md q-gutter-sm">
                        <q-btn v-if="eventIsLiked"
                               round
                               icon="favorite"
                               size="xs"
                               @click="unlikeEvent({ eventCode: event.eventCode })"
                               color="primary"/>
                        <q-btn v-if="!eventIsLiked"
                               round
                               outline
                               icon="favorite"
                               @click="likeEvent({ eventCode: event.eventCode })"
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
        props: ['event'],
        methods: {
            ...mapActions(['likeEvent', 'unlikeEvent']),
        },
        computed: {
            ...mapGetters(['getEventLikes']),
            eventIsLiked() {
                return this.getEventLikes.includes(this.event.eventCode);
            },
        },
    };
</script>

<style scoped>

</style>
