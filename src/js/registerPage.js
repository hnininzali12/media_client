import axios from "axios";
export default {
    name: "RegisterPage",
    data() {
        return {
            userData: {
                name: '',
                email: '',
                password: '',
                confirm_password: '',
            },
            diffPassword: false,
            lengthPassword: false,
            requiredStatus: false,
            tokenStatus: false,
        }
    },
    methods: {
        loginPage() {
            this.$router.push({
                name: "loginPage",
            });
        },
        signUp() {
            if (this.userData.name != '' &&
                this.userData.email != '' &&
                this.userData.password != '' &&
                this.userData.confirm_password != '') {
                if (this.userData.password == this.userData.confirm_password) {
                    if (this.userData.password.length >= 8) {
                        let user = this.userData;
                        axios.post('http://localhost:8000/api/user/register', user).then((response) => {
                            if (response.data.token == null) {
                                this.tokenStatus = false;
                            } else {
                                this.$store.dispatch("setToken", response.data.token);
                                this.$store.dispatch("setUserData", response.data.user);
                                this.tokenStatus = true;
                                this.$router.push({
                                    name: 'home',
                                })
                            }
                        })
                    } else {
                        this.lengthPassword = true;
                    }
                } else {
                    this.diffPassword = true;
                }
            } else {
                this.requiredStatus = false;
            }
        }
    },
};