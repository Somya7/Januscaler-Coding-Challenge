
import { defineEventHandler, readBody } from 'h3'

let mountpoints: any[] = []
let nextId = 1

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    // return all mountpoints
    return mountpoints
  }

  if (method === 'POST') {
    // create a new mountpoint
    const body = await readBody(event)
    const newMountpoint = {
      id: nextId++,
      description: body.description || `Mountpoint ${nextId}`,
      roomId: body.roomId || null, // videoroom reference
      createdAt: new Date().toISOString()
    }
    mountpoints.push(newMountpoint)
    return newMountpoint
  }
})