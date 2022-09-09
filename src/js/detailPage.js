import axios from "axios";
import { mapGetters } from "vuex";
import moment from "moment/moment";
export default {
    name: "DetailPage",
    data() {
        return {
            postList: {},
            commentList: {},
            likeReactList: {},
            reactionId: {},
            comReactId: {},
            tokenStatus: false,
            isliked: false,
            isPosted: false,
            isEdited: false,
            isUpdated: false,
            isDeleted: false,
            views: 0,
            postId: 0,
            likeCount: 0,
            commentCount: 0,
            commentId: 0,
            comment: '',
            updateComment: '',
        }
    },
    computed: {
        ...mapGetters(['storageToken', 'storageUserData'])
    },
    methods: {
        loadPost(id) {
            let post = {
                postId: id,
            }
            axios.post("http://localhost:8000/api/post/details", post).then((response) => {
                let postData = response.data.post;
                if (postData.image != null) {
                    postData.image = 'http://localhost:8000/postImage/' + postData.image;
                } else {
                    postData.image = 'http://localhost:8000/defaultImage/default.jpg';
                }
                this.postList = postData;
            });
        },
        back() {
            history.back();
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
        },
        actionLogs() {
            let views = {
                user_id: this.storageUserData.id,
                post_id: this.$route.query.newsId,
            }
            axios.post("http://localhost:8000/api/actionLogs", views).then((response) => {
                this.views = response.data.post.length;
            });
        },
        like() {
            this.isliked = !this.isliked;
            if (this.isliked == true) {
                let reaction = {
                    user_id: this.storageUserData.id,
                    post_id: this.$route.query.newsId,
                }
                axios.post("http://localhost:8000/api/reaction", reaction).then((response) => {
                    this.likeReactList = response.data.post.filter((l) => l.comment == '');
                    for (let i = 0; i < this.likeReactList.length; i++) {
                        if (this.likeReactList[i].user_id == this.storageUserData.id) {
                            this.isliked = true;
                        }
                    }
                    this.likeCount = this.likeReactList.length;
                });
            } else if (this.isliked == false) {
                for (let i = 0; i < this.likeReactList.length; i++) {
                    this.reactionId = this.likeReactList[i].reaction_id;
                }
                let reaction = {
                    user_id: this.storageUserData.id,
                    post_id: this.$route.query.newsId,
                    reaction_id: this.reactionId,
                }
                axios.post("http://localhost:8000/api/reaction/delete", reaction).then((response) => {
                    this.likeReactList = response.data.post.filter((l) => l.comment == '');
                    this.likeCount = this.likeReactList.length;
                });
            }
        },
        reactionCount() {
            let reaction = {
                user_id: this.storageUserData.id,
                post_id: this.$route.query.newsId,
            }
            axios.post("http://localhost:8000/api/reaction/count", reaction).then((response) => {
                this.likeReactList = response.data.post.filter((l) => l.comment == '');
                for (let i = 0; i < this.likeReactList.length; i++) {
                    if (this.likeReactList[i].user_id == this.storageUserData.id) {
                        this.isliked = true;
                    }
                }

                this.likeCount = this.likeReactList.length;
            });

        },
        sendCom() {
            let comment = {
                user_id: this.storageUserData.id,
                post_id: this.$route.query.newsId,
                comment: this.comment,
            }
            axios.post("http://localhost:8000/api/comment", comment).then((response) => {
                this.filterComment(response);
            });
            if (this.comment != "") {
                this.isPosted = true;
            }
            this.comment = "";
        },
        getCom() {
            let comment = {
                user_id: this.storageUserData.id,
                post_id: this.$route.query.newsId,
            }
            axios.post("http://localhost:8000/api/get/comment", comment).then((response) => {
                this.filterComment(response);
            });
        },
        deleteCom(id) {
            let comment = {
                reaction_id: id,
                user_id: this.storageUserData.id,
                post_id: this.$route.query.newsId,
            }
            axios.post("http://localhost:8000/api/delete/comment", comment).then((response) => {
                this.filterComment(response);
            });
            this.isDeleted = true;
        },
        edit(id) {
            this.isEdited = true;
            let comment = this.commentList.filter((c) => c.reaction_id == id);
            this.updateComment = comment[0].comment;
            this.commentId = id;
        },
        updateCom() {
            let updateComment = {
                reaction_id: this.commentId,
                comment: this.updateComment,
                post_id: this.$route.query.newsId,
                user_id: this.storageUserData.id,
            }
            axios.post("http://localhost:8000/api/update/comment", updateComment).then((response) => {
                this.filterComment(response);
            });
            this.isEdited = false;
            this.isUpdated = true;
        },
        filterComment(response) {
            this.commentList = response.data.comment;
            this.commentList = this.commentList.filter((c) => !c.comment == "");
            this.commentCount = this.commentList.length;
        },
        getDate(date) {
            return moment(date).format('MMM D YYYY, h:mm a')
        },
    },
    mounted() {
        this.postId = this.$route.query.newsId;
        this.getCom();
        this.reactionCount();
        this.loadPost(this.postId);
        this.checkToken();
        this.actionLogs();
    },
};