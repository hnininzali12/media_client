<template>
  <div>
    <div class="container">
      <div class="col-lg-12">
        <div class="d-flex justify-content-center mt-3">
          <button
            class="bg-danger border-0 py-3 px-5 me-2 rounded"
            style="font-size: 18px"
            @click="home()"
          >
            <i class="fa fa-home"></i> Home
          </button>
          <button
            class="bg-danger border-0 py-3 px-5 me-2 rounded"
            style="font-size: 18px"
          >
            <i class="bx bx-log-out"></i> Logout
          </button>
        </div>
      </div>
      <div class="row" style="height: 100vh">
        <div
          class="col-12 my-3 d-flex justify-content-center align-items-center py-5 px-5 rounded"
          style="background-color: #f9f9f9"
        >
          <div class="col-lg-8">
            <div class="alert alert-danger text-center" v-if="userStatus">
              <strong class="">Credentail do not match !</strong>
            </div>
            <div class="text-center">
              <i
                class="fa-solid fa-circle-user text-black"
                style="font-size: 40px"
              ></i>
              <legend class="my-3">LOGIN</legend>
            </div>
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                v-model="userData.email"
                name="email"
              />
              <p class="text-danger" v-if="errors.requiredEmail">
                Please fill your email !
              </p>
            </div>
            <div class="mb-3">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                v-model="userData.password"
              />
              <p class="text-danger" v-if="errors.requiredPsw">
                Please fill your password !
              </p>
            </div>
            <div class="text-right mb-4">
              <button
                type="button"
                class="bg-primary border-0 py-2 px-5 mr-2 rounded mb-3"
                @click="accountLogin"
              >
                LOGIN
              </button>
            </div>
            <div class="text-center">
              <span>Not Registered ?</span>
              <a href="/registerPage" class="text-primary">Create an account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/loginPage.js"></script>