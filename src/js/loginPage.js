import axios from "axios";
import { mapGetters } from "vuex";
export default {
    name: "LoginPage",
    data() {
        return {
            userData: {
                email: "",
                password: "",
            },
            tokenStatus: false,
            userStatus: false,
            errors: {
                requiredEmail: false,
                requiredPsw: false,
            },
        }
    },
    computed: {
        ...mapGetters(['storageUserData', 'storageToken'])
    },
    methods: {
        registerPage() {
            this.$router.push({
                name: 'registerPage',
            })
        },
        home() {
            this.$router.push({
                name: 'homePage',
            })
        },
        accountLogin() {
            axios.post('http://localhost:8000/api/user/login', this.userData).then((response) => {
                if (response.data.token == null && response.data.user == null) {
                    this.tokenStatus = false;
                    this.userStatus = true;
                } else {
                    this.$store.dispatch("setToken", response.data.token);
                    this.$store.dispatch("setUserData", response.data.user);
                    this.tokenStatus = true;
                    this.$router.push({
                        name: 'home',
                    })
                }
                if (!this.userData.email) {
                    this.errors.requiredEmail = true
                }
                if (!this.userData.password) {
                    this.errors.requiredPsw = true
                }
            })
        },
    },

};