<!-- ./pages/videoroom.vue -->
<template>
  <div class="p-6">
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">Publisher – Video Room</h2>
      </template>

      <!-- Local video preview -->
      <video 
        ref="localVideo" 
        autoplay 
        muted 
        playsinline 
        class="w-full rounded-lg bg-black h-64"
      ></video>

      <!-- Action buttons -->
      <div class="mt-4 flex gap-3">
      
        <UButton 
          color="blue" 
          class="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
          @click="joinRoom"
        >
          Join Room
        </UButton>

        <UButton 
          color="green" 
          class="cursor-pointer bg-green-600 hover:bg-green-700 text-white"
          @click="publishStream" 
          :disabled="!joined"
        >
          Publish
        </UButton>

        <UButton 
          color="red" 
          class="cursor-pointer bg-red-600 hover:bg-red-700 text-white"
          @click="leaveRoom" 
          :disabled="!joined"
        >
          Leave Room
        </UButton>
      </div>

      <!-- Status badge -->
      <div class="mt-4">
        <UBadge :color="statusColor">{{ status }}</UBadge>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const localVideo = ref<HTMLVideoElement | null>(null)
const status = ref('Idle')
const joined = ref(false)

const statusColor = computed(() => {
  switch (status.value) {
    case 'Connected': return 'blue'
    case 'Publishing': return 'green'
    case 'Idle': return 'gray'
    default: return 'gray'
  }
})

function joinRoom() {
  status.value = 'Connected'
  joined.value = true
}

async function publishStream() {
  if (!localVideo.value) return
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  localVideo.value.srcObject = stream
  status.value = 'Publishing'
}

function leaveRoom() {
  if (localVideo.value?.srcObject) {
    (localVideo.value.srcObject as MediaStream)
      .getTracks()
      .forEach(track => track.stop())
    localVideo.value.srcObject = null
  }
  status.value = 'Idle'
  joined.value = false
}
</script>
