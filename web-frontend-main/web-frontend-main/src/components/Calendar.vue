<template>
    <div>
        <b-calendar v-model="value" locale="en-US"></b-calendar>
        <div :key="index" v-for="(date,index) in dates">
            <table>
                <tr>
                    <th>{{date.weekday}}{{date.dentistID}}</th>
                </tr>
                <tr>
                    <td v-for="(timeslot, index) in date.timeslots" :key="index">
                     <b-button @click="printName(date.timeslots[index],date.dentistID)">{{timeslot}}</b-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            dates:[],
            value: '',
            chosenDay:''
        }

    }, 
    computed: {
        ...mapGetters(["getDentists"],["getTimes"])
    },
    methods: {
        printName(time,dentistID){
            var booking = {
                userid:  Math.floor(Math.random()* 100000),
                requestid: Math.floor(Math.random()* 100),
                dentistid: dentistID,
                issuance: new Date(this.value+" "+time).getTime(),
                date: this.value

            }
            console.log(booking)
            this.$root.$emit("booking", booking)
        },
        filter(){
            this.chosenDay = new Date(this.value).getDay()
            switch(this.chosenDay){
                case 1:
                    this.chosenDay = "monday"
                    console.log(this.chosenDay)
                    break
                case 2:
                    this.chosenDay = "tuesday"
                    console.log(this.chosenDay)
                    break
                case 3:
                    this.chosenDay = "wednesday"
                    console.log(this.chosenDay)
                    break
                case 4:
                    this.chosenDay = "thursday"
                    console.log(this.chosenDay)
                    break
                case 5:
                    this.chosenDay = "friday"
                    console.log(this.chosenDay)
                    break
                default:
                    break
            }

        }
    },
    mounted() {
        this.$root.$on("emit", (id) => {
                this.dates = []
                this.filter()
               for(var i = 0; i <= 20; i++){
                if(this.$store.getters.getTimes.appointment[i].dentistID == id && this.$store.getters.getTimes.appointment[i].weekday == this.chosenDay){
                    var temp = {
                        dentistID: this.$store.getters.getTimes.appointment[i].dentistID,
                        weekday: this.$store.getters.getTimes.appointment[i].weekday,
                        timeslots: this.$store.getters.getTimes.appointment[i].timeslots
                    } 
                    this.dates.push(temp)
                    //console.log(this.dates)
                }

            }
        })
    }
}
</script>