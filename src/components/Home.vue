<template>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                <v-flex text-xs-center xs12 sm12>
                    <!-- <v-text>
                        <h1>Lorem Ipsum</h1>
                    </v-text> -->
                    <v-card width="400px" class="intro-card" hover>
                        <!-- <v-card-media src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" height="200px">
                        </v-card-media> -->
                        <v-card-title primary-title>
                            <h1 class="text-xs-center d-xs-block intro-head">Join Programme</h1>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et explicabo, accusantium inventore tempora velit consequatur repellendus nam eligendi suscipit maiores ad! Voluptate, soluta corrupti nulla excepturi pariatur explicabo aspernatur temporibus!</p>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn large color="primary" to="/signup">Create An Account</v-btn> 
                            <v-btn large color="primary" to="/dashboard">Go to Dashboard</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                </v-layout>
            </v-container>
        </v-content>
</template>

<script>
export default {
    name:'Home'
}
</script>

<style scoped>
    .intro-card{margin:auto;}
    .intro-card .intro-head{width:100%;}
</style>


