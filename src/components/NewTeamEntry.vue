<template>
  <q-item :active="active"
          active-class="active-team-link"
          :to="`/team/${data.team}`"
          exact>
    <q-item-section avatar>
      <q-avatar square :color="alliance">
        <img :src="getAvatar(data.team)">
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ data.team }}
        <span v-if="`currentRank` in data">
          ({{ data.currentRank }})
        </span>
        <span v-else>
        {{
          data.newRank !== data.oldRank ?
            `(${data.newRank} from ${data.oldRank})` :
            `(${data.newRank})`
        }}
        </span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
    export default {
        name: 'NewTeamEntry',
        props: ['active', 'team_number', 'alliance'],
    };
</script>

<style scoped>

</style>
