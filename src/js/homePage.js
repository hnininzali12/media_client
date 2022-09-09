import axios, { Axios } from "axios";
import { mapGetters } from "vuex";
export default {
    name: "HomeViewPage",
    data() {
        return {
            postList: {},
            categoryList: {},
            searchKey: '',
            tokenStatus: false,
        }
    },
    computed: {
        ...mapGetters(['storageToken', 'storageUserData']),
    },
    methods: {
        getPost() {
            axios.get('http://localhost:8000/api/allPostList').then((response) => {
                let postData = response.data.post;
                for (let i = 0; i < postData.length; i++) {
                    if (postData[i].image != null) {
                        postData[i].image = 'http://localhost:8000/postImage/' + postData[i].image;
                    } else {
                        postData[i].image = 'http://localhost:8000/defaultImage/default.jpg';
                    }
                }
                this.postList = postData;
            });
        },
        getCategory() {
            axios.get('http://localhost:8000/api/allCategoryList').then((response) => {
                this.categoryList = response.data.category;
            }).catch((e) => { console.log(e); })
        },
        searchCategory(searchKey) {
            let search = {
                key: searchKey,
            }
            axios.post('http://localhost:8000/api/category/search', search).then((response) => {
                let postData = response.data.result;
                for (let i = 0; i < postData.length; i++) {
                    if (postData[i].image != null) {
                        postData[i].image = 'http://localhost:8000/postImage/' + postData[i].image;
                    } else {
                        postData[i].image = 'http://localhost:8000/defaultImage/default.jpg';
                    }
                }
                this.postList = postData;
            })
        },
        search() {
            let search = {
                key: this.searchKey,
            }
            axios.post('http://localhost:8000/api/post/search', search).then((response) => {
                let postData = response.data.searchData;
                for (let i = 0; i < postData.length; i++) {
                    if (postData[i].image != null) {
                        postData[i].image = 'http://localhost:8000/postImage/' + postData[i].image;
                    } else {
                        postData[i].image = 'http://localhost:8000/defaultImage/default.jpg';
                    }
                }
                this.postList = postData;
            })
        },
        newsDetail(id) {
            this.$router.push({
                name: 'newsDetail',
                query: {
                    newsId: id,
                }
            })
        },
        loginPage() {
            this.$router.push({
                name: 'loginPage',
            })
        },
        checkToken() {
            if (this.storageToken == null || this.storageToken == '') {
                this.tokenStatus = false;
            } else {
                this.tokenStatus = true;
            }
        },
        logout() {
            this.$store.dispatch("setToken", null);
            this.$router.push({
                name: 'loginPage',
            })
        }
    },
    mounted() {
        this.getPost();
        this.getCategory();
        this.checkToken();
    },
};