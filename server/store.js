/**
 * File-backed persistence for the single GoldRate record.
 * A small JSON file keeps the value durable across restarts without
 * requiring a database engine to be installed.
 */
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEFAULT_GOLD_RATE } from './config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, 'data')
const DATA_FILE = join(DATA_DIR, 'gold-rate.json')

async function ensureStore() {
  if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true })
  if (!existsSync(DATA_FILE)) {
    await writeFile(DATA_FILE, JSON.stringify(DEFAULT_GOLD_RATE, null, 2), 'utf-8')
  }
}

export async function readGoldRate() {
  await ensureStore()
  const raw = await readFile(DATA_FILE, 'utf-8')
  return JSON.parse(raw)
}

export async function writeGoldRate({ oneGramRate }) {
  await ensureStore()
  const record = {
    id: 1,
    oneGramRate,
    updatedAt: new Date().toISOString(),
  }
  await writeFile(DATA_FILE, JSON.stringify(record, null, 2), 'utf-8')
  return record
}
