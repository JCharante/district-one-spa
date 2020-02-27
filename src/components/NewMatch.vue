<template>
    <q-item>
        <q-item-section avatar v-if="this.protagonist !== undefined">
            <q-avatar color="purple"
                      text-color="white"
                      v-if="match.actual_time === null">
                {{ matchOutcome === 'Tie' ? 'T' : (matchOutcome === 'Victory' ? 'W' : 'L') }}
            </q-avatar>
            <q-avatar v-else
                      :color="matchOutcome === 'Tie'
                        ? 'grey'
                        : (
                            matchOutcome === 'Victory'
                            ? 'blue'
                            : 'red')"
                      text-color="white">
                {{ matchOutcome === 'Tie' ? 'T' : (matchOutcome === 'Victory' ? 'W' : 'L') }}
            </q-avatar>
        </q-item-section>
        <q-item-section>
            <q-item>
                <q-item-section>
                    <q-item-label><router-link :to="`/event${match.event_key}`">{{ getShortEventInfoDict[match.event_key].name }}</router-link> - {{ match.comp_level }}{{ match.set_number}}m{{ match.match_number}}
                        (<a :href="'https://www.thebluealliance.com/match/' + match.key"
                            target="_blank">view on TBA</a>)
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section v-if="$q.screen.gt.xs">
                    <q-list>
                        <q-item>
                            <q-item-section>
                                <q-item-label>
                                    <b v-if="match.actual_time != null">
                                        {{ match.winning_alliance === 'red' ? 'Victory' : 'Defeat' }}</b>
                                    <b v-else>Predicting..</b>
                                    (Red Alliance)
                                    (<b>{{ (sumPreRankingsRed / sumPreRankings).toLocaleString("en", {style: "percent"})}}</b>)
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                        <TeamAsCard
                            @promptlogin="$emit('promptlogin')"
                            :team-number="parseInt(match.alliances.red.team_keys[0].replace('frc', ''))"/>
                        <TeamAsCard
                            @promptlogin="$emit('promptlogin')"
                            :team-number="parseInt(match.alliances.red.team_keys[1].replace('frc', ''))"/>
                        <TeamAsCard
                            @promptlogin="$emit('promptlogin')"
                            :team-number="parseInt(match.alliances.red.team_keys[2].replace('frc', ''))"/>
                    </q-list>
                </q-item-section>
                <q-item-section v-if="$q.screen.gt.xs">
                    <q-list>
                        <q-item>
                            <q-item-section>
                                <q-item-label>
                                    <b v-if="match.actual_time != null">
                                        {{ match.winning_alliance === 'blue' ? 'Victory' : 'Defeat' }}</b>
                                    <b v-else>Predicting..</b>
                                    (Blue Alliance)
                                    (<b>{{ (sumPreRankingsBlue / sumPreRankings).toLocaleString("en", {style: "percent"})}}</b>)
                                </q-item-label>
                            </q-item-section>
                        </q-item>

                        <TeamAsCard
                            @promptlogin="$emit('promptlogin')"
                            :team-number="parseInt(match.alliances.blue.team_keys[0].replace('frc', ''))"/>
                        <TeamAsCard
                            @promptlogin="$emit('promptlogin')"
                            :team-number="parseInt(match.alliances.blue.team_keys[1].replace('frc', ''))"/>
                        <TeamAsCard
                            @promptlogin="$emit('promptlogin')"
                            :team-number="parseInt(match.alliances.blue.team_keys[2].replace('frc', ''))"/>
                    </q-list>
                </q-item-section>
                <q-item-section v-if="!$q.screen.gt.xs">
                    <q-list>
                        <q-item>
                            <q-item-section>
                                <q-item-label>
                                    <b v-if="match.actual_time != null">
                                        {{ match.winning_alliance === 'red' ? 'Victory' : 'Defeat' }}</b>
                                    <b v-else>Predicting..</b>
                                    (Red Alliance)
                                    (<b>{{ (sumPreRankingsRed / sumPreRankings).toLocaleString("en", {style: "percent"})}}</b>)
                                </q-item-label>
                            </q-item-section>
                        </q-item>

                        <TeamAsCard
                            @promptlogin="$emit('promptlogin')"
                            :team-number="parseInt(match.alliances.red.team_keys[0].replace('frc', ''))"/>
                        <TeamAsCard
                            @promptlogin="$emit('promptlogin')"
                            :team-number="parseInt(match.alliances.red.team_keys[1].replace('frc', ''))"/>
                        <TeamAsCard
                            @promptlogin="$emit('promptlogin')"
                            :team-number="parseInt(match.alliances.red.team_keys[2].replace('frc', ''))"/>
                    </q-list>

                    <q-list>
                        <q-item>
                            <q-item-section>
                                <q-item-label>
                                    <b v-if="match.actual_time != null">
                                        {{ match.winning_alliance === 'blue' ? 'Victory' : 'Defeat' }}</b>
                                    <b v-else>Predicting..</b>
                                    (Blue Alliance)
                                    (<b>{{ (sumPreRankingsBlue / sumPreRankings).toLocaleString("en", {style: "percent"})}}</b>)
                                </q-item-label>
                            </q-item-section>
                        </q-item>

                        <TeamAsCard
                            @promptlogin="$emit('promptlogin')"
                            :team-number="parseInt(match.alliances.blue.team_keys[0].replace('frc', ''))"/>
                        <TeamAsCard
                            @promptlogin="$emit('promptlogin')"
                            :team-number="parseInt(match.alliances.blue.team_keys[1].replace('frc', ''))"/>
                        <TeamAsCard
                            @promptlogin="$emit('promptlogin')"
                            :team-number="parseInt(match.alliances.blue.team_keys[2].replace('frc', ''))"/>
                    </q-list>
                </q-item-section>
            </q-item>
        </q-item-section>
    </q-item>
</template>

<script>
    import { mapGetters } from 'vuex';
    import NewTeamEntry from './NewTeamEntry';
    import TeamAsCard from './TeamAsCard';

    export default {
        name: 'NewMatch',
        // eslint-disable-next-line vue/no-unused-components
        components: { TeamAsCard, NewTeamEntry },
        props: ['match', 'protagonist'],
        computed: {
            ...mapGetters(['getShortEventInfoDict', 'getShortTeamInfoDict']),
            sumPreRankingsRed() {
                const self = this;
                if (this.match.actual_time !== null && 'matchRankings' in self.match) {
                    return this.match.alliances.red.team_keys.map((k) => {
                        const { mu, sigma } = self.match.matchRankings.preRankings[k];
                        return mu - 3 * sigma;
                    }).reduce((a, b) => a + b);
                } else {
                    return this.match.alliances.red.team_keys.map((k) => {
                        // eslint-disable-next-line radix
                        if ('ranking' in self.getShortTeamInfoDict[parseInt(k.replace('frc', ''))]) {
                            // eslint-disable-next-line radix
                            return self.getShortTeamInfoDict[parseInt(k.replace('frc', ''))].ranking.scalar;
                        } else {
                            return 0;
                        }
                    }).reduce((a, b) => a + b);
                }
            },
            sumPreRankingsBlue() {
                const self = this;
                if (this.match.actual_time !== null && 'matchRankings' in self.match) {
                    return this.match.alliances.blue.team_keys.map((k) => {
                        const { mu, sigma } = self.match.matchRankings.preRankings[k];
                        return mu - 3 * sigma;
                    }).reduce((a, b) => a + b);
                } else {
                    return this.match.alliances.blue.team_keys.map((k) => {
                        // eslint-disable-next-line radix
                        if ('ranking' in self.getShortTeamInfoDict[parseInt(k.replace('frc', ''))]) {
                            // eslint-disable-next-line radix
                            return self.getShortTeamInfoDict[parseInt(k.replace('frc', ''))].ranking.scalar;
                        } else {
                            return 0;
                        }
                    }).reduce((a, b) => a + b);
                }
            },
            sumPreRankings() {
                return this.sumPreRankingsRed + this.sumPreRankingsBlue;
            },
            matchOutcome() {
                if (this.protagonist === undefined) return 'Tie';
                let protagonistTeam = null;
                if (this.match.alliances.red.team_keys.includes(`frc${this.protagonist}`)) {
                    protagonistTeam = 'red';
                }
                if (this.match.alliances.blue.team_keys.includes(`frc${this.protagonist}`)) {
                    protagonistTeam = 'blue';
                }
                if (this.match.actual_time !== null) {
                    if (this.match.winning_alliance === '') {
                        return 'Tie';
                    }
                    if (this.match.winning_alliance === protagonistTeam) {
                        return 'Victory';
                    }
                    return 'Defeat';
                } else if (protagonistTeam === 'red') {
                    return this.sumPreRankingsRed > this.sumPreRankingsBlue ? 'Victory' : 'Defeat';
                } else {
                    return this.sumPreRankingsRed > this.sumPreRankingsBlue ? 'Defeat' : 'Victory';
                }
                // Match is in the future, must predict
                /*
                if (this.data.red_win_probability > this.data.blue_win_probability) {
                    return protagonistTeam === 'red' ? 'Victory' : 'Defeat';
                }
                if (this.data.blue_win_probability > this.data.red_win_probability) {
                    return protagonistTeam === 'blue' ? 'Victory' : 'Defeat';
                }
                */
            },
        },
    };
/*
import avatars from '../assets/avatars.json';
import extra from '../assets/extra.json';
import NewTeamEntry from './NewTeamEntry.vue';

export default {
  name: 'NewMatch',
  components: {
    NewTeamEntry,
  },
  props: ['data', 'protagonist'],
  computed: {
    matchOutcome() {
      let protagonistTeam = null;
      if (this.data.red0.team === this.protagonist
       || this.data.red1.team === this.protagonist
       || this.data.red2.team === this.protagonist) {
        protagonistTeam = 'red';
      }
      if (this.data.blue0.team === this.protagonist
       || this.data.blue1.team === this.protagonist
       || this.data.blue2.team === this.protagonist) {
        protagonistTeam = 'blue';
      }
      if (this.data.status === 'completed') {
        if (this.data.winner === '') {
          return 'Tie';
        }
        if (this.data.winner === protagonistTeam) {
          return 'Victory';
        }
        return 'Defeat';
      }
      // Match is in the future, must predict
      if (this.data.red_win_probability > this.data.blue_win_probability) {
        return protagonistTeam === 'red' ? 'Victory' : 'Defeat';
      }
      if (this.data.blue_win_probability > this.data.red_win_probability) {
        return protagonistTeam === 'blue' ? 'Victory' : 'Defeat';
      }
      return 'Tie';
    },
    protagonistWon() {
      let protagonistOnRed = false;
      protagonistOnRed = this.protagonist === this.data.red0.team ? true : protagonistOnRed;
      protagonistOnRed = this.protagonist === this.data.red1.team ? true : protagonistOnRed;
      protagonistOnRed = this.protagonist === this.data.red2.team ? true : protagonistOnRed;
      return (protagonistOnRed && this.data.winner === 'red')
              || (!protagonistOnRed && this.data.winner === 'blue');
    },
    eventName() {
      if (this.data.event_code in extra.eventNicknames) {
        return extra.eventNicknames[this.data.event_code];
      }
      return this.data.event_code;
    },
    matchName() {
      return this.data.key.split('_')[1];
    },
    isScheduledMatch() {
      return this.data.status === 'scheduled';
    },
  },
  methods: {
    hasAvatar(team) {
      return team in avatars;
    },
    getAvatar(team) {
      return avatars[team];
    },
  },
};
*/
</script>

<style scoped lang="stylus">
 .active-team-link
    color white
    background gray
</style>
