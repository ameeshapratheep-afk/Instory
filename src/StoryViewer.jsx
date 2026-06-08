import { db, doc, setDoc, onSnapshot, serverTimestamp, increment } from './firebase'
import { useEffect, useState, useRef } from 'react'

const DEFAULT_STORIES = [
  { name: 'Ameesha', img: 'https://i.pravatar.cc/150?u=ameesha', story: 'https://picsum.photos/400/700?random=1' },
  { name: 'Rahul', img: 'https://i.pravatar.cc/150?u=rahul', story: 'https://picsum.photos/400/700?random=2' },
  { name: 'Priya', img: 'https://i.pravatar.cc/150?u=priya', story: 'https://picsum.photos/400/700?random=3' }
]

function StoryCard({ user, onClick, isAdd }) {
  const [viewers, setViewers] = useState(0)
  const [lastSeen, setLastSeen] = useState('')

  useEffect(() => {
    if (isAdd) return // Skip Firebase for add button
    
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000)
    setDoc(doc(db, 'stories', user.name), {
      viewers: increment(1),
      lastSeen: serverTimestamp(),
      expiresAt: expiry
    }, { merge: true })

    const unsub = onSnapshot(doc(db, 'stories', user.name), (snap) => {
      if (snap.exists()) {
        const data = snap.data()
        if (data.expiresAt?.toDate() < new Date()) {
          setViewers(0)
          setLastSeen('expired')
          return
        }
        setViewers(data.viewers || 0)
        if (data.lastSeen?.toDate) {
          const diff = Math.floor((Date.now() - data.lastSeen.toDate().getTime()) / 1000)
          setLastSeen(diff < 60? 'just now' : `${Math.floor(diff/60)}m ago`)
        }
      }
    })
    return () => unsub()
  }, [user.name, isAdd])

  return (
    <div onClick={onClick} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, marginRight: '20px', cursor: 'pointer'}}>
      <div style={{padding: '3px', borderRadius: '50%', background: isAdd? '#ddd' : 'linear-gradient(to top right, #facc15, #ec4899, #a855f7)'}}>
        <img src={user.img} style={{width: '64px', height: '64px', borderRadius: '50%', border: '3px solid white', display: 'block'}} alt={user.name} />
      </div>
      <p style={{color: '#800020', fontSize: '12px', marginTop: '4px', fontWeight: '600'}}>{user.name}</p>
      {!isAdd && <p style={{color: '#666', fontSize: '10px', margin: 0}}>{viewers} views • {lastSeen}</p>}
    </div>
  )
}

export default function StoryViewer() {
  const [stories, setStories] = useState(DEFAULT_STORIES)
  const [activeStory, setActiveStory] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (!activeStory) return

    const timer = setTimeout(() => {
      const nextIndex = currentIndex + 1
      if (nextIndex < stories.length) {
        setCurrentIndex(nextIndex)
        setActiveStory(stories[nextIndex])
      } else {
        setActiveStory(null)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [activeStory, currentIndex, stories])

  const openStory = (user) => {
    const idx = stories.findIndex(u => u.name === user.name)
    setCurrentIndex(idx)
    setActiveStory(user)
  }

  const handleAddStory = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const imageUrl = URL.createObjectURL(file)
    const myStory = {
      name: 'You',
      img: 'https://i.pravatar.cc/150?u=you',
      story: imageUrl
    }
    
    setStories([myStory,...DEFAULT_STORIES])
  }

  const closeStory = () => {
    setActiveStory(null)
    setCurrentIndex(0)
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: 'white', padding: '24px'}}>
      <h1 style={{color: '#800020', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px'}}>My Story Stories 🔥</h1>
      
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*" 
        style={{display: 'none'}} 
        onChange={handleFileChange}
      />
      
      <div style={{display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '12px'}}>
        <StoryCard 
          user={{name: 'Add Story', img: 'https://i.pravatar.cc/150?u=add&text=+', story: ''}} 
          onClick={handleAddStory} 
          isAdd={true}
        />
        {stories.map(user => <StoryCard key={user.name} user={user} onClick={() => openStory(user)} />)}
      </div>

      {activeStory && (
        <div onClick={closeStory} style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'black', zIndex: 50}}>
          <div style={{position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '16px', fontWeight: 'bold', zIndex: 51}}>
            {activeStory.name} • {currentIndex + 1}/{stories.length}
          </div>
          <img src={activeStory.story} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="story" />
          <div style={{position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center', color: 'white', fontSize: '12px', zIndex: 51}}>Tap to close • Auto next in 5s</div>
        </div>
      )}
    </div>
  )
}