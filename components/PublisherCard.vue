<template>
  <div class="max-w-3xl mx-auto p-4 border rounded-lg space-y-4">
    <div class="flex items-center justify-between">
      <div class="text-lg font-semibold">Publisher</div>
      <span :class="statusColor">{{ status }}</span>
    </div>

    <video ref="localVideo" playsinline autoplay muted class="w-full rounded bg-black aspect-video" />

    <div class="flex flex-wrap gap-2">
     <div class="mt-4">
       
            <UButton icon="i-lucide-video" @click="joinRoom" class="btn"> Join Room </UButton>
         
        </div>
      <button :disabled="connected" @click="joinRoom" class="btn">Join Room</button>
      <button :disabled="!connected || publishing" @click="publish" class="btn">Publish</button>
      <button :disabled="!connected" @click="leave" class="btn btn-red">Leave</button>
    </div>

    <div class="text-sm text-gray-500">
      Room ID: <span class="font-mono">{{ roomId }}</span> · Handle: <span class="font-mono">{{ handleId || '-' }}</span>
    </div>
  </div>
</template>
