<template>
  <div id= "app">
    <NaviBar />
    <Map />
    <Calendar />

    <!--b-button @click="topicPublish()">PUB!</b-button-->
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import Map from './components/Map';
import NaviBar from './components/NaviBar';
import Calendar from './components/Calendar';
import { mapGetters } from 'vuex';
import mqtt from 'mqtt'

export default {
  name: 'App',

  components: {
    Map,
    NaviBar,
    Calendar
  },
    data() {
    return {
      connection: {
        host: 'broker.emqx.io',
        port: 8083,
        endpoint: '/mqtt',
        clean: true, // Reserved session
        connectTimeout: 4000, // Time out
        reconnectPeriod: 4000, // Reconnection interval
        // Certification Information
        clientId: 'mqtt001122334455',
      },
      subscription: {
        topic: 'dentistries',
        qos: 0,
      },
      publish: {
        topic: 'topic/publish',
        qos: 0,
        payload: '{ "msg": "Tests" }',
      },
      receiveNews: '',
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
    }
  },
  created() {
    this.createConnection();
    this.topicSubscribe();
    this.topicPublish();
    this.topicSubscribeTime()
  },
  computed: {
    ...mapGetters(["getDentists"])
  },

  methods: {
    // Create connection
    createConnection() {
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
        this.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        console.log('Connection succeeded! ' + host + ' ' + port)
      })
      this.client.on('error', error => {
        console.log('Connection failed', error)
      })
      this.client.on('message', (topic, message) => {
        this.receiveNews = this.receiveNews.concat(message)
        console.log(`Received message "${message}" from topic "${topic}"`)
        var parsedMessage = {};
        try {
          parsedMessage = JSON.parse(message.toString());
        } catch (e) {
          message = {}
        }
        if (topic === 'dentistries'){
          this.$store.commit('updateDentists', parsedMessage)
        } else if (topic === 'dentist/openHour'){
          this.$store.commit('updateTimes', parsedMessage)
        } else if (topic === 'rejected') {
          alert("An error has occured!")
        }
        
      })
  },
    topicPublish(){
      var {topic, qos, payload } = this.publish
      topic = "appointments";
      qos = 0;
      payload = "What Up!"
      this.client.publish(topic, payload, qos, error => {
        if (error) {
          console.log("Publish error", error)
        } else {
          console.log("Published " + payload + " Topic: " + topic);
        }
      })
    },
    topicSubscribe(){
      var { topic, qos } = this.subscription
      topic = "dentistries";
      qos = 0; 
      this.client.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.subscribeSuccess = true
        console.log('Subscribe to topics res', res)
      })
    },
    topicSubscribeTime(){
      var { topic, qos } = this.subscription
      topic = "dentist/openHour";
      qos = 0; 
      this.client.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.subscribeSuccess = true
        console.log('Subscribe to topics res', res)
      })
    }
  },
  mounted() {
    this.$root.$on("booking", (booking) => {
      var {topic, qos, payload } = this.publish
      topic = "booking/request";
      qos = 0;
      payload = JSON.stringify(booking)
      this.client.publish(topic, payload, qos, error => {
        if (error) {
          console.log("Publish error", error)
        } else {
          console.log("Published " + payload + " Topic: " + topic);
        }
      })
    })
  }
};
</script>
<style lang="scss">
</style>