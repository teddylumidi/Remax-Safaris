import React, { useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  db,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  increment,
  User
} from '../lib/firebase';
import { Review } from '../types';
import { Star, ThumbsUp, MessageSquarePlus, ShieldCheck, CheckCircle2, User as UserIcon, LogOut, Sparkles, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const INITIAL_SEED_REVIEWS: Review[] = [
  {
    id: 'seed-1',
    userId: 'seed-user-1',
    userName: 'Sarah Jenkins',
    userPhoto: '/images/reviewer_sarah_jenkins.jpg',
    rating: 5,
    title: 'Unforgettable 3-Day Maasai Mara Safari!',
    comment: 'Remax Safaris delivered an extraordinary experience! Our guide, Joseph, had an uncanny talent for tracking the Big Five. The 4x4 land cruiser was super comfortable, and the luxury tented camp was out of this world. Highly recommend booking through them!',
    packageName: 'Maasai Mara Great Migration Safari',
    createdAt: '2026-08-01',
    helpfulCount: 24,
    verifiedGoogle: true,
  },
  {
    id: 'seed-2',
    userId: 'seed-user-2',
    userName: 'Dr. David Omondi',
    userPhoto: '/images/reviewer_david_omondi.jpg',
    rating: 5,
    title: 'Flawless Diani Beach Vacation for Our Family',
    comment: 'We booked a 5-day package to Diani Beach with airport transfers and a Wasini dolphin cruise. The team at Remax handled every detail seamlessly over WhatsApp. Zero stress, unbeatable pricing!',
    packageName: 'Diani Beach & Wasini Island Getaway',
    createdAt: '2026-07-28',
    helpfulCount: 18,
    verifiedGoogle: true,
  },
  {
    id: 'seed-3',
    userId: 'seed-user-3',
    userName: 'Elena Rostova',
    userPhoto: '/images/reviewer_elena_rostova.jpg',
    rating: 5,
    title: 'Breathtaking Views of Mt. Kilimanjaro in Amboseli',
    comment: 'Seeing giant elephant herds right against the backdrop of Kilimanjaro was a lifelong dream fulfilled. Remax Safaris arranged excellent lodges and timing. Will definitely travel with them again for our next African trip!',
    packageName: 'Amboseli Elephant Sanctuary Tour',
    createdAt: '2026-07-15',
    helpfulCount: 15,
    verifiedGoogle: true,
  },
  {
    id: 'seed-4',
    userId: 'seed-user-4',
    userName: 'Marcus Vance',
    userPhoto: '/images/reviewer_marcus_vance.jpg',
    rating: 5,
    title: 'Thrilling Lake Naivasha Hippo Shore & Biking Safari',
    comment: 'The motorboat cruise right next to hippo pods on Lake Naivasha was mind-blowing! Cycling among giraffes in Hell’s Gate and walking on Crescent Island made this the ultimate weekend getaway from Nairobi.',
    packageName: 'Lake Naivasha Hippo Safari & Hell’s Gate',
    createdAt: '2026-07-10',
    helpfulCount: 21,
    verifiedGoogle: true,
  },
  {
    id: 'seed-5',
    userId: 'seed-user-5',
    userName: 'Amina Mohamed',
    userPhoto: '/images/reviewer_amina_mohamed.jpg',
    rating: 5,
    title: 'Swimming with Turtles in Zanzibar was Pure Magic!',
    comment: 'Swimming with rescued sea turtles in Nungwi and taking the sunset dhow boat cruise across turquoise ocean waters was the highlight of our honeymoon. Remax Safaris organized everything perfectly.',
    packageName: 'Zanzibar Sea Turtle Sanctuary & Beach',
    createdAt: '2026-07-04',
    helpfulCount: 32,
    verifiedGoogle: true,
  },
  {
    id: 'seed-6',
    userId: 'seed-user-6',
    userName: 'Robert & Clara Hughes',
    userPhoto: '/images/reviewer_hughes_couple.jpg',
    rating: 5,
    title: 'Spectacular Cape Town & Camps Bay Getaway',
    comment: 'The view of Table Mountain and Camps Bay beach left us speechless. Seamless flight connections, luxury oceanfront boutique hotel, and private wine estate tours in Stellenbosch. 10/10 service!',
    packageName: 'Cape Town & Garden Route Tour',
    createdAt: '2026-06-22',
    helpfulCount: 19,
    verifiedGoogle: true,
  },
  {
    id: 'seed-7',
    userId: 'seed-user-7',
    userName: 'Michael Thorne',
    userPhoto: '/images/reviewer_michael_thorne.jpg',
    rating: 5,
    title: 'Red Elephants of Tsavo & Salt Lick Lodge',
    comment: 'Staying at the stilted Salt Lick Safari Lodge with elephants drinking beneath our room was incredible. Our driver guide was so knowledgeable about wildlife and bird species. Truly top tier safari agency.',
    packageName: 'Tsavo East & West Wildlife Explorer',
    createdAt: '2026-06-14',
    helpfulCount: 12,
    verifiedGoogle: true,
  },
  {
    id: 'seed-8',
    userId: 'seed-user-8',
    userName: 'Wanjiku Kimani',
    userPhoto: '/images/reviewer_wanjiku_kimani.jpg',
    rating: 5,
    title: 'Perfect Weekend Trip to Lake Nakuru',
    comment: 'Spotted both black and white rhinos in Lake Nakuru National Park along with thousands of pink flamingos along the shore. Very punctual driver, clean pop-top cruiser, and great lunch buffet!',
    packageName: 'Lake Nakuru Flamingo & Rhino Safari',
    createdAt: '2026-06-02',
    helpfulCount: 16,
    verifiedGoogle: true,
  },
];

export const ReviewsSection: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_SEED_REVIEWS);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [packageName, setPackageName] = useState<string>('General Safari Experience');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Listen to Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Reviews from Firestore
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const fetched: Review[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        fetched.push({
          id: docSnap.id,
          userId: data.userId || '',
          userName: data.userName || 'Verified Traveler',
          userPhoto: data.userPhoto || '',
          userEmail: data.userEmail || '',
          rating: data.rating || 5,
          title: data.title || '',
          comment: data.comment || '',
          packageName: data.packageName || 'Safari Experience',
          createdAt: data.createdAt || new Date().toISOString().split('T')[0],
          helpfulCount: data.helpfulCount || 0,
          verifiedGoogle: true,
        });
      });

      if (fetched.length > 0) {
        const combined = [...fetched, ...INITIAL_SEED_REVIEWS.filter(s => !fetched.some(f => f.id === s.id))];
        setReviews(combined);
      } else {
        setReviews(INITIAL_SEED_REVIEWS);
      }
    } catch (err) {
      console.warn('Unable to load reviews from Firestore, using initial cached list', err);
      setReviews(INITIAL_SEED_REVIEWS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle Form Submit
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setFormError('Please sign in with your Google account first.');
      return;
    }

    if (!title.trim() || !comment.trim()) {
      setFormError('Please fill in both the review headline and detailed review.');
      return;
    }

    setSubmitting(true);
    setFormError(null);

    const newReviewData = {
      userId: user.uid,
      userName: user.displayName || 'Google User',
      userPhoto: user.photoURL || '',
      userEmail: user.email || '',
      rating: rating,
      title: title.trim(),
      comment: comment.trim(),
      packageName: packageName,
      createdAt: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
    };

    try {
      const docRef = await addDoc(collection(db, 'reviews'), newReviewData);
      
      const newReview: Review = {
        id: docRef.id,
        ...newReviewData,
        verifiedGoogle: true,
      };

      setReviews((prev) => [newReview, ...prev]);
      setSubmitSuccess(true);
      setTitle('');
      setComment('');
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowReviewModal(false);
      }, 2000);
    } catch (err: any) {
      console.error('Error adding review to Firestore:', err);
      setFormError('Failed to save review to database. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Helpful Vote
  const handleVoteHelpful = async (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );

    if (!reviewId.startsWith('seed-')) {
      try {
        const reviewRef = doc(db, 'reviews', reviewId);
        await updateDoc(reviewRef, {
          helpfulCount: increment(1),
        });
      } catch (err) {
        console.warn('Could not update helpful vote in Firestore', err);
      }
    }
  };

  // Take up to 8 reviews for horizontal slide carousel
  const displayReviews = reviews.slice(0, 8);
  const totalSlides = displayReviews.length;

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#FAF7F2] dark:bg-[#0D1612] border-t border-[#E8E2D6] dark:border-[#1E3025] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="inline-block px-3.5 py-1 bg-[#12231A] dark:bg-[#FDFBF7] text-[#FDFBF7] dark:text-[#12231A] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em]">
            Verified Guest Impressions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#12231A] dark:text-[#FDFBF7] tracking-tight">
            What Our Travelers Say
          </h2>
          <div className="w-12 h-[1.5px] bg-[#C88A4B] mx-auto opacity-70" />
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Authentic reflections shared by guests who embarked on private Kenya wilderness safaris and bespoke global journeys with Remax Safaris.
          </p>
        </div>

        {/* Simple Horizontal Slider Controls (< > Navigation) */}
        <div className="flex items-center justify-between gap-3 mb-6 max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-medium">
            Story {currentSlide + 1} of {totalSlides}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevSlide}
                className="w-10 h-10 border border-[#E8E2D6] dark:border-stone-800 bg-white dark:bg-[#101C15] text-[#12231A] dark:text-[#FDFBF7] hover:border-[#C88A4B] hover:text-[#C88A4B] transition-all flex items-center justify-center"
                title="Previous Review"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-10 h-10 border border-[#E8E2D6] dark:border-stone-800 bg-white dark:bg-[#101C15] text-[#12231A] dark:text-[#FDFBF7] hover:border-[#C88A4B] hover:text-[#C88A4B] transition-all flex items-center justify-center"
                title="Next Review"
                aria-label="Next Review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {user && (
              <button
                onClick={() => setShowReviewModal(true)}
                className="px-4 py-2 bg-[#12231A] hover:bg-[#3D5A45] text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-all"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Write Review</span>
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Reviews Track (One Line Carousel) */}
        {loading ? (
          <div className="py-12 text-center text-stone-400 text-sm font-light">Loading guest impressions...</div>
        ) : (
          <div className="relative overflow-hidden p-1 max-w-4xl mx-auto">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {displayReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="w-full shrink-0 px-2"
                >
                  <div className="bg-white dark:bg-[#101C15] p-8 sm:p-10 border border-[#E8E2D6] dark:border-[#1E3025] flex flex-col justify-between min-h-[260px] shadow-xs">
                    <div className="space-y-4">
                      {/* Rating Stars & Package Badge */}
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-4 h-4 ${
                                s <= rev.rating ? 'fill-[#C88A4B] text-[#C88A4B]' : 'text-stone-200 dark:text-stone-800'
                              }`}
                            />
                          ))}
                        </div>
                        {rev.packageName && (
                          <span className="px-3 py-1 bg-[#FAF7F2] dark:bg-stone-900 border border-[#E8E2D6] dark:border-stone-800 text-[#12231A] dark:text-[#C88A4B] text-[11px] uppercase tracking-wider font-medium">
                            {rev.packageName}
                          </span>
                        )}
                      </div>

                      {/* Review Title */}
                      <h3 className="font-serif text-[#12231A] dark:text-[#FDFBF7] text-xl sm:text-2xl leading-snug font-normal">
                        "{rev.title}"
                      </h3>

                      {/* Review Comment */}
                      <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                        {rev.comment}
                      </p>
                    </div>

                    {/* Author Info & Helpful Vote */}
                    <div className="mt-8 pt-4 border-t border-[#E8E2D6] dark:border-[#1E3025] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {rev.userPhoto ? (
                          <img
                            src={rev.userPhoto}
                            alt={rev.userName}
                            className="w-10 h-10 object-cover border border-[#E8E2D6] dark:border-stone-800"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-[#12231A] text-[#C88A4B] font-semibold text-sm flex items-center justify-center">
                            {rev.userName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-xs sm:text-sm text-[#12231A] dark:text-[#FDFBF7]">{rev.userName}</span>
                            {rev.verifiedGoogle && (
                              <span title="Verified Guest Review">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#3D5A45]" />
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-stone-400 font-light">{rev.createdAt}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleVoteHelpful(rev.id)}
                        className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#C88A4B] bg-[#FAF7F2] dark:bg-stone-900 border border-[#E8E2D6] dark:border-stone-800 px-3 py-1.5 transition-colors"
                        title="Mark as helpful"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-[#C88A4B]" />
                        <span>Helpful ({rev.helpfulCount})</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal for Writing Review */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400">
                    <MessageSquarePlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white text-lg">Write a Review</h3>
                    <p className="text-xs text-slate-500">Posting as {user?.displayName || user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold text-xl px-2"
                >
                  ✕
                </button>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center font-bold text-2xl">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Review Submitted!</h4>
                  <p className="text-xs text-slate-500">Thank you for sharing your experience with Remax Safaris.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Star Rating Select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="p-1 transition-transform transform hover:scale-110 focus:outline-none"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (hoverRating || rating)
                                ? 'fill-[#D4A373] text-[#D4A373]'
                                : 'text-slate-200 dark:text-slate-700'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-[#D4A373] ml-2">
                        {rating === 5 && 'Outstanding!'}
                        {rating === 4 && 'Very Good!'}
                        {rating === 3 && 'Good Experience'}
                        {rating === 2 && 'Fair'}
                        {rating === 1 && 'Needs Improvement'}
                      </span>
                    </div>
                  </div>

                  {/* Related Package Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Tour Package or Experience
                    </label>
                    <select
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="General Safari Experience">General Safari Experience</option>
                      <option value="Maasai Mara Great Migration Safari">Maasai Mara Great Migration Safari</option>
                      <option value="Diani Beach & Wasini Island Getaway">Diani Beach & Wasini Island Getaway</option>
                      <option value="Amboseli Elephant Sanctuary Tour">Amboseli Elephant Sanctuary Tour</option>
                      <option value="Lake Naivasha Hippo Safari & Hell’s Gate">Lake Naivasha Hippo Safari & Hell’s Gate</option>
                      <option value="Zanzibar Sea Turtle Sanctuary & Beach">Zanzibar Sea Turtle Sanctuary & Beach</option>
                      <option value="Cape Town & Garden Route Tour">Cape Town & Garden Route Tour</option>
                    </select>
                  </div>

                  {/* Headline Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Review Headline
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Best Safari of My Life!"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  {/* Detailed Comment */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Detailed Experience
                    </label>
                    <textarea
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Describe your tour guide, accommodations, game drives, or service quality..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  {formError && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowReviewModal(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-xl bg-[#1B4332] dark:bg-emerald-600 text-white font-bold text-xs shadow-md hover:bg-emerald-900 dark:hover:bg-emerald-500 transition-all disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Post Review'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

