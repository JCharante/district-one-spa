<template>
  <q-page class="flex justify-center">
    <div class="column" style="margin-top: 50px;">
      <div class="row" style="max-width: 600px;">
        <p>Welcome! This is the continuation of frc.gg, a site which focused on ranking teams by performance with a matchmaking algorithm. In this iteration you can do the following:</p>
        <ul>
          <li>(In progress) See top ranked teams by performance over the 2020 season.</li>
          <li>(In progress) See top-voted teams</li>
          <li>(In progress) Upvote events</li>
          <li>(In progress) See strong upcoming events</li>
          <li>(In progress) Make predictions on event winners</li>
          <li>(In progress) See match predictions</li>
        </ul>
        <p>This is all just for fun, please don't take anything too seriously. If you really want Dark Mode or another feature contact me on Chief Delphi: JCharante or email dos@jcharante.com.</p>
      </div>
      <div class="row justify-around">
        <q-btn color="black" outline label="Dismiss"/>
        <q-btn color="primary" label="Create Account" @click="$refs.loginmodal.show()"/>
      </div>
    </div>
    <LogInModal ref="loginmodal"/>
  </q-page>
</template>

<script>
    import LogInModal from '../components/LogInModal';

    export default {
        name: 'PageIndex',
        components: { LogInModal },
    };
</script>
