<template>
    <q-item>
        <q-list dense>
            <q-item>
                <q-item-section avatar>
                    <q-avatar color="white" text-color="gray" font-size="0.9rem" v-if="event.week !== null">
                        <span class="">W{{ event.week }}</span>
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>
                        <router-link exact :to="`/event/${event.eventCode || event.key}`">
                            {{ event.short_name }}
                        </router-link>
                    </q-item-label>
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
                               @click="isProbablySignedIn ? unlikeEvent({ eventCode: event.eventCode }) : $emit('promptlogin')"
                               color="primary"/>
                        <q-btn v-if="!eventIsLiked"
                               round
                               outline
                               icon="favorite"
                               @click="isProbablySignedIn ? likeEvent({ eventCode: event.eventCode }) : $emit('promptlogin')"
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
        name: 'EventShortInfo',
        props: ['event'],
        methods: {
            ...mapActions(['likeEvent', 'unlikeEvent']),
        },
        computed: {
            ...mapGetters(['getEventLikes', 'isProbablySignedIn']),
            eventIsLiked() {
                return this.getEventLikes.includes(this.event.eventCode);
            },
        },
    };
</script>

<style scoped lang="stylus">
    .fake-link {
        color: $primary;
        text-decoration:underline;
    }
    .fake-link:hover {
        text-decoration: none;
        cursor: pointer;
    }
</style>
