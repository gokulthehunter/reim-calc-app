<template>
    <v-content>
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12 sm12 class="text-xs-right">
                    <!-- modal[start] -->
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-btn slot="activator" color="primary" dark class="mr-0 mb-2 ml-0 d-inline-block">Add New Bill</v-btn>
                        <v-card>
                        <v-form ref="form" v-model="valid" lazy-validation action="javascript:void(0)">
                            <v-card-title>
                                <span class="headline">Add New Bill</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm6 md4>
                                            <v-text-field 
                                            id="billNumber"
                                            name="billNumber"
                                            v-model="editedItem.billNo" 
                                            :rules="textRules"
                                            required 
                                            label="Bill Number"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md4>
                                            <v-text-field 
                                            id="billDate"
                                            name="billDate"
                                            v-model="editedItem.date" 
                                            :rules="textRules"
                                            required 
                                            label="Bill Date"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md4>
                                            <v-text-field 
                                            type="number"
                                            id="billAmount"
                                            name="billAmount"
                                            v-model="editedItem.amount" 
                                            :rules="textRules"
                                            required 
                                            label="Bill Amount"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md4>
                                            <v-text-field 
                                            id="billRemarks"
                                            name="billRemarks"
                                            v-model="editedItem.remarks" 
                                            :rules="textRules"
                                            required 
                                            label="Remarks"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md4>
                                            <v-text-field 
                                            id="billAttachment"
                                            name="billAttachment"
                                            v-model="editedItem.attachment"
                                            required
                                            :rules="textRules"
                                            label="attachment"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-radio-group 
                                            id="billRadioGroup"
                                            name="billRadioGroup"
                                            :rules="[v => !!v || 'Item is required']" 
                                            row 
                                            v-model="radioGroup" 
                                            required
                                            :readonly="disabledRadio"
                                            class="category-input">
                                                <v-radio class="radio-btns" label="Petrol" selected value="0"></v-radio>
                                                <v-radio class="radio-btns" label="entertin" value="1"></v-radio>
                                                <v-radio class="radio-btns" label="uniform" value="2"></v-radio>
                                                <v-radio class="radio-btns" label="vehicle" value="3"></v-radio>
                                                <v-radio class="radio-btns" label="mobile" value="4"></v-radio>
                                            </v-radio-group>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                                <v-btn type="submit" color="blue darken-1" flat @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-form>
                        </v-card>
                    </v-dialog>
                    <!-- modal[end] -->
                </v-flex>
                <v-flex xs12 sm12>
                    <v-tabs v-model="active" color="primary" dark slider-color="blue lighten-5">
                        <v-tab v-for="tabData in tabDatas" :key="tabData.title" ripple>
                            {{tabData.title}}
                        </v-tab>
                        <v-tab-item v-for="(tabData, index) in tabDatas" :key="tabData.title" :showUser="showUser">
                            <v-card flat>
                                <v-card-text dark color="blue lighten-1" class="pa-0">
                                    <div class="pa-3">
                                        {{ tabData.desc }}
                                    </div>
                                    <v-data-table colspan="100%" :headers="billHeaders" :index="index" :items="tabData.bills" hide-actions class="elevation-1">
                                        <template slot="items" slot-scope="props">
                                            <td>{{ props.item.slNo }}</td>
                                            <td class="text-xs-right">{{ props.item.billNo }}</td>
                                            <td class="text-xs-right">{{ props.item.date }}</td>
                                            <td class="text-xs-right">{{ props.item.amount }}</td>
                                            <td class="text-xs-right">{{ props.item.remarks }}</td>
                                            <td class="text-xs-right">
                                                <v-btn class="mr-0">
                                                    <v-icon style="vertical-align:middle">get_app</v-icon>
                                                </v-btn>
                                            </td>
                                            <td class="text-xs-right px-0 pr-3">
                                                <!-- <div class="text-xs-center"> -->
                                                    <v-btn depressed flat light fab small color="primary" @click="editItem(props.item,index)">
                                                        <v-icon small>edit</v-icon>
                                                    </v-btn>
                                                    <v-btn depressed flat light fab small color="primary" @click="deleteItem(props.item,index)">
                                                        <v-icon small>delete</v-icon>
                                                    </v-btn>
                                                <!-- </div> -->
                                            </td>
                                        </template>
                                        <template slot="footer" :subTotalandSlno="subTotalandSlno">
                                            <td colspan="100%" class="sub-total-footer-td blue lighten-1">
                                                <div class="sub-total-text title"><strong>{{tabData.subTotal.text}}</strong></div>
                                                <div class="sub-total-amt title blue darken-4"><strong><span>&#8377;</span>{{tabData.subTotal.amount}}</strong></div>
                                            </td>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>
<script>
    export default {
        data () {
            return {
                valid: true,
                active: null,
                tabDatas:null, //later load from vue state
                actUser:null,
                dialog: false,
                editedIndex: -1,
                radioGroup:null,
                disabledRadio: false,
                billType:0,
                textRules:[
                    v => !!v || 'This field Reuqired',
                ],
                radioGroupLabels:['petrol','Entertain','uniform','vehicle','mobile'],
                billHeaders: [
                    {text: 'Sl.No',align: 'left',sortable: false,value: 'slNo'},
                    {text: 'Bill Number', align: 'right',sortable: false,value: 'billNumber' },
                    {text: 'Date',align: 'right',sortable: false, value: 'date' },
                    {text: 'Amount',align: 'right',sortable: false, value: 'amount' },
                    {text: 'Remarks',align: 'right',sortable: false, value: 'remarks' },
                    {text: 'Attachment', align: 'right',sortable: false, value: 'attachment' },
                    {text: 'Actions', align: 'right',sortable: false, value: 'actions' }
                ],
                editedItem: {
                    value: false,
                    slNo: 0,
                    billNo: '',
                    date: '',
                    amount: '',
                    remarks: '',
                    attachment: 'download',
                },
                defaultItem: {
                    value: false,
                    slNo: 0,
                    billNo: '',
                    date: '',
                    amount: '',
                    remarks: '',
                    attachment: 'download',
                }
            }
        },
        created(){
            this.actUser = this.$store.getters.user
            this.tabDatas = this.$store.getters.tabDatas
            this.radioGroup = this.$store.getters.radioGroup
        },
        computed:{
            showUser(){
                console.log(this.actUser.id);
            },
            subTotalandSlno(){
                let billL = 0;
                Object.entries(this.tabDatas).forEach(([key, val]) => {
                    billL = val.bills.length
                    let i = 1;
                    let total = 0;
                    Object.entries(val.bills).forEach(([keys, vals]) => {
                        //console.log(vals.slNo)
                        vals.slNo = i++

                        total += parseFloat(vals.amount)
                    });
                    val.subTotal.amount = total
                });
            },
        },
        watch:{
            function(){
                return (
                    this.tabDatas = this.$store.getters.tabDatas,
                    this.radioGroup = this.$store.getters.radioGroup
                )
            },
            dialog (val) {
                val || this.close()
            }
        },
        methods: {
            editItem(item,index){
                this.$refs.form.reset()
                this.radioGroup = index.toString() //converting string
                this.editedIndex = this.tabDatas[index].bills.indexOf(item)
                this.editedItem = Object.assign({},item)
                this.disabledRadio = true
                this.dialog = true //dialog open
            },
            deleteItem(item,index){
                const billIndex = this.tabDatas[index].bills.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.tabDatas[index].bills.splice(billIndex, 1)
            },
            close () {
                this.dialog = false
                this.radioGroup = null
                this.disabledRadio = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                    this.$refs.form.reset()
                }, 300)
            },
            save () {
                if (this.$refs.form.validate()) {
                    this.disabledRadio = false
                    if (this.editedIndex > -1) {
                        Object.assign(this.tabDatas[parseInt(this.radioGroup)].bills[parseInt(this.editedIndex)], this.editedItem)
                    } else {
                        //this.tabDatas[parseInt(this.radioGroup)].bills.push(this.editedItem)
                        this.$store.dispatch('radioGroup',this.radioGroup)
                        this.$store.dispatch('tabDatas',this.editedItem)
                    }
                    this.close()
                    ///this.$refs.form.reset()
                    this.radioGroup = null
                }else{
                    console.log('validation error')
                }
            }
        }
    }
</script>
<style scoped>
    .sub-total-footer-td{padding:0;height: 100%;}
    .sub-total-text{float: left;width:calc(100% - 200px);color:#fff;padding:20px 24px;}
    .sub-total-amt{float: right;width: 200px;text-align: right;color:#fff;padding:20px 24px;}

    .category-input{display: block;}
    /* .v-input--radio-group--column .v-input--radio-group__input{} */
</style>