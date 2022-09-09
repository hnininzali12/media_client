<template>
  <div>
    <div class="container">
      <div class="row" style="height: 100vh">
        <div
          class="col-12 my-3 d-flex justify-content-center align-items-center py-5 px-5 rounded"
          style="background-color: #f9f9f9"
        >
          <div class="col-lg-8">
            <div class="text-center">
              <i
                class="fa-solid fa-circle-user text-black"
                style="font-size: 40px"
              ></i>
              <legend class="my-3">Register</legend>
            </div>
            <form @submit.prevent="signUp">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your username..."
                  v-model="userData.name"
                />
                <span
                  class="text-danger"
                  v-if="userData.name == '' ? !requiredStatus : requiredStatus"
                  >Please fill your user name!</span
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter your email..."
                  v-model="userData.email"
                  for="email"
                  required
                />
                <span
                  class="text-danger"
                  v-if="userData.email == '' ? !requiredStatus : requiredStatus"
                  >Please fill your email!</span
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="userData.password"
                />
                <span
                  class="text-danger"
                  v-if="
                    userData.password == '' ? !requiredStatus : requiredStatus
                  "
                  >Please fill your password!</span
                >
                <span class="text-danger" v-if="lengthPassword"
                  >Password must be at least 8 characters !</span
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirm Password"
                  v-model="userData.confirm_password"
                />
                <span
                  class="text-danger"
                  v-if="
                    userData.confirm_password == ''
                      ? !requiredStatus
                      : requiredStatus
                  "
                  >Please fill your confirm password!</span
                >
                <span class="text-danger" v-if="diffPassword"
                  >Confirm password does not match !</span
                >
              </div>
              <div class="text-right mb-4">
                <button
                  class="bg-danger border-0 py-2 px-5 mr-2 rounded mb-3"
                  type="submit"
                >
                  SIGN UP
                </button>
              </div>
              <div class="text-center">
                <span>Already have an account ?</span>
                <a
                  class="text-primary"
                  style="cursor: pointer"
                  href="/loginPage"
                  >Sign in here !</a
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/registerPage.js"></script>