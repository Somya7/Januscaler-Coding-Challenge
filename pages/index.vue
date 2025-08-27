<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Nuxt + Janus Mini Demo</h1>
      <UBadge variant="subtle">{{ server }}</UBadge>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <!-- Publisher Card -->
      <UCard>
        <template #header>Publisher</template>
        <p class="text-sm text-muted-foreground">
          Join a VideoRoom and publish your webcam. Then it registers a
          mountpoint in the backend.
        </p>
        <div class="mt-4">
          <NuxtLink to="/videoroom">
            <UButton icon="i-lucide-video"> Go to Video room </UButton>
          </NuxtLink>
        </div>
      </UCard>

      <!-- Viewer Card -->

    </div>
  </div>
</template>

<script setup lang="ts">
import { useJanusClient } from "~/composables/useJanusClient";

const { server } = useJanusClient();
</script>
