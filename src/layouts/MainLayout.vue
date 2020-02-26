<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          District One Stats (DOS)
        </q-toolbar-title>

        <div>Jyan</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">Essential Links</q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
          <q-item clickable tag="a" v-if="isProbablySignedIn" @click="userLogout">
              <q-item-section avatar>
                  <q-icon name="exit_to_app"/>
              </q-item-section>

              <q-item-section>
                  <q-item-label>Log out</q-item-label>
              </q-item-section>
          </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
    import EssentialLink from 'components/EssentialLink';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'MainLayout',

        components: {
            EssentialLink,
        },
        mounted() {
            this.$store.dispatch('checkIfSessionKeyValid');
            this.$store.dispatch('refreshShortTeamInfo');
            this.$store.dispatch('refreshShortEventInfo');
        },
        computed: {
            ...mapGetters(['isProbablySignedIn']),
        },
        methods: {
            ...mapActions(['userLogout']),
        },
        data() {
            return {
                leftDrawerOpen: false,
                miniState: true,
                essentialLinks: [
                    {
                        title: 'Chief Delphi Thread',
                        icon: 'forum',
                        link: 'https://www.chiefdelphi.com/t/frc-gg/356118',
                    },
                    {
                        title: 'Author\'s Github',
                        caption: 'github.com/JCharante',
                        icon: 'code',
                        link: 'https://github.com/JCharante',
                    },
                    {
                        title: 'Last Year\'s frc.gg',
                        icon: 'public',
                        link: 'https://s3.amazonaws.com/frc.gg.jcharante.com/index.html#/home/1',
                    },
                ],
            };
        },
    };
</script>
