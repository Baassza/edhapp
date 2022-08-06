<template>
  <div class="row min-vh-100 g-0">
    <div class="
        main
        min-vh-100
        col-12
        d-flex
        justify-content-center
        align-items-center
      ">
      <h3>Edhapp</h3>
      <br />
      <div v-if="isError" class="alert alert-danger" role="alert">
        <ul>
          <li v-for="(error, errorIndex) in errorText" :key="errorIndex">{{ error }}</li>
        </ul>
      </div>
      <button class="
          gray
          d-flex
          gmail-login
          rounded-btn
          justify-content-center
          align-items-center
        ">
        <object data="/img/google-icon.svg" width="20" height="20"></object>&nbsp;&nbsp;Continue with google
      </button>
      <br />
      <p class="gray">or Sign in with email</p>
      <div class="login-form">
        <div class="form-group login-form-group">
          <label class="gray">Email</label>
          <input type="email" class="gray form-control" v-model="$v.email.$model" />
        </div>
        <div class="form-group login-form-group">
          <label class="gray">Password</label>
          <div class="d-flex">
            <input :type="passwordType" class="gray form-control" v-model="$v.password.$model" />
            <button type="button" class="d-flex hide-password justify-content-end" @click="togglePassword">
              <font-awesome-icon :icon="iconEye" />
            </button>
          </div>
        </div>
        <div>
          <div class="d-flex justify-content-between">
            <a href="#" class="gray">Forgot password?</a>
          </div>
        </div>
        <br />
        <button class="login-btn rounded-btn">Login</button>
        <br /><br />
        <nuxt-link to="/register" class="gray" id="register-link">
          Create an account
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "loginPage",
  data() {
    return {
      isError: false,
      email: "",
      password: "",
      iconEye: ["fa", "eye"],
      passwordType: "password",
      errorText: [],
      isLogout: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  fetch() { },
  methods: {
    formVailddate() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.isError = true;
        this.errorText = [];
        if (this.$v.email.$invalid) {
          if (this.email === "") {
            this.errorText.push("Email is required.");
          } else {
            this.errorText.push("Email is invalid.");
          }
        }
        if (this.$v.password.$invalid) {
          this.errorText.push("Password is required.");
        }
      } else {
        this.errorText = [];
        this.isError = false;
      }
    },
    async login() {
      this.formVailddate();

    },
    togglePassword() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
      this.iconEye =
        this.iconEye[1] === "eye" ? ["fa", "eye-slash"] : ["fa", "eye"];
    },
    async GmailLogin() {

    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.login-form-group {
  margin-bottom: 20px;
}

.main {
  flex-direction: column;
}

.login-form {
  width: 20%;
}

.hide-password {
  border: 0;
  background-color: transparent;
  position: absolute;
  height: 40px;
  align-items: center;
  justify-content: end;
  z-index: 2;
  margin-left: 18%;
}

.gmail-login {
  width: 20%;
  border: 0;
  text-decoration: none;
}

.login-btn {
  width: 100%;
  border: 0;
  background-color: black;
  color: white;
}

.rounded-btn {
  border-radius: 10px;
  height: 35px;
}

.gray {
  color: #919191;
}

.main {
  flex-direction: column;
}

i {
  font-size: 20 px;
}

@media (max-width: 575.98px) {
  .gmail-login {
    width: 70%;
  }

  .login-form {
    width: 70%;
  }

  .hide-password {
    margin-left: 62%;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .gmail-login {
    width: 50%;
  }

  .login-form {
    width: 50%;
  }

  .hide-password {
    margin-left: 45%;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .gmail-login {
    width: 40%;
  }

  .login-form {
    width: 40%;
  }

  .hide-password {
    margin-left: 35%;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .gmail-login {
    width: 35%;
  }

  .login-form {
    width: 35%;
  }

  .hide-password {
    margin-left: 31%;
  }
}

@media (min-width: 1200px) and (max-width: 1399.98px) {
  .gmail-login {
    width: 25%;
  }

  .login-form {
    width: 25%;
  }

  .hide-password {
    margin-left: 22%;
  }
}

@media (min-width: 1400px) {
  .gmail-login {
    width: 20%;
  }

  .login-form {
    width: 20%;
  }

  .hide-password {
    margin-left: 18%;
  }
}
</style>
