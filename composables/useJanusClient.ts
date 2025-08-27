// composables/useJanusClient.ts
import { useRuntimeConfig } from 'nuxt/app'
import { ref, shallowRef } from 'vue'

let JanusCtor: any | null = null

export const useJanusClient = () => {
  const config = useRuntimeConfig()
  const server = config.public.JANUS_URL || 'ws://localhost:8188/janus'

  const janusRef = shallowRef<any | null>(null)

  // Dynamically import Janus client only on the client
  const ensureJanusLoaded = async () => {
    if (JanusCtor) return JanusCtor
    if (process.server) return null
    const mod = await import('typed_janus_js')
    JanusCtor = (mod as any).Janus || (mod as any).default || mod
    return JanusCtor
  }

  const init = async (): Promise<any> => {
    if (process.server) return null
    const Janus = await ensureJanusLoaded()
    if (!Janus) throw new Error('Janus can only init on client')

    return new Promise<any>((resolve, reject) => {
      Janus.init({
        debug: true,
        callback: () => {
          try {
            const j = new Janus({
              server,
              iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
              success: () => {
                janusRef.value = j
                resolve(j)
              },
              error: (err: any) => reject(err),
              destroyed: () => { janusRef.value = null }
            })
          } catch (e) {
            reject(e)
          }
        }
      })
    })
  }

  const destroy = async () => {
    if (janusRef.value) {
      try { janusRef.value.destroy() } catch {}
      janusRef.value = null
    }
  }

  const attach = async (plugin: string, handlers: any = {}): Promise<any> => {
    const janus = janusRef.value || await init()
    return new Promise((resolve, reject) => {
      janus.attach({
        plugin,
        success: (handle: any) => {
          handlers?.success?.(handle)
          resolve(handle)
        },
        error: (err: any) => {
          handlers?.error?.(err)
          reject(err)
        },
        ...handlers
      })
    })
  }

  return { init, destroy, attach, janusRef, server }
}
