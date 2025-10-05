import React, { useState, useEffect } from 'react'
import { Question } from '../store/useAppStore'
import { useAppStore } from '../store/useAppStore'
import PhotoPicker from './PhotoPicker'
import { t } from '../i18n'

interface Props {
  question: Question
}

/**
 * QuestionCard renders a single question (or task) with optional deep prompts. It
 * provides a textarea for capturing the child's answer and buttons to save,
 * skip, or flag the question. If `photo_hint` is true, a PhotoPicker is
 * displayed so the user can attach a picture. The component interacts with
 * the Zustand store for persistence.
 */
export default function QuestionCard({ question }: Props) {
  const { entries, saveEntry, skipQuestion, flagQuestion, user } = useAppStore((state) => ({
    entries: state.entries,
    saveEntry: state.saveEntry,
    skipQuestion: state.skipQuestion,
    flagQuestion: state.flagQuestion,
    user: state.user
  }))
  const { language } = useAppStore((state) => ({ language: state.language }))
  const existing = entries[question.id]
  const [notes, setNotes] = useState(existing?.notes || '')
  const [status, setStatus] = useState('')

  useEffect(() => {
    setNotes(existing?.notes || '')
  }, [existing])

  async function handleSave() {
    await saveEntry({ question_id: question.id, notes })
    setStatus(t('questions.statusSaved', language))
    setTimeout(() => setStatus(''), 3000)
  }
  async function handleSkip() {
    await skipQuestion(question.id)
    setStatus(t('questions.statusSkipped', language))
    setTimeout(() => setStatus(''), 3000)
  }
  async function handleFlag() {
    const reason = prompt(t('questions.promptFlagReason', language)) || 'Unspecified'
    await flagQuestion(question.id, reason)
    setStatus(t('questions.statusFlagged', language))
    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <div className="rounded-2xl p-4 shadow-sm bg-white space-y-3">
      <div>
        <h2 className="text-xl font-semibold mb-1">{question.title}</h2>
        <p className="mb-2">{question.main}</p>
        {question.deep && question.deep.length > 0 && (
          <div className="text-sm italic text-gray-600">
            <div>{t('questions.labelPossibleDeep', language)}</div>
            <ul className="list-disc ml-5 space-y-1">
              {question.deep.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">{t('questions.notes', language)}</label>
        <textarea
          className="w-full mt-1 border rounded-lg p-2 min-h-[120px]"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Schrijf hier jullie gesprek of herinnering..."
        />
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-black text-white text-sm"
        >
          {t('questions.save', language)}
        </button>
        <button
          onClick={handleSkip}
          className="px-3 py-2 rounded-lg border text-sm"
        >
          {t('questions.skip', language)}
        </button>
        <button
          onClick={handleFlag}
          className="px-3 py-2 rounded-lg border border-red-500 text-red-500 text-sm"
        >
          {t('questions.flag', language)}
        </button>
        {status && <span className="text-xs text-gray-500">{status}</span>}
      </div>
      {question.photo_hint && user && (
        <div>
          <div className="text-sm font-medium mt-2">Optionele foto</div>
          <PhotoPicker questionId={question.id} />
        </div>
      )}
    </div>
  )
}
