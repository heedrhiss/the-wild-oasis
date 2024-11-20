"use client"

export default function ReloadButton() {
  return (
    <button className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg' onClick={()=> location.reload()}>
          Try again
    </button>
  )
}
