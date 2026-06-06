import { useState, useEffect } from "react";

export default function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "sample_user",
      image: "https://picsum.photos/400/400?random=2",
      caption: "First post on InStory! 🔥",
      likes: 0
    },
    {
      id: 2,
      username: "demo_user",
      image: "https://picsum.photos/400/400?random=3",
      caption: "Learning React is fun! 💻",
      likes: 3
    }
  ]);

  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [following, setFollowing] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingProfile, setViewingProfile] = useState(null);

  const [stories, setStories] = useState([
    { username: "sample_user", images: ["https://picsum.photos/400/700?random=10"], viewed: false },
    { username: "demo_user", images: ["https://picsum.photos/400/700?random=11", "https://picsum.photos/400/700?random=12"], viewed: false }
  ]);
  const [viewingStory, setViewingStory] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [timer, setTimer] = useState(5);
  const [storyImageUrls, setStoryImageUrls] = useState("");

  // TIMER: Auto close + auto next slide
  useEffect(() => {
    if (viewingStory === null) return;

    setTimer(5);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          const currentStory = stories[viewingStory];
          if (slideIndex < currentStory.images.length - 1) {
            // Next slide
            setSlideIndex(slideIndex + 1);
            return 5;
          } else {
            // Close story
            setViewingStory(null);
            setSlideIndex(0);
            clearInterval(interval);
            return 5;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [viewingStory, slideIndex, stories]);

  const addPost = () => {
    if (caption.trim() === "" || imageUrl.trim() === "") {
      alert("Please add both caption and image URL");
      return;
    }
    const newPost = {
      id: Date.now(),
      username: "you",
      image: imageUrl,
      caption: caption,
      likes: 0
    };
    setPosts([newPost,...posts]);
    setCaption("");
    setImageUrl("");
  };

  const addStory = () => {
    if (storyImageUrls.trim() === "") {
      alert("Please add story image URLs");
      return;
    }
    const urls = storyImageUrls.split(",").map(u => u.trim());
    const newStory = {
      username: "you",
      images: urls,
      viewed: false
    };
    setStories([newStory,...stories]);
    setStoryImageUrls("");
    alert(`Story posted with ${urls.length} slide(s)! 🎉`);
  };

  const deleteStory = () => {
    setStories(stories.filter((s, i) => i!== viewingStory));
    setViewingStory(null);
    setSlideIndex(0);
  };

  const likePost = (id) => {
    setPosts(posts.map(post =>
      post.id === id? {...post, likes: post.likes + 1 } : post
    ));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id!== id));
  };

  const addComment = (postId) => {
    if (newComment.trim() === "") return;
    const commentObj = { username: "you", text: newComment };
    setComments(prev => ({
...prev,
      [postId]: [...(prev[postId] || []), commentObj]
    }));
    setNewComment("");
  };

  const toggleFollow = (username) => {
    setFollowing(prev =>
      prev.includes(username)
 ? prev.filter(u => u!== username)
        : [...prev, username]
    );
  };

  const filteredPosts = posts.filter(post =>
    post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const profilePosts = viewingProfile
? posts.filter(p => p.username === viewingProfile)
    : filteredPosts;

  const openStory = (index) => {
    setViewingStory(index);
    setSlideIndex(0);
    setStories(stories.map((s, i) =>
      i === index? {...s, viewed: true } : s
    ));
  };

  const nextSlide = () => {
    const currentStory = stories[viewingStory];
    if (slideIndex < currentStory.images.length - 1) {
      setSlideIndex(slideIndex + 1);
      setTimer(5);
    } else {
      setViewingStory(null);
      setSlideIndex(0);
    }
  };

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
      setTimer(5);
    }
  };

  return (
    <>
      {/* Story Viewer - Full Screen with Slides + Delete */}
      {viewingStory!== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'black',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={(e) => {
            const x = e.clientX;
            const width = window.innerWidth;
            if (x < width/2) prevSlide();
            else nextSlide();
          }}
        >
          {/* Progress bars for multiple slides */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            right: '10px',
            display: 'flex',
            gap: '4px',
            zIndex: 10001
          }}>
            {stories[viewingStory].images.map((_, i) => (
              <div key={i} style={{
                flex: 1,
                height: '4px',
                backgroundColor: 'gray',
                borderRadius: '2px'
              }}>
                <div style={{
                  height: '100%',
                  width: i < slideIndex? '100%' : i === slideIndex? `${(timer/5)*100}%` : '0%',
                  backgroundColor: 'white',
                  borderRadius: '2px',
                  transition: i === slideIndex? 'width 1s linear' : 'none'
                }}></div>
              </div>
            ))}
          </div>

          {/* Delete button - only for "you" */}
          {stories[viewingStory].username === "you" && (
            <button
              onClick={(e) => {e.stopPropagation(); deleteStory();}}
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                fontSize: '24px',
                border: 'none',
                cursor: 'pointer',
                zIndex: 10000
              }}
            >
              🗑️
            </button>
          )}

          <button
            onClick={(e) => {e.stopPropagation(); setViewingStory(null);}}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '35px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              zIndex: 10000
            }}
          >
            ×
          </button>

          <img
            src={stories[viewingStory].images[slideIndex]}
            alt="story"
            style={{maxHeight: '100vh', maxWidth: '100vw', objectFit: 'contain'}}
          />
          <p style={{position: 'absolute', top: '30px', left: '90px', color: 'white', fontWeight: 'bold', fontSize: '20px', zIndex: 10000}}>
            {stories[viewingStory].username}
          </p>
          <p style={{position: 'absolute', top: '60px', left: '90px', color: 'white', fontSize: '14px', zIndex: 10000}}>
            Slide {slideIndex + 1}/{stories[viewingStory].images.length} • Closes in {timer}s
          </p>
          <p style={{position: 'absolute', bottom: '30px', color: 'gray', fontSize: '12px', zIndex: 10000}}>
            Tap left = back • Tap right = next
          </p>
        </div>
      )}

      {/* Main App */}
      {viewingStory === null && (
        <div style={{minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '16px'}}>
          <h1 style={{fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px'}}>InStory 📸</h1>

          <button
            onClick={() => setViewingStory(0)}
            style={{
              position: 'fixed',
              bottom: '16px',
              right: '16px',
              backgroundColor: 'red',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '9999px',
              zIndex: 50,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Test Story
          </button>

          {viewingProfile && (
            <button
              onClick={() => setViewingProfile(null)}
              style={{maxWidth: '400px', margin: '0 auto 16px', color: 'blue', fontWeight: 'bold', display: 'block', background: 'none', border: 'none', cursor: 'pointer'}}
            >
              ← Back to Feed
            </button>
          )}

          {!viewingProfile && (
            <div style={{maxWidth: '400px', margin: '0 auto 16px'}}>
              <input
                type="text"
                placeholder="Search users or captions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{width: '100%', border: '1px solid #ccc', borderRadius: '9999px', padding: '8px 16px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'}}
              />
            </div>
          )}

          {/* ADD STORY SECTION - Now accepts multiple URLs separated by commas */}
          {!viewingProfile && (
            <div style={{maxWidth: '400px', margin: '0 auto 16px', backgroundColor: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
              <h2 style={{fontWeight: 'bold', marginBottom: '12px'}}>Add Story 📸</h2>
              <input
                type="text"
                placeholder="Story URLs, separate with commas..."
                value={storyImageUrls}
                onChange={(e) => setStoryImageUrls(e.target.value)}
                style={{width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '8px 12px', marginBottom: '8px'}}
              />
              <p style={{fontSize: '12px', color: 'gray', marginBottom: '8px'}}>Example: url1.jpg, url2.jpg, url3.jpg</p>
              <button
                onClick={addStory}
                style={{width: '100%', backgroundColor: '#ec4899', color: 'white', padding: '8px 0', borderRadius: '4px', fontWeight: 'bold', border: 'none', cursor: 'pointer'}}
              >
                Post Story
              </button>
            </div>
          )}

          {/* INSTAGRAM STYLE STORY CIRCLES */}
          {!viewingProfile && (
            <div style={{maxWidth: '400px', margin: '0 auto 24px'}}>
              <p style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '8px'}}>Stories:</p>
              <div style={{display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px'}}>
                {stories.map((story, i) => (
                  <div key={i} style={{flexShrink: 0, textAlign: 'center'}}>
                    <div
                      onClick={() => openStory(i)}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        padding: '3px',
                        cursor: 'pointer',
                        background: story.viewed
                      ? 'lightgray'
                          : 'linear-gradient(to top right, #facc15, #ec4899)'
                      }}
                    >
                      <img
                        src={story.images[0]}
                        alt={story.username}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          border: '2px solid white',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <p style={{fontSize: '12px', marginTop: '4px', width: '64px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{story.username}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!viewingProfile && (
            <div style={{maxWidth: '400px', margin: '0 auto 24px', backgroundColor: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
              <h2 style={{fontWeight: 'bold', marginBottom: '12px'}}>Create Post</h2>
              <input
                type="text"
                placeholder="Caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                style={{width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '8px 12px', marginBottom: '8px'}}
              />
              <input
                type="text"
                placeholder="Image URL..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '8px 12px', marginBottom: '8px'}}
              />
              <button
                onClick={addPost}
                style={{width: '100%', backgroundColor: '#3b82f6', color: 'white', padding: '8px 0', borderRadius: '4px', fontWeight: 'bold', border: 'none', cursor: 'pointer'}}
              >
                Post
              </button>
            </div>
          )}

          {viewingProfile && (
            <div style={{maxWidth: '400px', margin: '0 auto 24px', backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center'}}>
              <div style={{width: '80px', height: '80px', backgroundColor: '#3b82f6', borderRadius: '50%', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>
                {viewingProfile[0].toUpperCase()}
              </div>
              <h2 style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '4px'}}>{viewingProfile}</h2>
              <p style={{color: 'gray', fontSize: '14px', marginBottom: '12px'}}>Bio: Living my best life ✨</p>
              <div style={{display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '14px'}}>
                <div>
                  <p style={{fontWeight: 'bold'}}>{profilePosts.length}</p>
                  <p style={{color: 'gray'}}>Posts</p>
                </div>
                <div>
                  <p style={{fontWeight: 'bold'}}>128</p>
                  <p style={{color: 'gray'}}>Followers</p>
                </div>
                <div>
                  <p style={{fontWeight: 'bold'}}>89</p>
                  <p style={{color: 'gray'}}>Following</p>
                </div>
              </div>
            </div>
          )}

          <div style={{maxWidth: '400px', margin: '0 auto'}}>
            {profilePosts.length === 0? (
              <p style={{textAlign: 'center', color: 'gray'}}>No posts found 😢</p>
            ) : (
              profilePosts.map(post => (
                <div key={post.id} style={{backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: '16px'}}>
                  <div style={{padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span
                      onClick={() => setViewingProfile(post.username)}
                      style={{fontWeight: 'bold', cursor: 'pointer'}}
                    >
                      {post.username}
                    </span>
                    <div style={{display: 'flex', gap: '8px'}}>
                      {post.username!== "you" &&!viewingProfile && (
                        <button
                          onClick={() => toggleFollow(post.username)}
                          style={{
                            fontSize: '14px',
                            padding: '4px 12px',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: following.includes(post.username)? 'lightgray' : '#3b82f6',
                            color: following.includes(post.username)? 'black' : 'white'
                          }}
                        >
                          {following.includes(post.username)? "Following" : "Follow"}
                        </button>
                      )}
                      {post.username === "you" && (
                        <button
                          onClick={() => deletePost(post.id)}
                          style={{color: 'red', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer'}}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>

                  <img src={post.image} alt="post" style={{width: '100%'}} />

                  <div style={{padding: '12px'}}>
                    <button
                      onClick={() => likePost(post.id)}
                      style={{fontSize: '24px', marginBottom: '8px', background: 'none', border: 'none', cursor: 'pointer'}}
                    >
                      ❤️
                    </button>
                    <p style={{fontWeight: 'bold', fontSize: '14px', marginBottom: '4px'}}>{post.likes} likes</p>
                    <p style={{fontSize: '14px'}}>
                      <span style={{fontWeight: 'bold'}}>{post.username}: </span>
                      {post.caption}
                    </p>

                    <div style={{marginTop: '12px', borderTop: '1px solid #e5e7eb', paddingTop: '8px'}}>
                      {comments[post.id]?.map((c, i) => (
                        <div key={i} style={{fontSize: '14px', marginBottom: '4px'}}>
                          <span style={{fontWeight: 'bold'}}>{c.username}: </span>
                          <span>{c.text}</span>
                        </div>
                      ))}

                      <div style={{display: 'flex', marginTop: '8px'}}>
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && addComment(post.id)}
                          style={{flex: 1, border: '1px solid #ccc', borderRadius: '4px', padding: '4px 8px', fontSize: '14px'}}
                        />
                        <button
                          onClick={() => addComment(post.id)}
                          style={{marginLeft: '8px', backgroundColor: '#3b82f6', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '14px', border: 'none', cursor: 'pointer'}}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}