<template>
  <div>
    <!-- Whats New Start -->
    <section class="whats-news-area pt-50 pb-20">
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-12">
            <div class="d-flex justify-content-center">
              <button
                type="button"
                class="bg-primary border-0 py-3 px-5 me-2 rounded"
                style="font-size: 18px"
                @click="loginPage()"
                v-if="!tokenStatus"
              >
                <i class="bx bxs-user"></i> Login
              </button>
              <button
                type="button"
                class="bg-danger border-0 py-3 px-5 mr-2 rounded"
                style="font-size: 18px"
                v-if="tokenStatus"
                @click="logout()"
              >
                <i class="bx bx-log-out"></i> Logout
              </button>
            </div>
          </div>
          <div v-if="tokenStatus" class="text-end">
            <div class="fs-4 mt-3">
              <i class="fa-solid fa-user me-1"></i>
              <strong>User Name - </strong>
              <span>{{ storageUserData.name }}</span>
            </div>
            <div class="fs-4 mt-3">
              <strong># ID - </strong>
              <span>{{ storageUserData.id }}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="row d-flex justify-content-between">
              <div class="col-lg-3 col-md-3">
                <div class="section-tittle mb-30">
                  <h3>Whats New</h3>
                </div>
              </div>
              <div class="col-lg-9 col-md-9">
                <div class="properties__button">
                  <!--Nav Button  -->
                  <nav v-if="tokenStatus">
                    <div class="nav nav-tabs">
                      <a
                        class="nav-item nav-link active"
                        href="#"
                        @click="searchCategory('')"
                        >All</a
                      >
                      <a
                        class="nav-item nav-link"
                        href="#"
                        v-for="(category, index) in categoryList"
                        :key="index"
                        @click="searchCategory(category.category_id)"
                        >{{ category.title }}</a
                      >
                    </div>
                  </nav>
                  <!--End Nav Button  -->
                </div>
              </div>
            </div>
            <div class="row" v-if="!tokenStatus">
              <div
                class="col-lg-8 col-xxl-12 d-flex justify-content-center align-items-center rounded p-5"
                style="height: 70vh; background-color: #dbdcde"
              >
                <h3 class="text-danger">
                  Oops ! You are not allowed to view posts . If you want to view
                  posts , you must login or register .
                </h3>
              </div>
            </div>
            <div v-if="tokenStatus">
              <div
                class="col-xl-4 offset-xl-7 col-lg-8 offset-lg-0 d-flex my-3"
              >
                <input
                  type="text"
                  class="form-control"
                  @keyup.enter="search()"
                  v-model="searchKey"
                />
                <button class="border-0" @click="search()">
                  <i class="fa-solid fa-magnifying-glass text-primary"></i>
                </button>
              </div>
              <!-- card one -->
              <div
                class="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div class="whats-news-caption">
                  <div class="row" v-if="postList.length == 0">
                    <div
                      class="col-12 d-flex justify-content-center align-items-center nav-tabs rounded p-5"
                      style="height: 70vh"
                    >
                      <h3 class="text-danger">There is no data !</h3>
                    </div>
                  </div>
                  <div class="row" v-else>
                    <div
                      class="col-lg-6 col-md-6"
                      v-for="(post, index) in postList"
                      :key="index"
                    >
                      <div
                        class="single-what-news mb-100"
                        @click="newsDetail(post.post_id)"
                      >
                        <div class="what-img">
                          <img v-bind:src="post.image" />
                        </div>
                        <div class="what-cap">
                          <span class="color1">{{ post.category_title }}</span>
                          <h4>
                            <a href="details.html">{{ post.title }}</a>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Whats New End -->
  </div>
</template>

<script src="../js/homePage.js"></script>