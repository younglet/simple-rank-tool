<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="flex  gap-4 my-2 w-full justify-end px-4">
      <button @click="eventStore.newEvent" class="hover:text-blue-500">添加项目</button>
      <button @click="eventStore.newPlayer" class="hover:text-blue-500">添加选手</button>
      <button @click="eventStore.reset" class="hover:text-blue-500">全部重置</button>
    </div>
    <div class="flex flex-col items-center mt-10 flex-1">
      <table v-auto-animate class="text-center">
        <tr class="text-blue-500 font-bold text-xl border-b">
          <th>选手</th>
          <th v-for="event in eventStore.events" :key="event.id" @click="eventStore.deleteEvent(event.name)"
            class="w-24 text-center">
            {{ event.name }}
          </th>
          <th class="w-24 text-center">总分</th>
          <th class="w-24 text-center">排名</th>
          <th>
          </th>
        </tr>
        <tr v-for="player in eventStore.rank" :key="player.id" class="py-2 hover:bg-blue-400 hover:text-white">
          <td @click="eventStore.deletePlayer(player.name)" class="w-24 text-center py-1 font-bold">{{ player.name }}
          </td>
          <td v-for="record in player.records" :key="record.name" class="w-24 text-center"
            @click="eventStore.setRecord(player.name, record.event)">
            {{ record.score }}
          </td>
          <td>{{ player.total }}</td>
          <td>{{ player.rankIdx }}</td>
        </tr>
        <tr>
          <td class="text-gray-500 text-sm text-center" v-if="eventStore.rank.length === 0">
            暂无选手
          </td>
        </tr>
      </table>
    </div>
    <div class="p-2 text-xs text-right text-gray-500">
      📢 点击项目或者选手可以删除，点击项目得分可以修改
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useEventStore } from './stores/event';
import { storeToRefs } from 'pinia';
const eventStore = useEventStore()
const { rank } = storeToRefs(eventStore)

</script>
