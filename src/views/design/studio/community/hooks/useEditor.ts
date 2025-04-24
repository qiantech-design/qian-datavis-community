import { inject } from 'vue'
export default function useEditor() {
  const datavisEditor = inject('datavisEditor') as any
  const screenList = inject('screenList') as any
  const editor = datavisEditor.value
  return {
    editor,
    screenList
  }
}
