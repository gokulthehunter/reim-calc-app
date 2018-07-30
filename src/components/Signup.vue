<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout justify-center align-center>
              <!-- <v-flex xs12 text-xs-center sm6 offset-sm-3>
              </v-flex>
              <v-spacer></v-spacer> -->
              <v-flex xs12 text-xs-center sm6 offset-sm-3>
                  <app-alert @dismissed="onDismissed" v-if="error" :text="error.message"></app-alert>
                  <v-card>
                    <v-card-text>
                      <v-container>
                        <v-form ref="form" v-model="valid" lazy-validation action="javascript:void(0)">

                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field 
                              name="email" 
                              id="email" 
                              label="Email ID" 
                              v-model="email" 
                              :rules="emailRules" 
                              required 
                              type="email"></v-text-field>
                            </v-flex>
                          </v-layout>

                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field 
                              type="password" 
                              name="password" 
                              id="password" 
                              v-model="password" 
                              :rules="passwordRules" 
                              required 
                              label="password"></v-text-field>
                            </v-flex>
                          </v-layout>

                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field 
                              type="password" 
                              name="confirmPassword" 
                              id="confirmPassword" 
                              v-model="confirmPassword"
                              label="Confirm Password" 
                              :rules="comparePasswords" 
                              required 
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                          
                          <v-layout row>
                            <v-flex xs12>
                              <v-btn 
                              large 
                              color="primary" 
                              type="submit" 
                              :disabled="loading" 
                              @click="onSignup"

                              :loading="loading"
                              >Sign Up</v-btn>
                              <!-- <v-btn large color="primary" @click="clear">Sign Up</v-btn> -->
                            </v-flex>
                          </v-layout>
                        </v-form>
                      </v-container>
                    </v-card-text>
                  </v-card>
              </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>
<script>
export default {
  data(){
    return{
      valid: true,
      email:'',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password:'',
      passwordRules: [
        v => !!v || 'Please enter your Password',
        v => (v && v.length >= 2) || 'Password must be greater than 6 characters'
      ],
      confirmPassword:'',
      comparePasswords:[
        v => !!v || 'please confirm password',
        v => (v && this.confirmPassword == this.password) || 'Password mismatch'
      ]
    }
  },
  computed:{
    user(){
      return this.$store.getters.user
    },
    error(){
      return this.$store.getters.error
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  watch:{
    user(value){
      if (value !== null && value !==undefined) {
        this.$router.push('/dashboard')
      }
    }
  },
  methods:{
    onSignup(){
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
        this.$refs.form.reset()
        // this.$router.push('/dashboard')
      }
    },
    onDismissed(){
      console.log("dismis fired");
      this.$store.dispatch('clearError')
    }
  }
}
</script>