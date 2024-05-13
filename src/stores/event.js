import { defineStore } from 'pinia'


const events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []
const players = localStorage.getItem('players') ? JSON.parse(localStorage.getItem('players')) : []
export const useEventStore = defineStore({
  id: 'event',
  state: () => ({
    events,
    players
  }),
  getters: {
    rank() {
      localStorage.setItem('events', JSON.stringify(this.events));
      localStorage.setItem('players', JSON.stringify(this.players));
      return this.players.map(player => {
        const records = player.records
        const total = records.reduce((acc, cur) => acc + cur.score, 0)
        return {
          name: player.name,
          records,
          total,
          rankIdx: this.players.filter(player => {
            return player.records.reduce((acc, cur) => acc + cur.score, 0) > total
          }).length + 1,
        }
      }).sort((a, b) => b.total - a.total)
    }
  },
  actions: {
    newEvent() {
      const eventName = prompt("输入项目名")
      if (this.events.some(event => event.name === eventName)) {
        return alert("项目已存在")
      }
      if (eventName) {
        this.events.push({
          name: eventName,
        })
        this.players.map(player => {
          player.records.push({
            event: eventName,
            score: 0,
          })
        })
      }
    },
    deleteEvent(name) {
      if (!confirm(`确定删除 ${name} 吗？`)) { return }
      this.players.map(player => {
        player.records = player.records.filter(record => record.event !== name)
      })
      this.events = this.events.filter(event => event.name !== name)
    },
    newPlayer() {
      const playerName = prompt("输入选手姓名")
      if (this.players.some(player => player.name === playerName)) {
        return alert("选手已存在")
      }
      if (playerName) {
        this.players.push({
          name: playerName,
          records: this.events.map(event => ({
            event: event.name,
            score: 0,
          }))
        })
      }
    },
    deletePlayer(name) {
      if (!confirm(`确定删除 ${name} 吗？`)) { return }
      this.players = this.players.filter(player => player.name !== name)
    },
    setRecord(playerName, eventName) {
      const player = this.players.find(player => player.name === playerName)
      const record = player.records.find(record => record.event === eventName)
      const score = prompt(`输入 ${playerName} 在 ${eventName} 的成绩`)
      if (!score) { return }
      if (isNaN(score)) {
        return alert('成绩必须是数字')
      }
      record.score = parseInt(score)

    },
    reset() {
      this.players = []
      this.events = []
    }
  }
})

