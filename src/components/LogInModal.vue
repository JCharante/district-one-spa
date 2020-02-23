<template>
    <q-dialog v-model="vmodel">
        <q-card>
            <q-card-section>
                <div class="text-p">Hi, in order to prevent abuse, District One Stats (DOS) uses one-time passwords for account management. <b>We don't ask for an email, a username, nor a password.</b> That means you don't need to remember yet another password, and also means that you don't have to give up identifiable information. Whenever you want to log in, a 6-digit code will be sent to your phone number.</div>
            </q-card-section>
            <q-card-section>
                <div class="text-p">Anyone signing up must be over the age of 13. If someone is found in violation of this, they will be promptly banned and have their phone number blacklisted from the site.</div>
            </q-card-section>
            <q-card-section>
                <template v-if="!enterCodeMode">
                    <VueTelInput ref="telInput" v-model="tel" :preferredCountries="['US', 'CA', 'VN', 'AU', 'CN', 'TH', 'GB']"/>
                    <div class="col-12 row justify-center" style="margin-top: 30px;">
                        <q-btn label="Send Verification Code"
                               :color="tel.length < 10 ? 'black' : 'primary' "
                               :disable="tel.length < 10"
                               @click="requestCode"
                        />
                    </div>
                </template>
                <template v-else>
                    <div class="col-12 row justify-center">
                        <q-input v-model="code"
                                 :max="6"
                                 mask="######"
                                 label="Verification Code"
                                 fill-mask="#"/>
                        <q-btn label="submit"
                               :color="code.includes('#') ? 'black' : 'primary' "
                               :disable="code.includes('#')"
                               @click="checkCode"
                        />
                    </div>
                    <div class="col-12" style="margin-top: 20px;">
                        <p class="text-center">We sent a code to +{{ dialCode }} {{ tel }}.</p>
                    </div>
                    <div class="col-12">
                        <p class="text-center"><span class="fake-link" @click="changeNumber">Wrong number?</span> | <span class="fake-link" @click="resendCode">Resend code</span></p>
                    </div>
                </template>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
    import { VueTelInput } from 'vue-tel-input';

    export default {
        name: 'LogInModal',
        components: { VueTelInput },
        data() {
            return {
                vmodel: false,
                tel: '',
                dialCode: 0,
                enterCodeMode: false,
                code: '',
            };
        },
        methods: {
            show() {
                this.vmodel = true;
            },
            changeNumber() {
                this.enterCodeMode = false;
            },
            requestCode() {
                this.dialCode = this.$refs.telInput.activeCountry.dialCode;
                this.enterCodeMode = true;
                this.sendVerificationRequest();
            },
            resendCode() {
                this.sendVerificationRequest();
            },
            sendVerificationRequest() {
                this.$axios.post('/', { requestType: 'sendSMS', dialCode: this.dialCode, phoneNumber: this.tel })
                    .then((response) => {
                        console.log(response);
                    });
            },
            checkCode() {
                this.$axios.post('/', {
                    requestType: 'checkCode',
                    dialCode: this.dialCode,
                    phoneNumber: this.tel,
                    code: this.code,
                }).then((response) => {
                    this.$store.dispatch('setSessionKey', response.data);
                    console.log(response);
                });
            },
        },
    };
</script>

<style lang="stylus" scoped>
    .fake-link {
        color: $primary;
        text-decoration:underline;
    }
    .fake-link:hover {
        text-decoration: none;
        cursor: pointer;
    }
</style>
