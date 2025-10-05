import React, { useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAppStore } from '../store/useAppStore'

 type Props = {
  questionId: number
}

/**
 * PhotoPicker allows the user to select an image file and upload it to Supabase Storage.
 * The uploaded path is recorded in the corresponding entry's photos field. For simplicity
 * this implementation stores the image under a folder named after the user's ID and
 * question ID. Note: At present, the photos table is configured with row level
 * security, so only the entry owner can insert or read their photos.
 */
export default function PhotoPicker({ questionId }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const { user } = useAppStore((state) => ({ user: state.user }))

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !user) return
    const fileName = `${user.id}/${questionId}/${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage.from('bedtijd-photos').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
    if (error) {
      console.error('Failed to upload image', error)
      return
    }
    // Create or fetch entry id and insert photo record
    const entryId = await getEntryId(questionId)
    await supabase.from('photos').insert({ entry_id: entryId, storage_path: data.path })
  }

  // Helper to get or create an entry id for the given question
  async function getEntryId(questionId: number): Promise<string> {
    const { entries, saveEntry } = useAppStore.getState()
    const entry = entries[questionId]
    if (entry && entry.id) return entry.id
    await saveEntry({ question_id: questionId, notes: '' })
    const updated = useAppStore.getState().entries[questionId]
    return updated.id || ''
  }

  return (
    <div className="mt-2">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="block w-full text-sm"
        onChange={handleFileChange}
      />
      <p className="text-xs text-gray-500 mt-1">Tip: flits uit voor rustig licht.</p>
    </div>
  )
}
