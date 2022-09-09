<template>
  <div>
    <div>
      <!-- About US Start -->
      <div class="about-area">
        <div class="container">
          <div class="row my-3">
            <div class="col-lg-8">
              <div class="d-flex justify-content-end">
                <button
                  class="bg-danger border-0 py-3 px-5 mr-2 rounded"
                  style="font-size: 18px"
                  v-if="tokenStatus"
                  @click="logout()"
                >
                  <i class="bx bx-log-out"></i> Logout
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8 mt-5">
              <div class="mb-5 d-flex justify-content-between">
                <h3>What's news</h3>
                <button
                  type="submit"
                  class="button button-contactForm boxed-btn py-2 px-5"
                  @click="back()"
                >
                  <i class="bx bx-arrow-back"></i> Back
                </button>
              </div>
              <!-- Trending Tittle -->
              <div class="about-right mb-90" v-if="tokenStatus">
                <div class="about-img">
                  <img v-bind:src="postList.image" alt="" />
                </div>
                <div class="section-tittle mb-30 pt-30">
                  <h3>{{ postList.title }}</h3>
                  <span class="py-4 fs-5">{{
                    getDate(postList.created_at)
                  }}</span>
                </div>
                <div class="about-prea">
                  <p class="about-pera1 mb-25">
                    {{ postList.description }}
                  </p>
                </div>
                <div class="d-flex">
                  <span style="font-size: 20px" class="me-3">
                    <i class="fa-solid fa-eye"></i>
                    <span>{{ views }}</span>
                  </span>
                  <span
                    style="font-size: 20px; cursor: pointer"
                    @click="like()"
                  >
                    <span class="text-danger">
                      <i class="fa-regular fa-thumbs-up"></i>
                      <span> Likes</span>
                      <span> {{ likeCount }}</span>
                    </span>
                    <span v-if="isliked" class="text-primary ms-3">
                      <i class="fa-regular fa-thumbs-up"></i>
                      <span>You liked</span></span
                    >
                  </span>
                </div>
                <div class="mt-5">
                  <div class="row" v-if="!isEdited">
                    <div class="col-12">
                      <div class="row">
                        <div class="form-group col-10">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Write your comment..."
                            v-model="comment"
                            @keyup.enter="sendCom()"
                          />
                        </div>
                        <button
                          type="button"
                          class="border-0 bg-danger rounded col-2"
                          style="padding: 5px 15px; height: 50px"
                          @click="sendCom()"
                        >
                          Send <i class="bx bx-send"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2" v-if="isEdited">
                    <div class="col-12">
                      <div class="row">
                        <div class="text-danger col-7">
                          Please edit your comment!
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col-7">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Edit your comment..."
                            v-model="updateComment"
                            @keyup.enter="updateCom()"
                          />
                        </div>
                        <button
                          type="button"
                          class="border-0 bg-secondary rounded col-2 mt-2 me-1"
                          style="
                            height: 30px;
                            font-size: 15px;
                            text-align: center;
                          "
                          @click="isEdited = false"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="border-0 bg-primary rounded col-2 mt-2"
                          style="
                            height: 30px;
                            font-size: 15px;
                            text-align: center;
                          "
                          @click="updateCom()"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <h4>Comments( {{ commentCount }} )</h4>
                  </div>
                  <div
                    class="alert alert-success alert-dismissible fade show"
                    role="alert"
                    v-if="isPosted"
                  >
                    <strong>Posted!</strong>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div
                    class="alert alert-success alert-dismissible fade show"
                    role="alert"
                    v-if="isUpdated"
                  >
                    <strong>Your comment is updated !</strong>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div
                    class="alert alert-danger alert-dismissible fade show"
                    role="alert"
                    v-if="isDeleted"
                  >
                    <strong>Your comment is deleted !</strong>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                  <ul v-for="(comment, index) in commentList" :key="index">
                    <li class="mb-3">
                      <div class="row">
                        <div class="col-12">
                          <div
                            class="card py-3 px-4"
                            style="
                              background-color: #f0f0f0;
                              border: none;
                              border-radius: 10px;
                            "
                          >
                            <div class="mb-1 d-flex justify-content-between">
                              <strong>{{ comment.name }}</strong>
                              <div
                                class="edit"
                                v-if="comment.user_id == storageUserData.id"
                              >
                                <i
                                  class="fa fa-edit me-2 text-primary"
                                  @click="edit(comment.reaction_id)"
                                ></i>
                                <i
                                  class="fa fa-trash-alt text-danger"
                                  @click="deleteCom(comment.reaction_id)"
                                ></i>
                              </div>
                            </div>
                            <div class="mb-2">
                              <span
                                style="font-size: 15px"
                                class="text-muted"
                                >{{ getDate(comment.created_at) }}</span
                              >
                            </div>
                            <div>
                              {{ comment.comment }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="social-share pt-30">
                  <div class="section-tittle">
                    <h3 class="mr-20">Share:</h3>
                    <ul>
                      <li>
                        <a href="#"
                          ><img src="assets/img/news/icon-ins.png" alt=""
                        /></a>
                      </li>
                      <li>
                        <a href="#"
                          ><img src="assets/img/news/icon-fb.png" alt=""
                        /></a>
                      </li>
                      <li>
                        <a href="#"
                          ><img src="assets/img/news/icon-tw.png" alt=""
                        /></a>
                      </li>
                      <li>
                        <a href="#"
                          ><img src="assets/img/news/icon-yo.png" alt=""
                        /></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <!-- Section Tittle -->
              <div class="section-tittle mb-40">
                <h3>Follow Us</h3>
              </div>
              <!-- Flow Socail -->
              <div class="single-follow mb-45">
                <div class="single-box">
                  <div class="follow-us d-flex align-items-center">
                    <div class="follow-social">
                      <a href="#"
                        ><img src="assets/img/news/icon-fb.png" alt=""
                      /></a>
                    </div>
                    <div class="follow-count">
                      <span>8,045</span>
                      <p>Fans</p>
                    </div>
                  </div>
                  <div class="follow-us d-flex align-items-center">
                    <div class="follow-social">
                      <a href="#"
                        ><img src="assets/img/news/icon-tw.png" alt=""
                      /></a>
                    </div>
                    <div class="follow-count">
                      <span>8,045</span>
                      <p>Fans</p>
                    </div>
                  </div>
                  <div class="follow-us d-flex align-items-center">
                    <div class="follow-social">
                      <a href="#"
                        ><img src="assets/img/news/icon-ins.png" alt=""
                      /></a>
                    </div>
                    <div class="follow-count">
                      <span>8,045</span>
                      <p>Fans</p>
                    </div>
                  </div>
                  <div class="follow-us d-flex align-items-center">
                    <div class="follow-social">
                      <a href="#"
                        ><img src="assets/img/news/icon-yo.png" alt=""
                      /></a>
                    </div>
                    <div class="follow-count">
                      <span>8,045</span>
                      <p>Fans</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- New Poster -->
              <div class="news-poster d-none d-lg-block">
                <img src="assets/img/news/news_card.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- About US End -->
    </div>
  </div>
</template>

<script src="../js/detailPage.js"></script>