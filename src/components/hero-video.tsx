interface HeroVideoProps {
  children: React.ReactNode;
}

export function HeroVideo({ children }: HeroVideoProps) {
  return (
    <section className="hero" data-cursor="light">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        className="hero-video"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay" />

      <div className="absolute top-0 left-0 right-0 h-1 bg-primary" style={{ zIndex: 3 }} />

      {children}
    </section>
  );
}
