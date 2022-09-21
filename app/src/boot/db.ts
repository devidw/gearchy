import Dexie, { Table } from 'dexie'
import type { IndexedDBGoggleFile } from 'src/types'

export class MySubClassedDexie extends Dexie {
  goggles!: Table<IndexedDBGoggleFile>

  constructor() {
    super('goggles')
    this.version(1).stores({
      goggles: '++id, name, content',
    })
  }
}

export const db = new MySubClassedDexie()
