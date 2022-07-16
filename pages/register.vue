<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <NuxtLink to="/login" class="brand-logo gray">
          <font-awesome-icon :icon="['fa', 'arrow-left']" />
          Back page
        </NuxtLink>
      </div>
    </nav>
    <div class="main col g-0 d-flex align-items-center justify-content-center">
      <div class="register-form">
        <div v-if="isError">
          <div class="alert alert-danger" role="alert">
            <ul>
              <li v-for="(error,errorIndex) in errorText" :key="errorIndex">{{ error }}</li>
            </ul>
          </div>
        </div>
        <h3 class="gray">Create Account</h3>
        <div class="form-group login-form-group">
          <label class="gray">Name</label>
          <input type="text" class="gray form-control" v-model="$v.name.$model" />
        </div>
        <div class="form-group login-form-group">
          <label class="gray">Lastname</label>
          <input type="text" class="gray form-control" v-model="$v.lastname.$model" />
        </div>
        <div class="form-group login-form-group">
          <label class="gray">Email</label>
          <input type="email" class="gray form-control" v-model="$v.email.$model" />
        </div>
        <div class="form-group login-form-group">
          <label class="gray">Password</label>
          <div class="d-flex">
            <input :type="password.password.type" v-model="$v.passwordValue.$model" class="gray form-control" />
            <button type="button" @click="passhide('password')" class="d-flex hide-password justify-content-end">
              <font-awesome-icon :icon="password.password.iconEye" />
            </button>
          </div>
        </div>
        <div class="form-group login-form-group">
          <label class="gray">Re-Password</label>
          <div class="d-flex">
            <input :type="password.rePassword.type" class="gray form-control" v-model="$v.rePasswordValue.$model" />
            <button type="button" @click="passhide('rePassword')" class="d-flex hide-password justify-content-end">
              <font-awesome-icon :icon="password.rePassword.iconEye" />
            </button>
          </div>
        </div>
        <button class="register-btn" @click="register">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import "~/plugins/firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "registerPage",
  data() {
    return {
      isError: false,
      email: "",
      passwordValue: "",
      rePasswordValue: "",
      name: "",
      lastname: "",
      password: {
        password: {
          iconEye: ["fa", "eye"],
          type: "password",
        },
        rePassword: {
          iconEye: ["fa", "eye"],
          type: "password",
        },
      },
      errorText: [],
      isError: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    passwordValue: {
      required,
      minLength: (val) => val && val.length >= 6,
    },
    rePasswordValue: {
      required,
      minLength: (val) => val && val.length >= 6,
    },
    name: {
      required,
    },
    lastname: {
      required,
    },
  },
  fetch() { },
  methods: {
    passhide(pos) {
      if (this.password[pos].type === "password") {
        this.password[pos].type = "text";
        this.password[pos].iconEye = ["fa", "eye-slash"];
      } else {
        this.password[pos].type = "password";
        this.password[pos].iconEye = ["fa", "eye"];
      }
    },
    formVailddate() {
      this.$v.$touch();
      if (this.$v.$invalid || this.passwordValue !== this.rePasswordValue) {
        this.isError = true;
        this.errorText = [];
        let f = [
          "name",
          "lastname",
          "email",
          "passwordValue",
          "rePasswordValue",
        ];
        f.forEach((item) => {
          if (this.$v[item].$invalid) {
            if (this[item] === "") {
              if (item !== "passwordValue" && item !== "rePasswordValue") {
                this.errorText.push(`${item} is required`);
              }
              if (item === "passwordValue") {
                this.errorText.push(
                  `password is required and must be at least 6 characters`
                );
              }
              if (item === "rePasswordValue") {
                this.errorText.push(
                  `re-password is required and must be at least 6 characters`
                );
              }
            }
            if (this[item] !== "" && item === "email") {
              this.errorText.push(`email is not valid`);
            }
            if (item === "passwordValue" && this.passwordValue !== "") {
              this.errorText.push(
                `password is required and must be at least 6 characters`
              );
            }
            if (item === "rePasswordValue" && this.rePasswordValue !== "") {
              this.errorText.push(
                `re-password is required and must be at least 6 characters`
              );
            }
            if (
              this.passwordValue !== this.rePasswordValue &&
              this.passwordValue !== "" &&
              this.rePasswordValue !== "" &&
              this.errorText.indexOf(
                "password and re-password must be same"
              ) === -1
            ) {
              this.errorText.push(`password and re-password must be same`);
            }
          }
        });
      } else {
        this.isError = false;
        this.errorText = [];
      }
    },
    async register() {
      this.formVailddate();
      if (!this.isError) {
        this.isError = false;
        this.errorText = [];
        try {
          const auth = getAuth();
          await createUserWithEmailAndPassword(
            auth,
            this.email,
            this.passwordValue
          ).catch((err) => {
            this.isError = true;
            this.errorText.push(err);
          });
          await sendEmailVerification(auth.currentUser).catch((err) => {
            this.isError = true;
            this.errorText.push(err);
          });
          await updateProfile(auth.currentUser, {
            displayName: `${this.name} ${this.lastname}`,
          }).catch((err) => {
            this.isError = true;
            this.errorText.push(err);
          });
          this.$swal("Success", "Please check your email to verify", "success");
          this.$router.push("/login");
        } catch (e) {
          this.isError = true;
          this.errorText = [e.code || e];
        }
      }
    },
  },
};
</script>


<style>
.register-btn {
  width: 100%;
  border: 0;
  background-color: black;
  color: white;
  border-radius: 10px;
  height: 35px;
}

.register-form {
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
  margin-left: 28%;
}

.nav-wrapper {
  margin: 30px;
}

.gray {
  color: #919191;
}

.main {
  flex-direction: column;
}

.form-control {
  margin-bottom: 20px;
}

@media (max-width: 575.98px) {
  .register-form {
    width: 70%;
  }

  .hide-password {
    margin-left: 62%;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .register-form {
    width: 50%;
  }

  .hide-password {
    margin-left: 45%;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .register-form {
    width: 40%;
  }

  .hide-password {
    margin-left: 35%;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .register-form {
    width: 35%;
  }

  .hide-password {
    margin-left: 31%;
  }
}

@media (min-width: 1200px) and (max-width: 1399.98px) {
  .register-form {
    width: 25%;
  }

  .hide-password {
    margin-left: 22%;
  }
}

@media (min-width: 1400px) {
  .register-form {
    width: 20%;
  }

  .hide-password {
    margin-left: 18%;
  }
}
</style>