import Dexie, { Table } from 'dexie'

export type IndexedDBGoggleFile = {
  id?: number
  name: string
  content: string
}

export class GogglesDexie extends Dexie {
  goggles!: Table<IndexedDBGoggleFile>

  constructor() {
    super('goggles')
    this.version(1).stores({
      goggles: '++id, name, content',
    })
  }
}

export const db = new GogglesDexie()
