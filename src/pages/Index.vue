<template>
  <q-page class="flex justify-center">
    <div class="column items-center" style="margin-top: 50px;">
      <div class="row" style="max-width: 70%;" v-if="!getHideAnnouncement">
        <p>Welcome! This is the continuation of frc.gg, a site which focused on ranking teams by performance with a matchmaking algorithm. In this iteration you can do the following:</p>
        <ul>
          <li>Vote for your favorite teams and events</li>
          <li>(In progress) See top ranked teams by performance over the 2020 season.</li>
          <li>(In progress) Make predictions on event winners!</li>
          <li>(In progress) See match predictions</li>
        </ul>
        <p>This is all just for fun, please don't take anything too seriously. If you really want Dark Mode or another feature contact me on Chief Delphi: JCharante or email dos@jcharante.com.</p>
      </div>
      <div class="row justify-around"  v-if="!getHideAnnouncement" style="width: 300px">
        <q-btn color="black" outline label="Dismiss" @click="setHideAnnouncement(true)"/>
        <q-btn v-if="!isProbablySignedIn" color="primary" label="Create Account" @click="$refs.loginmodal.show()"/>
      </div>
      <div class="row">
          <AllTeamsView @promptlogin="$refs.loginmodal.show()"/>
          <AllEventsView @promptlogin="$refs.loginmodal.show()"/>
      </div>
    </div>
    <LogInModal ref="loginmodal"/>
  </q-page>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import LogInModal from '../components/LogInModal';
    import AllTeamsView from '../components/AllTeamsView';
    import AllEventsView from '../components/AllEventsView';

    export default {
        name: 'PageIndex',
        components: { AllEventsView, AllTeamsView, LogInModal },
        computed: {
            ...mapGetters(['isProbablySignedIn', 'getHideAnnouncement']),
        },
        methods: {
            ...mapActions(['setHideAnnouncement']),
        },
    };
</script>
